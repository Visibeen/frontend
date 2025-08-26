import React, { useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { generateGridPoints } from '../../heatmap/lib/geolocation';

const redIcon = (() => {
  const size = 16;
  return L.divIcon({
    html: `
      <div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:#EF4444;border:2px solid #B91C1C;box-shadow:0 1px 4px rgba(0,0,0,0.25);
      "></div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
})();

/**
 * Props:
 * - center: { lat, lng }
 * - gridSize: number (e.g., 5)
 * - radiusKm: number
 * - height: CSS height
 */
const HeatmapPreviewMap = ({ center, gridSize, radiusKm, height = 360 }) => {
  const hasValidCenter = center && typeof center.lat === 'number' && typeof center.lng === 'number' && !Number.isNaN(center.lat) && !Number.isNaN(center.lng);
  const mapCenter = hasValidCenter ? center : { lat: 28.6139, lng: 77.2090 }; // Fallback: New Delhi, IN

  const points = useMemo(() => {
    if (!hasValidCenter || !gridSize || !radiusKm) return [];
    return generateGridPoints(center, radiusKm, gridSize);
  }, [center, gridSize, radiusKm, hasValidCenter]);

  return (
    <div style={{ width: '100%', height }}>
      <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={12} style={{ width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={redIcon} />
        ))}
      </MapContainer>
    </div>
  );
};

export default HeatmapPreviewMap;
