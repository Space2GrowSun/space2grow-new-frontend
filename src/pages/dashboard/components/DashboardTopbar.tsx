import React, { useState, useRef, useEffect } from 'react';
import { Search, LogOut, Settings, User as UserIcon, X, Check } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { auth } from '../../../lib/firebase';
import { signOut } from 'firebase/auth';

interface DashboardTopbarProps {
  searchPlaceholder?: string;
  onSearch?: (q: string) => void;
}

export default function DashboardTopbar({
  searchPlaceholder = 'Search posts...',
  onSearch,
}: DashboardTopbarProps) {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const { user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => {
      setSettingsSaved(false);
      setShowSettingsModal(false);
    }, 1500);
  };

  return (
    <>
      <div className="ds-topbar">
        {/* Search */}
        <label className="ds-topbar-search" htmlFor="ds-search">
          <Search size={15} />
          <input
            id="ds-search"
            type="search"
            placeholder={searchPlaceholder}
            value={query}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        {/* Right controls */}
        <div className="ds-topbar-right">
          {/* Avatar with dropdown */}
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button 
              className="ds-topbar-avatar" 
              title={user?.email || 'Admin'}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              {userInitial}
            </button>
            
            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: '#fff',
                border: '1px solid var(--ds-border)',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                minWidth: 220,
                zIndex: 50,
                overflow: 'hidden'
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--ds-border)', background: '#fafafa' }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--ds-muted)', letterSpacing: '0.5px' }}>Signed in as</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: 13, fontWeight: 600, color: 'var(--ds-text)', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {user?.email || 'Unknown User'}
                  </p>
                </div>
                <div style={{ padding: '6px' }}>
                  <button 
                    className="ds-sidebar-utility-btn" 
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 12px', background: 'transparent' }}
                    onClick={() => { setMenuOpen(false); setShowSettingsModal(true); }}
                  >
                    <Settings size={14} />
                    Account Settings
                  </button>
                  <button 
                    className="ds-sidebar-utility-btn ds-signout-btn" 
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 12px', marginTop: 2, background: 'transparent' }} 
                    onClick={handleSignOut}
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 16
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            width: '100%',
            maxWidth: 480,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            border: '1px solid var(--ds-border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ds-border)', background: '#fafafa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Settings size={18} style={{ color: 'var(--ds-green-700)' }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ds-text)' }}>Account & CMS Settings</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ds-muted)', padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} style={{ padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--ds-text)' }}>Logged in Email</label>
                <input 
                  type="email" 
                  disabled 
                  value={user?.email || ''} 
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--ds-border)', borderRadius: 6, background: '#f3f4f6', fontSize: 14, color: '#6b7280' }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--ds-text)' }}>Display Name / Role</label>
                <input 
                  type="text" 
                  defaultValue="Community Manager" 
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--ds-border)', borderRadius: 6, fontSize: 14 }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--ds-text)' }}>CMS Environment</label>
                <div style={{ fontSize: 13, color: 'var(--ds-muted)', background: '#f8fdf9', border: '1px solid var(--ds-border)', padding: '10px 12px', borderRadius: 6 }}>
                  Connected to Sanity Content Lake & Firebase Auth
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button 
                  type="button" 
                  onClick={() => setShowSettingsModal(false)}
                  className="ds-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="ds-btn ds-btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {settingsSaved ? (
                    <>
                      <Check size={14} /> Saved
                    </>
                  ) : 'Save Preferences'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
