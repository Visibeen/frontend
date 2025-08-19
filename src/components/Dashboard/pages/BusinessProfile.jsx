<<<<<<< HEAD
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


=======
import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Paper, Rating, LinearProgress, Chip, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import GMBService from '../../../services/GMBService';
import LocationIcon from '../../icons/LocationIcon';
import VerifiedCheckIcon from '../../icons/VerifiedCheckIcon';
import StarRatingIcon from '../../icons/StarRatingIcon';
import AddPhotoIcon from '../../icons/AddPhotoIcon';
import WebsiteGlobeIcon from '../../icons/WebsiteGlobeIcon';
import DirectionsIcon from '../../icons/DirectionsIcon';
import ShareIcon from '../../icons/ShareIcon';
import QRCodeIcon from '../../icons/QRCodeIcon';
import SwitchAccountIcon from '../../icons/SwitchAccountIcon';
import ProfileGaugeIcon from '../../icons/ProfileGaugeIcon';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  minHeight: '100vh',
  padding: '0'
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: '0 40px 40px 40px'
}));

const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '36px'
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6',
  margin: 0
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  margin: 0
}));

const SwitchAccountButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px 16px',
  borderRadius: '4px',
  border: '0.6px solid #A0A0AA',
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(160, 160, 170, 0.15)'
  }
}));

const MainGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 320px',
  gap: '36px',
  marginBottom: '26px'
}));

const BusinessProfileCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  padding: '40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none'
}));

const BusinessTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  color: '#121927',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}));

const VerifiedBadge = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const EditProfileLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#0B91D6',
  cursor: 'pointer',
  textDecoration: 'none'
}));

const AddressText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  margin: '8px 0 0 0',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px'
}));

const ReviewsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  marginTop: '8px'
}));

const ReviewsLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const ReviewsRating = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const ContactGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  marginTop: '10px'
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
}));

const ContactLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927'
}));

const ContactValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const HoursText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927',
  marginTop: '10px'
}));

const HoursValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  marginTop: '10px'
}));

const PhotosSection = styled(Box)(({ theme }) => ({
  marginTop: '18px'
}));

const PhotosTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '18px'
}));

const PhotosGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center'
}));

const PhotoItem = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '133px',
  borderRadius: '12px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

const AddPhotoButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '23px',
  width: '120px',
  height: '133px',
  cursor: 'pointer'
}));

const AddPhotoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const ActionsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  marginTop: '18px',
  flexWrap: 'wrap'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 16px',
  borderRadius: '4px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: '#ffffff',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
}));

const ActionSubtext = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const AppointmentsSection = styled(Box)(({ theme }) => ({
  marginTop: '10px'
}));

const AppointmentsLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927'
}));

const AppointmentsValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  marginTop: '10px'
}));

const ProfileStrengthCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  padding: '41px 20px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '105px'
}));

const StrengthTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#30302E',
  textAlign: 'center'
}));

const GaugeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
}));

const ScoreText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  color: '#000000'
}));

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%'
}));

const BoostButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '4px',
  padding: '12px 16px',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const ScoreButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#0B91D6',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0',
  textTransform: 'capitalize',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
}));

const CompetitorButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#34A853',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0',
  textTransform: 'capitalize',
  textDecoration: 'underline',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

const ActionCenterCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  marginBottom: '26px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '21px'
}));

const TasksGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '21px',
  marginBottom: '21px'
}));

const TaskCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  padding: '12px',
  border: '1px solid #f0f0f0',
  borderRadius: '8px'
}));

const TaskLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const TaskStatus = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center'
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '4px',
  padding: '8px 16px',
  textTransform: 'capitalize',
  margin: '0 auto',
  display: 'block',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const PerformanceGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginBottom: '16px'
}));

const PerformanceCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none'
}));

const MetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '14px',
  marginBottom: '12px'
}));

const MetricCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '16px',
  border: '1px solid #f0f0f0'
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '14px'
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '18px'
}));

const MetricChange = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
}));

const FeedSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '11.22px'
}));

const FeedItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5.28px',
  paddingBottom: '11.22px',
  borderBottom: '0.33px solid #F6F0F0'
}));

const FeedHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5.28px'
}));

const FeedTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#121927'
}));

const FeedDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#121927',
  lineHeight: '18px'
}));

const ViewDetailsButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '4px',
  padding: '8px 16px',
  textTransform: 'capitalize',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const ReviewsCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  marginBottom: '26px'
}));

const ReviewsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '320px 1fr',
  gap: '32px',
  marginBottom: '44px'
}));

const ReviewsLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px'
}));

const ReviewsScore = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#121927'
}));

const ReviewsRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '17px'
}));

const RatingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}));

const RatingLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA',
  minWidth: '24px'
}));

const RatingBar = styled(Box)(({ theme }) => ({
  flex: 1,
  height: '8px',
  backgroundColor: '#E5E7EB',
  borderRadius: '4px',
  overflow: 'hidden'
}));

const RatingFill = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#34A853',
  borderRadius: '4px'
}));

const RatingCount = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA',
  minWidth: '80px',
  textAlign: 'right'
}));

const ReviewsStatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  gap: '44px',
  alignItems: 'center'
}));

const ReviewsStat = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px'
}));

const ReviewsStatValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const ReviewsStatLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const StatsDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '103px',
  backgroundColor: '#A0A0AA'
}));

const FeedCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  marginBottom: '26px'
}));

const FeedGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '19px',
  marginBottom: '19px'
}));

const FeedCardItem = styled(Box)(({ theme }) => ({
  borderRadius: '14px 14px 0px 0px',
  overflow: 'hidden',
  backgroundColor: '#ffffff'
}));

const FeedImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '200px',
  objectFit: 'cover'
}));

const FeedContent = styled(Box)(({ theme }) => ({
  padding: '12px 16px'
}));

const FeedDate = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#A0A0AA',
  marginBottom: '8px'
}));

const FeedText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#121927',
  lineHeight: '18px'
}));

// Mock data
const mockTasks = [
  { label: 'Filler text is', status: '60% completed', color: '#34A853' },
  { label: 'Filler text is', status: '23% completed', color: '#EF232A' },
  { label: 'Filler text is', status: 'Not Started Yet', color: '#A0A0AA' },
  { label: 'Filler text is', status: '100% completed', color: '#34A853' },
  { label: 'Filler text is', status: '23% completed', color: '#EF232A' }
];

const mockMetrics = [
  { label: 'Local Views', value: '2,300', change: '+35% vs last month', color: '#34A853' },
  { label: 'Calls from GBP', value: '221', change: '+15% vs last month', color: '#34A853' },
  { label: 'Direction Requests', value: '12', change: '+5% vs last month', color: '#EF232A' },
  { label: 'Website Clicks', value: '2,300', change: '+5% vs last month', color: '#34A853' }
];

const mockFeedItems = [
  { icon: 'check', title: 'Profile changes saved!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { icon: 'photo', title: 'New photos have been added to your GMB profile.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { icon: 'review', title: 'New review received.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { icon: 'review-red', title: 'New review received.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqu' }
];

// Replaced by real GMB media fetched from API

const mockSocialFeed = [
  { image: '/images/social-feed-1.jpg', date: 'Posted on - 26 june 2025', text: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts.' },
  { image: '/images/social-feed-2.png', date: 'Posted on - 26 june 2025', text: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts.' },
  { image: '/images/social-feed-3.png', date: 'Posted on - 26 june 2025', text: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts.' }
];

const BusinessProfile = () => {
  const [searchParams] = useSearchParams();
  const [locationData, setLocationData] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const locationId = searchParams.get('id');

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!locationId) {
        setError('No location ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        // Get stored access token from localStorage or session
        const accessToken = localStorage.getItem('googleAccessToken') || sessionStorage.getItem('googleAccessToken');
        
        if (!accessToken) {
          setError('No access token found. Please reconnect your Google account.');
          setLoading(false);
          return;
        }

        // First get accounts directly from Google API
        const accounts = await GMBService.getAccounts(accessToken);
        
        if (accounts.length === 0) {
          setError('No GMB accounts found');
          setLoading(false);
          return;
        }

        // Find the account by ID or use the first one
        const targetAccount = accounts.find(acc => 
          acc.name.includes(locationId)
        ) || accounts[0];

        const accountId = targetAccount.name.split('/')[1];

        // Fetch locations for this account directly from Google API
        const locations = await GMBService.getLocations(accessToken, targetAccount.name);

        if (locations.length === 0) {
          setError('No locations found for this account');
          setLoading(false);
          return;
        }

        // Find the specific location by ID or use the first one
        const targetLocation = locations.find(loc => 
          loc.name.includes(locationId) || 
          loc.name.split('/').pop() === locationId
        ) || locations[0];

        setLocationData(targetLocation);

        // Extract the location ID once for downstream calls
        const actualLocationId = targetLocation.name.split('/').pop();

        // Fetch reviews data for this location directly
        try {
          const reviews = await GMBService.getReviews(accessToken, targetAccount.name, targetLocation.name);
          setReviewsData({ reviews });
          console.log('Reviews data fetched successfully:', { count: reviews.length });
        } catch (reviewsError) {
          console.warn('Error fetching reviews:', reviewsError);
          setReviewsData({ reviews: [] });
        }

        // Fetch media (photos) for this location directly
        try {
          console.log('Fetching media for account/location:', accountId, actualLocationId);
          let items = await GMBService.getMedia(accessToken, accountId, actualLocationId);
          // Filter photos and items with at least one usable URL
          items = items.filter(i => (i.mediaFormat === 'PHOTO' || !i.mediaFormat) && (i.googleUrl || i.thumbnailUrl || i.sourceUrl));
          // Sort by createTime desc if present
          items.sort((a, b) => {
            const ta = a.createTime ? Date.parse(a.createTime) : 0;
            const tb = b.createTime ? Date.parse(b.createTime) : 0;
            return tb - ta;
          });
          console.log('Media items (photos) after filter/sort:', items.length, items.slice(0, 3));
          setMediaItems(items);
        } catch (mediaErr) {
          console.warn('Error fetching media:', mediaErr);
          setMediaItems([]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching location data:', err);
        setError(err.message || 'Failed to fetch location data');
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [locationId]);

  if (loading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <ContentWrapper>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <CircularProgress />
            </Box>
          </ContentWrapper>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageContainer>
          <ContentWrapper>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </ContentWrapper>
        </PageContainer>
      </DashboardLayout>
    );
  }

  // Extract data from the location object
  const businessTitle = locationData?.title || 'Business Name';
  const businessAddress = locationData?.storefrontAddress ? 
    `${locationData.storefrontAddress.addressLines?.join(', ') || ''}, ${locationData.storefrontAddress.locality || ''}, ${locationData.storefrontAddress.administrativeArea || ''} ${locationData.storefrontAddress.postalCode || ''}`.trim() :
    'Address not available';
  const primaryPhone = locationData?.phoneNumbers?.primaryPhone || 'Not available';
  const websiteUrl = locationData?.websiteUri || 'Not available';
  const isVerified = locationData?.metadata?.verified || false;

  // Calculate real reviews data
  const reviews = reviewsData?.reviews || [];
  // Map Google's enum star ratings (e.g., 'FIVE') to numeric values
  const toNumericRating = (star) => {
    if (typeof star === 'number') return star;
    const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
    const key = String(star || '').toUpperCase();
    return map[key] || 0;
  };
  const numericRatings = reviews.map(r => toNumericRating(r.starRating));
  const totalReviews = numericRatings.length;
  const averageRating = totalReviews > 0 ? 
    numericRatings.reduce((sum, n) => sum + n, 0) / totalReviews : 0;
  
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = numericRatings.filter(n => Math.round(n) === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <DashboardLayout>
      <PageContainer>
        <ContentWrapper>
          {/* Page Header */}
          <PageHeader>
            <HeaderLeft>
              <HeaderTitle>Your Business Profile</HeaderTitle>
              <HeaderSubtitle>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.</HeaderSubtitle>
            </HeaderLeft>
            <SwitchAccountButton>
              <SwitchAccountIcon width={17} height={15} color="#121927" />
              Switch Account
            </SwitchAccountButton>
          </PageHeader>

          {/* Main Grid - Business Profile + Profile Strength */}
          <MainGrid>
            <BusinessProfileCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <BusinessTitle>
                  {businessTitle}
                  {isVerified && <VerifiedCheckIcon width={11} height={12} color="#34A853" />}
                  {isVerified && <VerifiedBadge>(verified)</VerifiedBadge>}
                </BusinessTitle>
                <EditProfileLink>(Edit Profile)</EditProfileLink>
              </Box>

              <AddressText>
                <LocationIcon width={12} height={15} color="#121927" />
                {businessAddress}
              </AddressText>

              <ReviewsRow>
                <ReviewsLabel>Reviews :</ReviewsLabel>
                <StarRatingIcon width={88} height={20} color="#F59E0B" />
                <ReviewsRating>{averageRating.toFixed(2)} ({totalReviews} reviews)</ReviewsRating>
              </ReviewsRow>

              <ContactGrid>
                <ContactItem>
                  <ContactLabel>Primary Number:</ContactLabel>
                  <ContactValue>{primaryPhone}</ContactValue>
                </ContactItem>
                <ContactItem>
                  <ContactLabel>Website:</ContactLabel>
                  <ContactValue>{websiteUrl}</ContactValue>
                </ContactItem>
                <ContactItem>
                  <ContactLabel>Language:</ContactLabel>
                  <ContactValue>{locationData?.languageCode || 'Not specified'}</ContactValue>
                </ContactItem>
              </ContactGrid>

              <HoursText>Hours:</HoursText>
              <HoursValue>Open ⋅ Closes 7 pm</HoursValue>

              <PhotosSection>
                <PhotosTitle>Photos</PhotosTitle>
                <PhotosGrid>
                  <PhotoItem>
                    <img src="/images/business-photo-1.jpg" alt="Business interior" />
                  </PhotoItem>
                  <PhotoItem>
                    <img src="/images/business-photo-2.jpg" alt="Business exterior" />
                  </PhotoItem>
                  <AddPhotoButton>
                    <AddPhotoIcon width={25} height={22} color="#A0A0AA" />
                    <AddPhotoText>Add photos</AddPhotoText>
                  </AddPhotoButton>
                </PhotosGrid>
              </PhotosSection>

              <ActionsGrid>
                <ActionButton onClick={() => websiteUrl !== 'Not available' && window.open(websiteUrl, '_blank')}>
                  <WebsiteGlobeIcon width={17} height={17} color="#121927" />
                  Website
                  <ActionSubtext>({websiteUrl !== 'Not available' ? websiteUrl : 'Not available'})</ActionSubtext>
                </ActionButton>
                <ActionButton>
                  <DirectionsIcon width={16} height={16} color="#121927" />
                  Directions
                  <ActionSubtext>View / Edit</ActionSubtext>
                </ActionButton>
                <ActionButton>
                  <ShareIcon width={15} height={15} color="#121927" />
                  Share
                  <ActionSubtext>Link address</ActionSubtext>
                </ActionButton>
                <ActionButton>
                  <QRCodeIcon width={15} height={15} color="#121927" />
                  Review QR
                  <ActionSubtext>Shot link</ActionSubtext>
                </ActionButton>
              </ActionsGrid>

              <AppointmentsSection>
                <AppointmentsLabel>Appointments:</AppointmentsLabel>
                <AppointmentsValue>facebook.com, linkedin.com, e2egroup.in</AppointmentsValue>
              </AppointmentsSection>
            </BusinessProfileCard>

            <ProfileStrengthCard>
              <StrengthTitle>Profile Strength</StrengthTitle>
              <GaugeContainer>
                <ProfileGaugeIcon width={258} height={185} color="#0B91D6" />
                <ScoreText>350 / 500</ScoreText>
              </GaugeContainer>
              <ActionButtonsContainer>
                <BoostButton>Boost Your Profile</BoostButton>
                <ScoreButton>Get Consolidated Score</ScoreButton>
                <CompetitorButton>Competitor Analysis</CompetitorButton>
              </ActionButtonsContainer>
            </ProfileStrengthCard>
          </MainGrid>

          {/* Action Center */}
          <ActionCenterCard>
            <SectionTitle>Action Center</SectionTitle>
            <TasksGrid>
              {mockTasks.map((task, index) => (
                <TaskCard key={index}>
                  <TaskLabel>{task.label}</TaskLabel>
                  <Box sx={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '10px' }} />
                  <TaskStatus sx={{ color: task.color }}>{task.status}</TaskStatus>
                </TaskCard>
              ))}
            </TasksGrid>
            <ViewAllButton>View All</ViewAllButton>
          </ActionCenterCard>

          {/* Performance + Latest Feed */}
          <PerformanceGrid>
            <PerformanceCard>
              <SectionTitle>Performance</SectionTitle>
              <MetricsGrid>
                {mockMetrics.map((metric, index) => (
                  <MetricCard key={index} sx={{ backgroundColor: index < 2 ? '#34A853' : '#EF232A' }}>
                    <MetricLabel sx={{ color: '#ffffff' }}>{metric.label}</MetricLabel>
                    <MetricValue>{metric.value}</MetricValue>
                    <MetricChange>
                      <span>↗</span>
                      {metric.change}
                    </MetricChange>
                  </MetricCard>
                ))}
              </MetricsGrid>
              <ViewDetailsButton>View Details</ViewDetailsButton>
            </PerformanceCard>

            <PerformanceCard>
              <SectionTitle>Latest Feed</SectionTitle>
              <FeedSection>
                {mockFeedItems.map((item, index) => (
                  <FeedItem key={index}>
                    <FeedHeader>
                      <Box sx={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: item.icon === 'review-red' ? '#EF232A' : '#34A853' }} />
                      <FeedTitle>{item.title}</FeedTitle>
                    </FeedHeader>
                    <FeedDescription>{item.description}</FeedDescription>
                  </FeedItem>
                ))}
              </FeedSection>
              <ViewDetailsButton>View Details</ViewDetailsButton>
            </PerformanceCard>
          </PerformanceGrid>

          {/* Reviews Overview */}
          <ReviewsCard>
            <SectionTitle>Reviews Overview</SectionTitle>
            <ReviewsGrid>
              <ReviewsLeft>
                <ReviewsScore>{averageRating.toFixed(2)}</ReviewsScore>
                <Rating value={averageRating} readOnly precision={0.1} sx={{ color: '#F59E0B' }} />
              </ReviewsLeft>
              <ReviewsRight>
                {ratingDistribution.map((item) => (
                  <RatingRow key={item.rating}>
                    <RatingLabel>{item.rating}.0</RatingLabel>
                    <RatingBar>
                      <RatingFill sx={{ width: `${item.percentage}%` }} />
                    </RatingBar>
                    <RatingCount>{item.count} reviews</RatingCount>
                  </RatingRow>
                ))}
              </ReviewsRight>
            </ReviewsGrid>
            <ReviewsStatsGrid>
              <ReviewsStat>
                <ReviewsStatValue>{reviewsData?.reviews?.length || 0}</ReviewsStatValue>
                <ReviewsStatLabel>Total Reviews</ReviewsStatLabel>
              </ReviewsStat>
              <ReviewsStat>
                <ReviewsStatValue>{reviewsData?.reviews?.filter(review => {
                  const reviewDate = new Date(review.createTime);
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                  return reviewDate >= sevenDaysAgo;
                }).length}</ReviewsStatValue>
                <ReviewsStatLabel>Reviews In Last 7 Days</ReviewsStatLabel>
              </ReviewsStat>
              <ReviewsStat>
                <ReviewsStatValue>{reviewsData?.reviews?.filter(review => {
                  const reviewDate = new Date(review.createTime);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return reviewDate >= thirtyDaysAgo;
                }).length}</ReviewsStatValue>
                <ReviewsStatLabel>Reviews In Last 30 Days</ReviewsStatLabel>
              </ReviewsStat>
            </ReviewsStatsGrid>
            <Box sx={{ textAlign: 'center', marginTop: '26px' }}>
              <ViewAllButton>View All</ViewAllButton>
            </Box>
          </ReviewsCard>

          {/* GMB Feed */}
          <FeedCard>
            <SectionTitle>GMB Feed</SectionTitle>
            {mediaItems && mediaItems.length > 0 ? (
              <>
                <FeedGrid>
                  {mediaItems.slice(0, 9).map((item, index) => {
                    const originalSrc = item.googleUrl || item.thumbnailUrl || item.sourceUrl || '';
                    const imgSrc = originalSrc;
                    const created = item.createTime ? new Date(item.createTime) : null;
                    const dateText = created
                      ? `Posted on - ${created.toLocaleString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })}`
                      : 'Date not available';
                    const desc = item.locationAssociation?.category || item.mediaFormat || '';
                    
                    return (
                      <FeedCardItem key={item.name || `${originalSrc}-${index}`}>
                        {imgSrc ? (
                          <FeedImage 
                            src={imgSrc} 
                            alt={`GMB Media ${index + 1}`}
                            onError={(e) => {
                              console.error('Image failed to load via proxy:', originalSrc);
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTQwSDgwVjYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                              e.target.style.objectFit = 'cover';
                            }}
                            onLoad={() => console.log('Image loaded successfully via proxy:', originalSrc)}
                          />
                        ) : (
                          <FeedImage 
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTQwSDgwVjYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K"
                            alt="No image available"
                          />
                        )}
                        <FeedContent>
                          <FeedDate>{dateText}</FeedDate>
                          <FeedText>{desc}</FeedText>
                        </FeedContent>
                      </FeedCardItem>
                    );
                  })}
                </FeedGrid>
                <Box sx={{ textAlign: 'center' }}>
                  <ViewAllButton>View All</ViewAllButton>
                </Box>
              </>
            ) : (
              <Typography sx={{ color: '#6b7280' }}>No media items found.</Typography>
            )}
          </FeedCard>

          {/* Social Feed */}
          <FeedCard>
            <SectionTitle>Social Feed</SectionTitle>
            <FeedGrid>
              {mockSocialFeed.map((item, index) => (
                <FeedCardItem key={index}>
                  <FeedImage src={item.image} alt={`Social Feed ${index + 1}`} />
                  <FeedContent>
                    <FeedDate>{item.date}</FeedDate>
                    <FeedText>{item.text}</FeedText>
                  </FeedContent>
                </FeedCardItem>
              ))}
            </FeedGrid>
            <Box sx={{ textAlign: 'center' }}>
              <ViewAllButton>View All</ViewAllButton>
            </Box>
          </FeedCard>
        </ContentWrapper>
      </PageContainer>
    </DashboardLayout>
  );
};

export default BusinessProfile;
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
