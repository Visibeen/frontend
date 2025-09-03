// Simple localStorage-backed store for aggregating "Your Data" across pages
// Data model:
// {
//   profileStrength: { score, address, keywords, timestamp, ... },
//   reviews: { totalReviewCount, averageRating, responseRate30d, timestamp },
// }

const STORAGE_KEY = 'yourDataStore_v1';

const safeParse = (str) => {
  try { return JSON.parse(str); } catch { return {}; }
};

const readStore = () => {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? safeParse(raw) : {};
};

const writeStore = (data) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveProfileStrengthSnapshot = (payload) => {
  const store = readStore();
  store.profileStrength = {
    ...payload,
    timestamp: Date.now(),
  };
  writeStore(store);
};

export const saveReviewsSnapshot = (payload) => {
  const store = readStore();
  store.reviews = {
    ...payload,
    timestamp: Date.now(),
  };
  writeStore(store);
};

export const savePerformanceSnapshot = (payload) => {
  const store = readStore();
  store.performance = {
    ...payload,
    timestamp: Date.now(),
  };
  writeStore(store);
};

export const saveBusinessProfileSnapshot = (payload) => {
  const store = readStore();
  store.businessProfile = {
    ...(store.businessProfile || {}),
    ...payload,
    timestamp: Date.now(),
  };
  writeStore(store);
};

export const getYourData = () => readStore();

export const clearYourData = () => writeStore({});
