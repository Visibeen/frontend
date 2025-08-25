import React, { useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// Compute marker color by rank
const rankColor = (rank) => {
  if (rank == null) return '#9CA3AF'; // gray
  if (rank <= 3) return '#22C55E'; // green
  if (rank <= 7) return '#FACC15'; // yellow
  return '#EF4444'; // red
};

function createRankIcon(rank) {
  const color = rankColor(rank);
  const text = rank == null ? '20+' : String(rank);
  const isDouble = text.length > 2; // handle 20+
  const size = isDouble ? 36 : 32;
  return L.divIcon({
    html: `
      <div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:${color};
        display:flex;align-items:center;justify-content:center;
        color:#111827;font-weight:700;font-size:14px;box-shadow:0 1px 4px rgba(0,0,0,0.25);
        border:2px solid ${color === '#EF4444' ? '#B91C1C' : color === '#22C55E' ? '#16A34A' : color === '#FACC15' ? '#D97706' : '#6B7280'};
      ">
        ${text}
      </div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    tooltipAnchor: [0, -size / 2],
  });
}

/**
 * Props:
 * - center: { lat, lng }
 * - results: array of entries from ranking-service: { gridPoint: {lat,lng,id,address}, targetBusinessRank }
 * - height: CSS height, default 520px
 */
const HeatmapMap = ({ center, results, height = 520 }) => {
  const markers = useMemo(() => {
    if (!Array.isArray(results)) return [];
    return results.map((r) => ({
      id: r.gridPoint.id,
      lat: r.gridPoint.lat,
      lng: r.gridPoint.lng,
      address: r.gridPoint.address,
      rank: r.targetBusinessRank == null || r.targetBusinessRank > 20 ? null : r.targetBusinessRank,
      rawRank: r.targetBusinessRank,
    }));
  }, [results]);

  if (!center) return null;

  return (
    <div style={{ width: '100%', height }}>
      <MapContainer center={[center.lat, center.lng]} zoom={12} style={{ width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={createRankIcon(m.rank)}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
              <div style={{ fontSize: 12 }}>
                <div><strong>Grid:</strong> {m.id}</div>
                <div><strong>Rank:</strong> {m.rawRank == null ? '20+' : m.rawRank}</div>
                {m.address ? <div style={{ maxWidth: 240 }}>{m.address}</div> : null}
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HeatmapMap;
