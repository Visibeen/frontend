import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  TextField,
  Paper,
  LinearProgress,
  Grid,
} from '@mui/material';
import DashboardLayout from '../Layouts/DashboardLayout';
import { RankingService } from '../../heatmap/lib/ranking-service';
import { GooglePlacesService } from '../../heatmap/lib/google-places';
import HeatmapMap from './HeatmapMap';
import HeatmapPreviewMap from './HeatmapPreviewMap';

const HeatmapPage = () => {
  const defaultApiKey = process.env.REACT_APP_PLACES_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY || '';

  const [form, setForm] = useState({
    businessName: '',
    keyword: '',
    lat: '',
    lng: '',
    gridSize: 5,
    radiusKm: 2,
  });
  const [progress, setProgress] = useState({ pct: 0, msg: '' });
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const autoRunTried = useRef(false);

  const rankingService = useMemo(() => new RankingService(defaultApiKey, true), [defaultApiKey]);
  const places = useMemo(() => new GooglePlacesService(defaultApiKey, true), [defaultApiKey]);

  const update = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  // Prefill from query params and optionally auto-run
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const businessName = params.get('businessName') || '';
      const placeId = params.get('placeId') || '';
      const keyword = params.get('keyword') || '';

      if (businessName || keyword) {
        setForm((s) => ({
          ...s,
          businessName: businessName || s.businessName,
          keyword: keyword || s.keyword,
        }));
      }

      const resolveAndMaybeRun = async () => {
        try {
          if (placeId && (!form.lat || !form.lng)) {
            const coords = await places.getCoordinatesByPlaceId(placeId);
            setForm((s) => ({ ...s, lat: String(coords.lat), lng: String(coords.lng) }));
            // If keyword provided and not yet auto-run, trigger analysis
            if (keyword && !autoRunTried.current) {
              autoRunTried.current = true;
              // Slight delay to ensure state is set
              setTimeout(() => run(), 50);
            }
          } else if (keyword && businessName && form.lat && form.lng && !autoRunTried.current) {
            autoRunTried.current = true;
            setTimeout(() => run(), 0);
          }
        } catch (e) {
          setError(`Failed to resolve coordinates by Place ID: ${e?.message || e}`);
        }
      };

      resolveAndMaybeRun();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } catch (_) {}
  }, [places]);

  

  const run = async () => {
    setError('');
    setResult(null);
    const center = { lat: Number(form.lat), lng: Number(form.lng) };
    const config = {
      businessName: form.businessName.trim(),
      businessAddress: '',
      keyword: form.keyword.trim(),
      centerLocation: center,
      gridSize: Number(form.gridSize),
      searchRadius: Number(form.radiusKm),
      googleApiKey: defaultApiKey,
    };
    const validation = rankingService.validateConfig(config);
    if (!validation.isValid) {
      setError(validation.errors.join(' \n'));
      return;
    }
    setRunning(true);
    try {
      const data = await rankingService.performRankingAnalysis(config, (pct, _total, msg) => setProgress({ pct, msg }));
      setResult(data);
    } catch (e) {
      setError(e?.message || 'Unexpected error while running analysis');
    } finally {
      setRunning(false);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          GMB Ranking Heatmap
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
         Enter business name, keyword, and center coordinates. Then Run Analysis to compute grid rankings.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Business Name" fullWidth value={form.businessName} onChange={update('businessName')} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Search Keyword" fullWidth value={form.keyword} onChange={update('keyword')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Latitude" fullWidth value={form.lat} onChange={update('lat')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Longitude" fullWidth value={form.lng} onChange={update('lng')} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField type="number" label="Pins (grid size)" fullWidth value={form.gridSize} onChange={update('gridSize')} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField type="number" label="Radius (km)" fullWidth value={form.radiusKm} onChange={update('radiusKm')} />
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <HeatmapPreviewMap
                  center={{ lat: Number(form.lat || 0), lng: Number(form.lng || 0) }}
                  gridSize={Number(form.gridSize) || 5}
                  radiusKm={Number(form.radiusKm) || 2}
                  height={380}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" sx={{ backgroundColor: '#0B91D6' }} onClick={run} disabled={running}>
                  {running ? 'Running…' : 'Continue'}
                </Button>
              </Stack>
            </Grid>
            {running && (
              <Grid item xs={12}>
                <LinearProgress variant="determinate" value={progress.pct} />
                <Typography variant="caption" sx={{ color: '#6b7280' }}>{progress.msg}</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>

        {result && (
          <>
            {/* Summary Stats Row */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {(() => {
                const ranks = result.results.map(r => r.targetBusinessRank);
                const good = ranks.filter(r => typeof r === 'number' && r <= 3).length;
                const avg = ranks.filter(r => typeof r === 'number' && r > 3 && r <= 7).length;
                const poor = ranks.filter(r => r == null || r > 7).length;
                const total = ranks.length || 1;
                const avgRank = result.averageRank ?? null;
                const shareOfVoice = Math.round((good / total) * 100);
                const outOfTop20 = ranks.filter(r => r == null || r > 20).length;
                const cards = [
                  { label: 'Good', value: `${Math.round((good/total)*100)}%` },
                  { label: 'Poor', value: `${Math.round((poor/total)*100)}%` },
                  { label: 'Average', value: `${Math.round((avg/total)*100)}%` },
                  { label: 'Average Rank', value: avgRank == null ? '—' : Math.round(avgRank) },
                  { label: 'Share of voice', value: `${shareOfVoice}%` },
                  { label: 'Out of Top 20', value: `${Math.round((outOfTop20/total)*100)}%` },
                ];
                return cards.map((c, idx) => (
                  <Grid key={idx} item xs={6} sm={4} md={2}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Typography sx={{ fontSize: 12, color: '#6b7280' }}>{c.label}</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{c.value}</Typography>
                    </Paper>
                  </Grid>
                ));
              })()}
            </Grid>

            {/* Map with ranked markers */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Map</Typography>
              <HeatmapMap center={result.centerLocation} results={result.results} height={520} />
            </Paper>
          </>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default HeatmapPage;
