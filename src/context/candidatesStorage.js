const STORAGE_KEY = 'talentlens_candidates';

export function loadFromStorage() {
  if (typeof localStorage === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToStorage(candidates) {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
  } catch {
    // ignore storage errors
  }
}