import { Sparkles, Zap, CheckCircle2, ArrowRight, Layers, Target, Rocket } from 'lucide-react';

function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #020617, #0f172a, #020617)' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            width: '384px',
            height: '384px',
            top: '-192px',
            left: '-192px',
            background: 'rgba(6, 182, 212, 0.1)',
            borderRadius: '9999px',
            filter: 'blur(96px)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '384px',
            height: '384px',
            bottom: '-192px',
            right: '-192px',
            background: 'rgba(168, 85, 247, 0.1)',
            borderRadius: '9999px',
            filter: 'blur(96px)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '1s'
          }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 96px' }}>
          <div style={{ display: 'grid', gap: '48px', gridTemplateColumns: window.innerWidth >= 1024 ? '1.2fr 1fr' : '1fr', alignItems: 'center' }}>
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '9999px',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                background: 'rgba(8, 47, 73, 0.3)',
                backdropFilter: 'blur(12px)',
                padding: '8px 16px',
                fontSize: '14px',
                color: '#67e8f9',
                fontWeight: '500',
                boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.1)',
                width: 'fit-content'
              }}>
                <Sparkles style={{ width: '16px', height: '16px' }} />
                Retail AI · Creative Automation · Compliance Safe
              </div>

              <h1 style={{
                fontSize: window.innerWidth >= 1280 ? '72px' : window.innerWidth >= 1024 ? '60px' : '48px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: '1.1',
                margin: 0
              }}>
                Design retailer-approved creatives in{' '}
                <span style={{
                  background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}>
                  minutes
                </span>
                , not weeks.
              </h1>

              <p style={{
                color: '#cbd5e1',
                fontSize: window.innerWidth >= 1024 ? '20px' : '18px',
                lineHeight: '1.75',
                maxWidth: '672px',
                margin: 0
              }}>
                Upload packshots, apply smart layouts, auto-fix compliance, and export
                ready-to-run creatives for retail media platforms like{' '}
                <span style={{ color: 'white', fontWeight: '600' }}>Amazon</span>,{' '}
                <span style={{ color: 'white', fontWeight: '600' }}>Walmart</span>, and{' '}
                <span style={{ color: 'white', fontWeight: '600' }}>Target</span>.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingTop: '16px' }}>
                <a
                  href="/editor"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.5)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(6, 182, 212, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(6, 182, 212, 0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Rocket style={{ width: '20px', height: '20px' }} />
                  Start new creative
                  <ArrowRight style={{ width: '20px', height: '20px' }} />
                </a>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: '2px solid #334155',
                  background: 'transparent',
                  color: '#f1f5f9',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#06b6d4';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#334155';
                  e.currentTarget.style.background = 'transparent';
                }}>
                  <Layers style={{ width: '20px', height: '20px' }} />
                  Import brand kit
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '32px', paddingTop: '32px' }}>
                {[
                  { value: '10x', label: 'Faster Production' },
                  { value: '100%', label: 'Compliance' },
                  { value: '50+', label: 'Formats' }
                ].map((stat, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '30px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Preview Card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
                borderRadius: '24px',
                filter: 'blur(96px)'
              }} />
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                border: '1px solid #1e293b',
                background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.8), rgba(2, 8, 23, 0.8))',
                backdropFilter: 'blur(12px)',
                padding: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      background: '#10b981',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }} />
                    <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500', margin: 0 }}>
                      Live creative preview
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    fontWeight: '600'
                  }}>
                    Auto-generated
                  </span>
                </div>

                <div style={{
                  aspectRatio: '3/4',
                  borderRadius: '16px',
                  background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
                  border: '1px solid #334155',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Grid pattern */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.05,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />

                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
                        color: '#67e8f9',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        fontWeight: '500',
                        backdropFilter: 'blur(12px)'
                      }}>
                        Tesco · Sponsored
                      </span>
                      <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                        1080×1350
                      </span>
                    </div>
                  </div>

                  <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    background: 'rgba(30, 41, 59, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(51, 65, 85, 0.5)'
                  }}>
                    <div style={{
                      height: '112px',
                      width: '112px',
                      borderRadius: '12px',
                      background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      fontSize: '48px'
                    }}>
                      📦
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                      <div style={{
                        height: '14px',
                        borderRadius: '9999px',
                        background: 'linear-gradient(to right, #475569, #334155)',
                        width: '80%',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }} />
                      <div style={{
                        height: '10px',
                        borderRadius: '9999px',
                        background: 'rgba(51, 65, 85, 0.7)',
                        width: '100%'
                      }} />
                      <div style={{
                        height: '10px',
                        borderRadius: '9999px',
                        background: 'rgba(51, 65, 85, 0.7)',
                        width: '75%'
                      }} />
                      <div style={{
                        marginTop: '8px',
                        height: '16px',
                        borderRadius: '9999px',
                        background: 'linear-gradient(to right, rgba(8, 145, 178, 0.4), rgba(37, 99, 235, 0.4))',
                        width: '96px',
                        border: '1px solid rgba(6, 182, 212, 0.3)'
                      }} />
                    </div>
                  </div>

                  <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#94a3b8',
                    background: 'rgba(2, 8, 23, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #1e293b'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#22d3ee' }} />
                      All elements auto-aligned
                    </span>
                    <span style={{ color: '#67e8f9', fontWeight: 'bold' }}>✓ 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px'
          }}>
            Everything you need to create{' '}
            <span style={{
              background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              perfect creatives
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>
            Powerful features that save time and ensure compliance
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(3, 1fr)' : '1fr'
        }}>
          {[
            {
              icon: Sparkles,
              title: 'Smart Layouts',
              desc: 'AI-powered templates for every retail platform with automatic optimization',
              color: 'linear-gradient(to right, #06b6d4, #3b82f6)'
            },
            {
              icon: CheckCircle2,
              title: 'Auto Compliance',
              desc: 'Instant validation against retailer guidelines with real-time fixes',
              color: 'linear-gradient(to right, #10b981, #059669)'
            },
            {
              icon: Zap,
              title: 'Bulk Export',
              desc: 'Generate 100+ format variations in seconds with one-click export',
              color: 'linear-gradient(to right, #a855f7, #ec4899)'
            }
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #1e293b',
                background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.5), rgba(2, 8, 23, 0.5))',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: feature.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <feature.icon style={{ width: '28px', height: '28px', color: 'white' }} />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '12px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#94a3b8',
                lineHeight: '1.75',
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{
          borderRadius: '24px',
          border: '1px solid #1e293b',
          background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.5), rgba(2, 8, 23, 0.5))',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <Target style={{ width: '24px', height: '24px', color: '#22d3ee' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              Trusted by retail brands
            </h3>
          </div>
          <p style={{
            color: '#94a3b8',
            fontSize: '18px',
            maxWidth: '672px',
            margin: '0 auto 32px'
          }}>
            Join hundreds of brands creating compliant, high-converting creatives for major retailers
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '32px',
            opacity: 0.6
          }}>
            {['Amazon', 'Walmart', 'Target', 'Kroger', 'Tesco'].map((brand) => (
              <div key={brand} style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#475569'
              }}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '1px solid #1e293b',
          background: 'linear-gradient(to right, rgba(8, 47, 73, 0.5), rgba(30, 58, 138, 0.5))',
          padding: '64px',
          textAlign: 'center'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
            filter: 'blur(96px)'
          }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{
              fontSize: window.innerWidth >= 1024 ? '48px' : '36px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px'
            }}>
              Ready to transform your creative workflow?
            </h2>
            <p style={{
              color: '#cbd5e1',
              fontSize: '20px',
              marginBottom: '40px',
              maxWidth: '672px',
              margin: '0 auto 40px'
            }}>
              Start creating retailer-approved creatives in minutes, not weeks
            </p>
            <a
              href="/editor"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 40px',
                borderRadius: '12px',
                background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(6, 182, 212, 0.75)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(6, 182, 212, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Rocket style={{ width: '24px', height: '24px' }} />
              Get Started Now
              <ArrowRight style={{ width: '24px', height: '24px' }} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;