import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ds-auth-gate">
      <div className="ds-auth-card">
        <h2 style={{ margin: '0 0 8px 0', color: 'var(--ds-green-900)' }}>
          {isSignUp ? 'Create Admin Account' : 'Admin Login'}
        </h2>
        <p style={{ margin: '0 0 24px 0', color: 'var(--ds-text-secondary)', fontSize: 14 }}>
          {isSignUp ? 'Sign up to manage Space 2 Grow content' : 'Please sign in to access the dashboard'}
        </p>

        {error && (
          <div style={{ background: '#fef2f2', color: '#b91c1c', padding: 12, borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ds-input"
              placeholder="admin@space2grow.com"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ds-input"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="ds-btn ds-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsSignUp(false)} style={{ color: 'var(--ds-green-600)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsSignUp(true)} style={{ color: 'var(--ds-green-600)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
