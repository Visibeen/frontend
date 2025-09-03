let pendingPopupPromise = null;

export async function signInWithGoogleOnce(auth, provider, configureProvider) {
  if (pendingPopupPromise) {
    return pendingPopupPromise;
  }

  if (typeof configureProvider === 'function') {
    try { configureProvider(provider); } catch (_) {}
  }

  const { signInWithPopup } = await import('firebase/auth');
  pendingPopupPromise = signInWithPopup(auth, provider)
    .catch((err) => {
      // Normalize common popup errors and rethrow
      return Promise.reject(err);
    })
    .finally(() => {
      pendingPopupPromise = null;
    });

  return pendingPopupPromise;
}

export function hasPendingGooglePopup() {
  return !!pendingPopupPromise;
}


