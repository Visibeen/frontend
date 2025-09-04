import React, { useMemo } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import DashboardLayout from '../Layouts/DashboardLayout';
import { getYourData, clearYourData } from '../../utils/yourDataStore';

const toCsv = (rows) => {
  const esc = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  return rows.map(r => r.map(esc).join(',')).join('\n');
};

const downloadCsv = (filename, rows) => {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const YourDataInner = () => {
  const data = useMemo(() => getYourData(), []);
  const ps = data?.profileStrength || {};
  const rv = data?.reviews || {};
  const perf = data?.performance || {};
  const bp = data?.businessProfile || {};

  const handleExport = () => {
    const headers = [
      'Profile Status',
      'Business Name',
      'Address',
      'Phone Number',
      'Category',
      'Products',
      'Services',
      'Service Area',
      'City In Category',
      'Description',
      'Social Media',
      'Website Link',
      'Book Appointment',
      'Timings',
      'Photos (count)',
      'Attributes',
      'Review Count',
      'Average Rating',
      'Response Rate (30d)',
      'Response Rate (90d)',
      'Volatility',
      'GMB Posts (count)',
      'Q&A (count)',
      'Labels',
      'Pin To Map Location',
      'Snapshot: Profile Strength',
      'Snapshot: Reviews',
      'Snapshot: Performance',
      'Snapshot: Business Profile',
    ];

    const pick = (a, b) => (a !== undefined && a !== '' ? a : b);

    // Derive Profile Status: prefer dashboard's Business Profile verification
    const bpVerified = bp?.verified === true || String(bp?.status || '').toLowerCase() === 'verified';
    const perfStatus = typeof perf?.profileStatus === 'string' ? perf.profileStatus : '';
    const derivedProfileStatus = bpVerified ? 'Verified' : (perfStatus || '');

    const row = [
      derivedProfileStatus,
      // Prefer Business Profile snapshot over Performance for identity fields
      pick(bp.name, perf.name) || ps.businessTitle || '',
      pick(bp.address, perf.address) || ps.address || '',
      pick(bp.number, perf.number) || '',
      pick(bp.category, perf.category) || '',
      pick(bp.products, perf.products) || '',
      pick(bp.services, perf.services) || '',
      typeof pick(bp.serviceArea, perf.serviceArea) === 'string' ? pick(bp.serviceArea, perf.serviceArea) : JSON.stringify(pick(bp.serviceArea, perf.serviceArea) || ''),
      // Prefer BP for cityInCategory (computed there as the source of truth)
      (pick(bp.cityInCategory, perf.cityInCategory) === true ? 'Yes' : (pick(bp.cityInCategory, perf.cityInCategory) === false ? 'No' : '')),
      pick(bp.description, perf.description) || '',
      perf.socialMedia || '',
      pick(bp.websiteLink, perf.websiteLink) || '',
      pick(bp.bookAppointment, perf.bookAppointment) || '',
      pick(bp.timings, perf.timings) || '',
      pick(bp.photos, perf.photos) ?? '',
      pick(bp.attributes, perf.attributes) || '',
      typeof rv.totalReviewCount === 'number' ? rv.totalReviewCount : '',
      typeof rv.averageRating === 'number' ? rv.averageRating : '',
      (typeof ps.responseRate30d === 'number' ? (ps.responseRate30d.toFixed ? ps.responseRate30d.toFixed(2) : ps.responseRate30d)
       : (typeof bp.responseRate30d === 'number' ? (bp.responseRate30d.toFixed ? bp.responseRate30d.toFixed(2) : bp.responseRate30d) : '')),
      (typeof ps.responseRate90d === 'number' ? (ps.responseRate90d.toFixed ? ps.responseRate90d.toFixed(2) : ps.responseRate90d)
       : (typeof bp.responseRate90d === 'number' ? (bp.responseRate90d.toFixed ? bp.responseRate90d.toFixed(2) : bp.responseRate90d) : '')),
      (typeof bp.volatility === 'number' ? (bp.volatility.toFixed ? bp.volatility.toFixed(2) : bp.volatility) : ''),
      typeof bp.gmbPosts === 'number' ? bp.gmbPosts : '',
      '', // Q&A (not yet available)
      pick(bp.labels, perf.labels) || '',
      pick(bp.pinToMapLocation, perf.pinToMapLocation) || '',
      ps.timestamp ? new Date(ps.timestamp).toISOString() : '',
      rv.timestamp ? new Date(rv.timestamp).toISOString() : '',
      perf.timestamp ? new Date(perf.timestamp).toISOString() : '',
      bp.timestamp ? new Date(bp.timestamp).toISOString() : '',
    ];

    downloadCsv('your-data.csv', [headers, row]);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Your Data</Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        These values are saved when you visit the Business Profile and Profile Strength Results pages.
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Profile Strength</Typography>
          <Typography variant="body2">Business Name: {ps.businessTitle || '—'}</Typography>
          <Typography variant="body2">Address: {ps.address || '—'}</Typography>
          <Typography variant="body2">Profile Score: {typeof ps.profileScore === 'number' ? ps.profileScore : '—'}</Typography>
          <Typography variant="body2">Response Rate (30d): {typeof ps.responseRate30d === 'number' ? ps.responseRate30d : '—'}</Typography>
          <Typography variant="caption" color="text.secondary">Updated: {ps.timestamp ? new Date(ps.timestamp).toLocaleString() : '—'}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Reviews</Typography>
          <Typography variant="body2">Review Count: {typeof rv.totalReviewCount === 'number' ? rv.totalReviewCount : '—'}</Typography>
          <Typography variant="body2">Average Rating: {typeof rv.averageRating === 'number' ? rv.averageRating : '—'}</Typography>
          <Typography variant="caption" color="text.secondary">Updated: {rv.timestamp ? new Date(rv.timestamp).toLocaleString() : '—'}</Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleExport}>Export Your Data to CSV</Button>
        <Button variant="outlined" color="error" onClick={() => { clearYourData(); window.location.reload(); }}>Clear</Button>
      </Stack>
    </Box>
  );
};

const YourData = () => (
  <DashboardLayout>
    <YourDataInner />
  </DashboardLayout>
);

export default YourData;
