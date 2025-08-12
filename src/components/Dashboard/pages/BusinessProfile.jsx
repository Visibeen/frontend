import React, { useState } from 'react';
import Layout from '../../Layouts/Layout';
import { auth, provider, signInWithPopup } from '../../../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { useParams } from 'react-router-dom';

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  padding: '16px',
};

const sectionTitleStyle = { fontSize: 16, fontWeight: 700, marginBottom: 12 };

export default function BusinessProfile() {
  const { locationId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState('');
  const [reviewsStats, setReviewsStats] = useState({ average: null, total: 0 });

  const handleFetchFromGoogle = async () => {
    try {
      setLoading(true);
      setError('');

      // Request the necessary scopes to read Business Profile
      provider.addScope('https://www.googleapis.com/auth/business.manage');
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      provider.setCustomParameters({ access_type: 'offline', prompt: 'consent' });

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken || '';

      if (!accessToken) {
        setError('Failed to get Google access token.');
        return;
      }

      // 1) Get accounts
      const accRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const accJson = await accRes.json();
      if (!accRes.ok) throw new Error(accJson.error?.message || 'Failed to fetch accounts');
      const accounts = accJson?.accounts || [];
      if (!accounts.length) throw new Error('No accounts found on this Google login');

      // Helper to list locations for an account
      const listLocationsForAccount = async (accountName) => {
        const res = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error?.message || 'Failed to fetch locations');
        return json?.locations || [];
      };

      // 2) Find target account + location
      let targetAccountName = null; // e.g., accounts/1234567890
      let targetLocation = null;    // object with name like locations/987...

      if (locationId) {
        // Try to find the account that owns this location
        for (const acc of accounts) {
          const locs = await listLocationsForAccount(acc.name);
          const found = locs.find((loc) => (loc.name || '').endsWith(`/${locationId}`));
          if (found) {
            targetAccountName = acc.name;
            targetLocation = found;
            break;
          }
        }
        // As fallback, pick first account's first location
        if (!targetLocation) {
          const locs = await listLocationsForAccount(accounts[0].name);
          targetAccountName = accounts[0].name;
          targetLocation = locs[0] || null;
        }
      } else {
        // Default: first account + first location
        const locs = await listLocationsForAccount(accounts[0].name);
        targetAccountName = accounts[0].name;
        targetLocation = locs[0] || null;
      }

      if (!targetLocation) throw new Error('No locations found for this account');

      setProfile(targetLocation);

      // 3) Fetch Reviews from legacy v4 endpoint using account + location IDs
      await fetchReviewsFromGoogle(accessToken, targetAccountName, targetLocation.name);
    } catch (e) {
      console.error('Fetch Business Profile error:', e);
      setError(e.message || 'Failed to fetch business profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsFromGoogle = async (accessToken, accountName, locationName) => {
    try {
      setReviewsLoading(true);
      setReviewsError('');
      setReviews([]);

      // accountName like 'accounts/1234567890' -> extract 1234567890
      const accountId = (accountName || '').split('/')[1];
      // locationName like 'locations/9876543210' -> extract 9876543210
      const locationId = (locationName || '').split('/')[1];
      if (!accountId || !locationId) throw new Error('Invalid account or location identifiers');

      const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Failed to fetch reviews');

      const list = json?.reviews || [];
      setReviews(list);

      // Compute simple stats
      const starToNum = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
      if (list.length) {
        const sum = list.reduce((acc, r) => acc + (starToNum[r?.starRating] || 0), 0);
        setReviewsStats({ average: (sum / list.length), total: list.length });
      } else {
        setReviewsStats({ average: null, total: 0 });
      }
    } catch (e) {
      console.error('Fetch Reviews error:', e);
      setReviewsError(e.message || 'Failed to fetch reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const derivedTitle = profile?.title || 'Real estate agent - E2E Group';
  const derivedAddress = profile?.location?.address?.postalAddress?.addressLines?.join(', ') ||
    profile?.storefrontAddress?.addressLines?.join(', ') ||
    'Office Floor, Bathchb, Sector 66, Sahibzada Ajit Singh Nagar, Punjab 160066';
  const derivedPhone = profile?.primaryPhone || profile?.primaryPhoneNumber || '09886 23332';

  return (
    <Layout>
      <div style={{ padding: 16 }}>
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Your Business Profile</h2>
            <p style={{ margin: '6px 0 0 0', color: '#6b7280' }}>A consolidated view of your presence, performance and feeds.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleFetchFromGoogle} disabled={loading} style={{ padding: '8px 12px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none' }}>
              {loading ? 'Fetching…' : 'Connect Google & Fetch'}
            </button>
            <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>Switch Account</button>
          </div>
        </div>

        {error && (
          <div style={{ marginBottom: 12, color: '#dc2626' }}>{error}</div>
        )}

        {/* Top two-column: Profile card + Strength */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 16 }}>
          {/* Business card */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18 }}>{derivedTitle} <span style={{ color: '#10b981', fontSize: 12 }}>(verified)</span></h3>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{derivedAddress}</div>
                <div style={{ marginTop: 8, fontSize: 12 }}>
                  <strong>Reviews:</strong> ⭐ 5.0
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Primary Number</div>
                    <div style={{ fontWeight: 600 }}>{derivedPhone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Secondary Number</div>
                    <div style={{ fontWeight: 600 }}>09886 23332</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Manager Number</div>
                    <div style={{ fontWeight: 600 }}>078457 23332</div>
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 12 }}>
                  <strong>Hours:</strong> Open – Closes 7 pm
                </div>
              </div>
            </div>

            {/* Photos */}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {[1,2,3].map((i) => (
                <div key={i} style={{ width: 74, height: 74, borderRadius: 8, overflow: 'hidden', background: '#f3f4f6' }}>
                  <img alt="" src={`https://source.unsplash.com/140x140/?city,${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              {['Website', 'Directions', 'Call', 'Share', 'Review QR'].map((t) => (
                <button key={t} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>{t}</button>
              ))}
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: '#6b7280' }}>
              Appointments: facebook.com, linkedin.com, zlogoapp.in
            </div>
          </div>

          {/* Profile strength */}
          <div style={cardStyle}>
            <h4 style={{ margin: 0, marginBottom: 10 }}>Profile Strength</h4>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 170, height: 85, background: 'conic-gradient(#ef4444 0 90deg,#f59e0b 90deg 180deg,#10b981 180deg 270deg)', borderTopLeftRadius: 170, borderTopRightRadius: 170 }} />
              <div style={{ marginTop: 12, fontWeight: 700 }}>350 / 500</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button style={{ padding: '8px 10px', borderRadius: 8, background: '#2563eb', color: 'white', border: 'none' }}>Boost Your Profile</button>
              <button style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>Get Consolidated Score</button>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div style={sectionTitleStyle}>Tasks</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 12 }}>
            {[
              { title: 'Filter task 1', status: '80% completed', ok: true },
              { title: 'Filter task 2', status: '23% completed', ok: false },
              { title: 'Filter task 3', status: 'Not Started Yet', ok: false },
              { title: 'Filter task 4', status: '100% completed', ok: true },
              { title: 'Filter task 5', status: '23% completed', ok: false },
            ].map((t, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{t.title}</div>
                <div style={{ marginTop: 6, fontWeight: 600, color: t.ok ? '#10b981' : '#ef4444' }}>{t.status}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>View All</button>
          </div>
        </div>

        {/* Performance + Latest Feed */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={cardStyle}>
            <div style={sectionTitleStyle}>Performance</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 12 }}>
              {[
                { label: 'Local Views', value: 2300, change: '+35% vs last month', color: '#059669' },
                { label: 'Calls from GBP', value: 221, change: '+15% vs last month', color: '#059669' },
                { label: 'Direction Requests', value: 12, change: '-5% vs last month', color: '#dc2626' },
                { label: 'Website Clicks', value: 2300, change: '+4% vs last month', color: '#059669' },
              ].map((k, i) => (
                <div key={i} style={{ borderRadius: 12, padding: 12, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{k.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{k.value.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: k.color }}>{k.change}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>View Details</button>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={sectionTitleStyle}>Latest Feed</div>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ borderBottom: '1px solid #e5e7eb', padding: '8px 0' }}>
                <div style={{ fontWeight: 600 }}>New review received</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</div>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>View Details</button>
            </div>
          </div>
        </div>

        {/* Reviews Overview */}
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800 }}>
                {reviewsStats.average ? reviewsStats.average.toFixed(2) : '—'}
              </div>
              <div style={{ color: '#f59e0b' }}>★★★★★</div>
            </div>
            <div>
              {[5,4,3,2,1].map((r) => (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 32 }}>{r}.0</div>
                  <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 999 }}>
                    <div style={{ width: `${r*15}%`, height: 8, background: '#60a5fa', borderRadius: 999 }} />
                  </div>
                  <div style={{ width: 90, textAlign: 'right', fontSize: 12 }}>
                    {reviewsStats.total ? `${Math.max(0, Math.round((reviewsStats.total * (6 - r)) / 15))} reviews` : '—'}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 32, marginTop: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800 }}>{reviewsStats.total || 0}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Reviews in last 7 days</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800 }}>{reviewsStats.total || 0}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Reviews in last 30 days</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>View All</button>
          </div>
        </div>

        {/* Google Reviews List */}
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div style={sectionTitleStyle}>Latest Google Reviews</div>
          {reviewsLoading && <div>Loading reviews…</div>}
          {reviewsError && <div style={{ color: '#dc2626' }}>{reviewsError}</div>}
          {!reviewsLoading && !reviewsError && (!reviews || reviews.length === 0) && (
            <div style={{ color: '#6b7280' }}>No reviews found.</div>
          )}
          <div style={{ display: 'grid', gap: 12 }}>
            {reviews.slice(0, 5).map((r, idx) => (
              <div key={r.reviewId || idx} style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontWeight: 600 }}>{r.reviewer?.displayName || 'Anonymous'}</div>
                  <div style={{ color: '#f59e0b' }}>{r.starRating ? '★'.repeat({ ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5 }[r.starRating] || 0) : ''}</div>
                </div>
                {r.comment && (
                  <div style={{ fontSize: 12, color: '#374151' }}>{r.comment}</div>
                )}
                {r.updateTime && (
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>{new Date(r.updateTime).toLocaleString()}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* GMB Feed */}
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div style={sectionTitleStyle}>GMB Feed</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
            {[1,2,3].map((i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <img alt="" src={`https://source.unsplash.com/500x360/?marketing,${i}`} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <div style={{ padding: 10, fontSize: 12, color: '#6b7280' }}>Posted on: 28 June 2025</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>View All</button>
          </div>
        </div>

        {/* Social Feed */}
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>Social Feed</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
            {[1,2,3,4].map((i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <img alt="" src={`https://source.unsplash.com/500x360/?social,${i}`} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <div style={{ padding: 10, fontSize: 12, color: '#6b7280' }}>Posted on: 28 June 2025</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>View All</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}


