/* ============================================================
   POCKET APP — AuthManager
   Mock OTP, OAuth, and session management
   (Will be replaced by Supabase Auth in Pillar 3)
   ============================================================ */

import { uid } from '../utils/format.js';

const AUTH_STORAGE_KEY = 'pocket-auth-v1';

export const AuthManager = {
  _state: null,
  _pendingAction: null,   // 'export' | 'sync' | null
  _otpTimer: null,
  _mockOTPCode: '123456', // demo code — replaced by real backend

  /* ── State management ── */
  _loadAuth() {
    if (this._state) return this._state;
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      this._state = raw ? JSON.parse(raw) : { isLoggedIn: false, token: null, user: null, nudgeDismissed: false };
    } catch {
      this._state = { isLoggedIn: false, token: null, user: null, nudgeDismissed: false };
    }
    return this._state;
  },

  _saveAuth() {
    try { localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this._state)); } catch { }
  },

  isLoggedIn() {
    return this._loadAuth().isLoggedIn === true;
  },

  getUser() {
    return this._loadAuth().user;
  },

  logout() {
    this._state = { isLoggedIn: false, token: null, user: null, nudgeDismissed: false };
    this._saveAuth();
  },

  /* ── Mock Backend Stubs (swap with Supabase later) ── */
  sendOTP(identifier) {
    return new Promise(resolve => {
      setTimeout(() => {
        this._mockOTPCode = String(Math.floor(100000 + Math.random() * 900000));
        console.log(`%c[Auth Mock] OTP code: ${this._mockOTPCode}`, 'color:#58cc02; font-weight:bold;');
        resolve({ success: true, message: `Code sent to ${identifier}` });
      }, 1200);
    });
  },

  verifyOTP(code) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (code === this._mockOTPCode) {
          const token = 'mock_token_' + Date.now();
          const user = {
            id: uid(),
            name: 'Pocket User',
            identifier: document.getElementById('auth-identifier')?.value || 'user@email.com',
            provider: 'otp',
            avatarEmoji: '👤',
          };
          this._state = { isLoggedIn: true, token, user, nudgeDismissed: true };
          this._saveAuth();
          resolve({ success: true, token, user });
        } else {
          resolve({ success: false, message: 'Invalid verification code' });
        }
      }, 800);
    });
  },

  socialLogin(provider) {
    return new Promise(resolve => {
      setTimeout(() => {
        const token = `mock_${provider}_token_` + Date.now();
        const user = {
          id: uid(),
          name: `Pocket User`,
          identifier: `user@${provider}.com`,
          provider: provider,
          avatarEmoji: provider === 'google' ? '🔵' : provider === 'apple' ? '⚫' : '🔷',
        };
        this._state = { isLoggedIn: true, token, user, nudgeDismissed: true };
        this._saveAuth();
        resolve({ success: true, token, user });
      }, 1500);
    });
  },

  initCaptcha() {
    console.log('[Auth Mock] Captcha initialized (invisible — no user interaction needed)');
    return Promise.resolve({ token: 'captcha_mock_token' });
  },
};
