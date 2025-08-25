// Geolocation utilities for generating grid points and calculating distances

export function calculateDestination(start, bearingDegrees, distanceKm) {
  const toRadians = (deg) => deg * (Math.PI / 180);
  const toDegrees = (rad) => rad * (180 / Math.PI);
  const EARTH_RADIUS_KM = 6371;

  const lat1 = toRadians(start.lat);
  const lng1 = toRadians(start.lng);
  const bearing = toRadians(bearingDegrees);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distanceKm / EARTH_RADIUS_KM) +
      Math.cos(lat1) * Math.sin(distanceKm / EARTH_RADIUS_KM) * Math.cos(bearing)
  );

  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distanceKm / EARTH_RADIUS_KM) * Math.cos(lat1),
      Math.cos(distanceKm / EARTH_RADIUS_KM) - Math.sin(lat1) * Math.sin(lat2)
    );

  return {
    lat: toDegrees(lat2),
    lng: toDegrees(lng2),
  };
}

// Generate grid points and reverse geocode each to a clean address
export async function generateGridPointsWithAddresses(
  center,
  radiusKm = 1,
  gridSize = 5,
  apiKey = '',
  _useMockData = false,
  onProgress
) {
  const points = generateGridPoints(center, radiusKm, gridSize);
  const out = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    try {
      const address = await reverseGeocode(p, apiKey);
      out.push({ ...p, address });
      if (onProgress) onProgress(i + 1, points.length, address);
      if (i < points.length - 1) await new Promise((r) => setTimeout(r, 100));
    } catch (e) {
      console.warn(`Failed to get address for ${p.id}:`, e);
      out.push({ ...p, address: `${p.lat.toFixed(4)}, ${p.lng.toFixed(4)} (Address lookup failed)` });
    }
  }
  return out;
}

export function calculateDistance(point1, point2) {
  const toRadians = (deg) => deg * (Math.PI / 180);
  const EARTH_RADIUS_KM = 6371;

  const lat1 = toRadians(point1.lat);
  const lng1 = toRadians(point1.lng);
  const lat2 = toRadians(point2.lat);
  const lng2 = toRadians(point2.lng);

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

export function generateGridPoints(center, radiusKm = 1, gridSize = 5) {
  const points = [];
  const toRadians = (deg) => deg * (Math.PI / 180);
  const EARTH_RADIUS_KM = 6371;

  const stepSize = (2 * radiusKm) / (gridSize - 1);

  const startLat = center.lat + (radiusKm / EARTH_RADIUS_KM) * (180 / Math.PI);
  const startLng =
    center.lng -
    (radiusKm / (EARTH_RADIUS_KM * Math.cos(toRadians(center.lat)))) *
      (180 / Math.PI);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const latOffset = (-row * stepSize) / EARTH_RADIUS_KM * (180 / Math.PI);
      const lngOffset =
        (col * stepSize) /
        (EARTH_RADIUS_KM * Math.cos(toRadians(center.lat))) *
        (180 / Math.PI);

      const point = {
        lat: startLat + latOffset,
        lng: startLng + lngOffset,
        gridX: col,
        gridY: row,
        id: `grid-${row}-${col}`,
      };
      points.push(point);
    }
  }
  return points;
}

export function calculateGridBounds(gridPoints) {
  const lats = gridPoints.map((p) => p.lat);
  const lngs = gridPoints.map((p) => p.lng);
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };
}

export function getGridLabel(gridX, gridY) {
  const letters = 'ABCDE';
  return `${letters[gridY]}${gridX + 1}`;
}

export function isValidCoordinates(coords) {
  return (
    typeof coords?.lat === 'number' &&
    typeof coords?.lng === 'number' &&
    coords.lat >= -90 &&
    coords.lat <= 90 &&
    coords.lng >= -180 &&
    coords.lng <= 180
  );
}

export async function reverseGeocode(coords, apiKey) {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${apiKey}&result_type=street_address|premise|subpremise|locality|sublocality|administrative_area_level_2|administrative_area_level_1|postal_code`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding API request failed: ${res.status}`);
    const data = await res.json();
    if (data.status !== 'OK' || !data.results?.length) throw new Error(`Geocoding failed: ${data.status}`);
    return extractCleanAddressFromGoogleResults(data.results);
  } catch (e) {
    console.warn('Reverse geocoding failed:', e);
    return `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)} (Location Unknown)`;
  }
}

function extractCleanAddressFromGoogleResults(results) {
  try {
    let locality = '';
    let subLocality = '';
    let administrativeArea = '';
    let postalCode = '';
    let country = '';

    for (const result of results) {
      for (const component of result.address_components || []) {
        const types = component.types || [];
        if (types.includes('locality') && !locality) locality = component.long_name;
        else if (types.includes('administrative_area_level_2') && !locality) locality = component.long_name;
        else if ((types.includes('sublocality') || types.includes('sublocality_level_1') || types.includes('neighborhood')) && !subLocality) subLocality = component.long_name;
        else if (types.includes('administrative_area_level_1') && !administrativeArea) administrativeArea = component.long_name;
        else if (types.includes('postal_code') && !postalCode) postalCode = component.long_name;
        else if (types.includes('country') && !country) country = component.long_name;
      }
    }

    let clean = '';
    if (locality) clean += locality;
    if (subLocality) clean += (clean ? ', ' : '') + subLocality;
    if (postalCode) clean += (clean ? ' - ' : '') + postalCode;
    if (administrativeArea) clean += (clean ? ', ' : '') + administrativeArea;
    if (country) clean += (clean ? ', ' : '') + country;

    if (!clean && results.length > 0) {
      let fallback = results[0].formatted_address || '';
      fallback = fallback.replace(/[A-Z0-9]{4}\+[A-Z0-9]{2},?\s*/g, '');
      fallback = fallback.replace(/Unnamed Road,?\s*/gi, '');
      clean = fallback;
    }
    return clean || 'Unknown Location';
  } catch (e) {
    console.warn('Error extracting clean address:', e);
    return results?.[0]?.formatted_address || 'Unknown Location';
  }
}
