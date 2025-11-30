import { useState, useEffect } from 'react';

function Navbar() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Update path on navigation
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePathChange);

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path) => currentPath === path;

  const navLinkStyle = (path) => ({
    position: 'relative',
    padding: '8px 16px',
    color: isActive(path) ? '#22d3ee' : '#cbd5e1',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    background: isActive(path) ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
  });

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid #1e293b',
      background: scrolled 
        ? 'rgba(2, 8, 23, 0.98)' 
        : 'rgba(2, 8, 23, 0.95)',
      backdropFilter: 'blur(12px)',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 'none'
    }}>
      <nav style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo Section */}
        <a 
          href="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            textDecoration: 'none',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#020617',
            fontWeight: '800',
            fontSize: '20px',
            boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.2)',
            transition: 'all 0.3s ease'
          }}>
            CS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ 
              fontWeight: '700', 
              color: 'white', 
              fontSize: '18px',
              letterSpacing: '-0.02em'
            }}>
              Creato-Sphere
            </span>
            <span style={{ 
              fontSize: '11px', 
              color: '#94a3b8',
              fontWeight: '500'
            }}>
              AI Retail Creative Studio
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="/"
            style={navLinkStyle('/')}
            onMouseEnter={(e) => {
              if (!isActive('/')) {
                e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#cbd5e1';
              }
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </span>
            {isActive('/') && (
              <div style={{
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
                borderRadius: '2px'
              }} />
            )}
          </a>

          <a
            href="/editor"
            style={navLinkStyle('/editor')}
            onMouseEnter={(e) => {
              if (!isActive('/editor')) {
                e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/editor')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#cbd5e1';
              }
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Canvas Editor
            </span>
            {isActive('/editor') && (
              <div style={{
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
                borderRadius: '2px'
              }} />
            )}
          </a>

          {/* Action Button */}
          <button
            style={{
              marginLeft: '16px',
              padding: '8px 20px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              color: 'white',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(6, 182, 212, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)';
            }}
            onClick={() => window.location.href = '/editor'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Creative
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;