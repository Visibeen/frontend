// Simple namespaced token storage using localStorage only
// Frontend-only apps cannot securely store secrets; this aims for best-effort hygiene.

const STORAGE_KEY = 'auth_tokens';

function readAll() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : {};
  } catch (e) {
    console.warn('TokenStorage read error', e);
    return {};
  }
}

function writeAll(obj) {
  const s = JSON.stringify(obj);
  try {
    localStorage.setItem(STORAGE_KEY, s);
  } catch (_) {}
}

export function save(namespace, data) {
  const all = readAll();
  all[namespace] = { ...(all[namespace] || {}), ...data };
  writeAll(all);
}

export function load(namespace) {
  const all = readAll();
  return all[namespace] || null;
}

export function remove(namespace) {
  const all = readAll();
  delete all[namespace];
  writeAll(all);
}
