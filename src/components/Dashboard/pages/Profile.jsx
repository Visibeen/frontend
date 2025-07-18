// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

import Layout from '../../Layouts/Layout.jsx';

import { useParams } from 'react-router-dom';

const businessInfo = {
  name: 'Starbucks - Sector 17',
  type: 'Coffee shop',
  address: 'Sector 17, Chandigarh, India',
  phone: '0172-123456',
  hours: 'Open 8am - 10pm',
  images: [
    'https://source.unsplash.com/400x300/?coffee',
    'https://source.unsplash.com/400x300/?cafe',
  ],
  website: 'https://starbucks.in',
  reviews: 4.7,
  ratingCount: 12000,
};
  

const COLORS = ['#FECB49','#FF8B2B','#FFBB42','#00B58F','#ff0000'];

export default function ProfilePage () {
  const [data, setData]   = useState(null);
  const [error, setError] = useState('');

  /** one fetch when component mounts */
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch('/api/gmb/profile?locationId=YOUR_LOCATION_ID');
        const json = await res.json();
        if (!json.ok) throw new Error(json.msg);
        setData(json.data);
      } catch (err) {
        setError(err.message); 
      }
    };
    getProfile();
  }, []);

  /* ─────────────────────────────────────────────────────────────── */

  if (error)       return <Layout><p className="p-6 text-red-600">{error}</p></Layout>;
  if (!data)       return <Layout><p className="p-6">Loading…</p></Layout>;

  /** ----- Quick derived demo data (replace as you parse real GP) --- */
  const profileStrengthData = [
    { name:'Direct',      value:150 },
    { name:'Links',       value: 50 },
    { name:'Social',      value:120 },
    { name:'Marketing',   value: 90 },
    { name:'Other',       value: 50 }
  ];
  const reviewsBar = [
    { name:'5.0', reviews:14000 },
    { name:'4.0', reviews: 4000 },
    { name:'3.0', reviews: 7000 },
    { name:'2.0', reviews:11000 },
    { name:'1.0', reviews: 8000 }
  ];
  const competitorData = [
    { month:'Jan 2025', you:25, others:30 },
    { month:'Feb 2025', you:20, others:25 },
    { month:'Mar 2025', you:35, others:45 },
    { month:'Apr 2025', you:30, others:35 },
    { month:'May 2025', you:45, others:40 }
  ];
  /* ─────────────────────────────────────────────────────────────── */

  return (
    <Layout>
      {/* TOP SECTION  ---------------------------------------------------------------- */}
      <h2 className="text-2xl font-bold mb-4 px-6">Your business on Google</h2>

      <section className="bg-white shadow-md p-4 rounded-xl mx-6">
        <h3 className="text-lg font-semibold">
          {data.title} <span className="text-blue-600">(verified)</span>
        </h3>
        <div>{data.location?.address?.postalAddress?.addressLines?.join(', ')}</div>
        <div>Phone: {data.primaryPhone}</div>
        <div className="flex gap-2 mt-3">
          {(data.photos || []).slice(0,4).map((ph,idx)=>(
            <img key={idx} src={ph?.url} alt="" className="w-24 h-24 object-cover rounded"/>
          ))}
        </div>
      </section>

      {/* PROFILE STRENGTH  ----------------------------------------------------------- */}
      <section className="grid lg:grid-cols-2 gap-6 m-6">
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="text-lg font-bold mb-2">Profile Strength</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={profileStrengthData}
              cx={150} cy={90} innerRadius={40} outerRadius={80}
              paddingAngle={5} dataKey="value"
              label
            >
              {profileStrengthData.map((_, i) =>
                <Cell key={i} fill={COLORS[i % COLORS.length]}/> )}
            </Pie>
            <Tooltip/>
          </PieChart>
          <p className="text-green-700 text-center font-semibold">350 / 500</p>
        </div>

        {/* REVIEWS ------------------------------------------------------------------ */}
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="text-lg font-bold mb-2">Reviews Overview</h3>
          {reviewsBar.map(r=>(
            <div key={r.name} className="flex justify-between border-b py-1">
              <span>{r.name}</span>
              <span>{r.reviews.toLocaleString()} reviews</span>
            </div>
          ))}
          <div className="flex justify-around mt-4">
            <strong>12</strong><br/>Reviews in 7 days
            <strong>12</strong><br/>Reviews in 30 days
          </div>
        </div>
      </section>
      

      {/* COMPETITORS LINE CHART ------------------------------------------------------ */}
      <section className="bg-white shadow-md p-4 rounded-xl m-6">
        <h3 className="text-lg font-bold mb-2">Compare with Competitors</h3>
        <LineChart width={700} height={250} data={competitorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="you" stroke="#8884d8"   />
          <Line type="monotone" dataKey="others" stroke="#82ca9d" />
        </LineChart>
      </section>
    </Layout>
    
  );
}
