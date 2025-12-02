import { useRef, useState } from 'react';
import { Upload, Image, ZoomIn, ZoomOut, Save, Trash2, Sparkles, Type, Download } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Editor() {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [canvasFormat, setCanvasFormat] = useState('1:1');
  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [rotation, setRotation] = useState(0);

  const formats = [
    { ratio: '1:1', name: 'Instagram', width: 1080, height: 1080 },
    { ratio: '9:16', name: 'Stories', width: 1080, height: 1920 },
    { ratio: '16:9', name: 'Display', width: 1920, height: 1080 },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('File too large. Maximum size is 10MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL using createObjectURL for better performance
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleUploadToServer = async () => {
    if (!selectedFile) return;
    // Simulate upload with delay
    alert('Uploading to server...');
    setTimeout(() => {
      alert('Upload successful! File saved to server.');
    }, 1000);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  
  const handleClearCanvas = () => {
    // Revoke the object URL to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    setPosX(0);
    setPosY(0);
    setZoom(1);
    setOpacity(100);
    setRotation(0);
  };

  const handleExport = () => {
    if (!previewUrl) {
      alert('Please upload an image first');
      return;
    }
    alert(`Exporting canvas as ${canvasFormat} format...`);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#020817',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #1e293b',
        backgroundColor: 'rgba(2, 8, 23, 0.95)',
        backdropFilter: 'blur(12px)',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
              Creative Canvas
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
              Upload assets, arrange layout, and preview multi-format creatives
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: '#1e293b',
                color: '#f1f5f9',
                border: 'none',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
            >
              <Upload style={{ width: '1rem', height: '1rem' }} />
              Upload Assets
            </button>
            <button 
              onClick={handleExport}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: '#06b6d4',
                color: '#020817',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#22d3ee'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
            >
              <Download style={{ width: '1rem', height: '1rem' }} />
              Export Canvas
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        width: '100%',
        padding: '1.5rem',
        display: 'grid',
        gridTemplateColumns: '300px 1fr 340px',
        gap: '1.5rem',
        boxSizing: 'border-box',
        maxWidth: '100%'
      }}>
        {/* Left Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
          {/* Upload Section */}
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '0.875rem 1rem',
              borderBottom: '1px solid #1e293b',
              backgroundColor: '#0a0f1e'
            }}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Upload style={{ width: '1rem', height: '1rem' }} />
                Upload Product
              </h3>
            </div>
            <div style={{ padding: '1rem' }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #334155',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: '#0a0f1e'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#06b6d4';
                  e.currentTarget.style.backgroundColor = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#334155';
                  e.currentTarget.style.backgroundColor = '#0a0f1e';
                }}
              >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  margin: '0 auto 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image style={{ width: '2.5rem', height: '2.5rem', color: '#475569' }} />
                </div>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0 0 0.25rem 0' }}>
                  {selectedFile ? selectedFile.name : 'Click to upload'}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                  PNG, JPG up to 10MB
                </p>
              </div>

              {/* Preview Image */}
              {previewUrl && (
                <div style={{
                  marginTop: '0.75rem',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: '#0a0f1e'
                }}>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '256px',
                      objectFit: 'contain',
                      borderRadius: '0.25rem'
                    }}
                  />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <button
                onClick={handleUploadToServer}
                disabled={!selectedFile}
                style={{
                  width: '100%',
                  marginTop: '0.75rem',
                  backgroundColor: selectedFile ? '#334155' : '#1e293b',
                  color: selectedFile ? 'white' : '#64748b',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: selectedFile ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (selectedFile) e.currentTarget.style.backgroundColor = '#475569';
                }}
                onMouseLeave={(e) => {
                  if (selectedFile) e.currentTarget.style.backgroundColor = '#334155';
                }}
              >
                Upload to Server
              </button>
            </div>
          </div>

          {/* Tools Section */}
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '0.875rem 1rem',
              borderBottom: '1px solid #1e293b',
              backgroundColor: '#0a0f1e'
            }}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Sparkles style={{ width: '1rem', height: '1rem' }} />
                Tools
              </h3>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { icon: Image, label: 'Remove Background' },
                { icon: Sparkles, label: 'AI Generate BG' },
                { icon: Type, label: 'Add Text Layer' }
              ].map((tool, idx) => (
                <button 
                  key={idx}
                  style={{
                    width: '100%',
                    backgroundColor: '#1e293b',
                    color: '#cbd5e1',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                >
                  <tool.icon style={{ width: '1rem', height: '1rem' }} />
                  {tool.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Canvas */}
        <div style={{ minWidth: 0 }}>
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '0.875rem 1rem',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#0a0f1e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white', margin: 0 }}>
                  Main Canvas
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {formats.find(f => f.ratio === canvasFormat)?.width} × {formats.find(f => f.ratio === canvasFormat)?.height}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button 
                  onClick={handleZoomOut}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <ZoomOut style={{ width: '1rem', height: '1rem' }} />
                </button>
                <button 
                  onClick={handleZoomIn}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <ZoomIn style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                backgroundColor: '#020817',
                borderRadius: '0.5rem',
                border: '1px solid #1e293b',
                overflow: 'hidden',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: '100%',
                  paddingBottom: '100%',
                  position: 'relative',
                  backgroundColor: '#0a0f1e'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${zoom})`,
                    transition: 'transform 0.2s'
                  }}>
                    {previewUrl ? (
                      <img 
                        ref={canvasRef}
                        src={previewUrl} 
                        alt="Preview" 
                        style={{
                          maxWidth: '90%',
                          maxHeight: '90%',
                          objectFit: 'contain',
                          transform: `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`,
                          opacity: opacity / 100,
                          transition: 'all 0.1s'
                        }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        <Image style={{ width: '5rem', height: '5rem', color: '#1e293b', margin: '0 auto 0.75rem' }} />
                        <p style={{ color: '#475569', fontSize: '0.875rem', margin: 0 }}>
                          Upload an image to get started
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#cbd5e1',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                >
                  <Save style={{ width: '1rem', height: '1rem' }} />
                  Save State
                </button>
                <button 
                  onClick={handleClearCanvas}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#cbd5e1',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                >
                  <Trash2 style={{ width: '1rem', height: '1rem' }} />
                  Clear Canvas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
          {/* Export Formats */}
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '0.875rem 1rem',
              borderBottom: '1px solid #1e293b',
              backgroundColor: '#0a0f1e'
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white', margin: 0 }}>
                Export Formats
              </h3>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {formats.map((format) => (
                <button
                  key={format.ratio}
                  onClick={() => setCanvasFormat(format.ratio)}
                  style={{
                    width: '100%',
                    borderRadius: '0.5rem',
                    border: canvasFormat === format.ratio ? '1px solid #06b6d4' : '1px solid #334155',
                    backgroundColor: canvasFormat === format.ratio ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.5)',
                    padding: '0.75rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (canvasFormat !== format.ratio) {
                      e.currentTarget.style.borderColor = '#475569';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (canvasFormat !== format.ratio) {
                      e.currentTarget.style.borderColor = '#334155';
                    }
                  }}
                >
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: canvasFormat === format.ratio ? '#22d3ee' : 'white'
                  }}>
                    {format.ratio}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{format.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                    {format.width}×{format.height}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Properties Panel */}
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '0.75rem',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '0.875rem 1rem',
              borderBottom: '1px solid #1e293b',
              backgroundColor: '#0a0f1e'
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white', margin: 0 }}>
                Properties
              </h3>
            </div>
            <div style={{ padding: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem', marginTop: 0 }}>
                {previewUrl ? 'Adjust image properties' : 'Select an object to edit properties'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#94a3b8',
                    marginBottom: '0.5rem'
                  }}>
                    Position X: {posX}px
                  </label>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={posX}
                    onChange={(e) => setPosX(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '0.5rem',
                      appearance: 'none',
                      backgroundColor: '#334155',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      accentColor: '#06b6d4'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#94a3b8',
                    marginBottom: '0.5rem'
                  }}>
                    Position Y: {posY}px
                  </label>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={posY}
                    onChange={(e) => setPosY(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '0.5rem',
                      appearance: 'none',
                      backgroundColor: '#334155',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      accentColor: '#06b6d4'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#94a3b8',
                    marginBottom: '0.5rem'
                  }}>
                    Scale: {zoom.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.3"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    style={{
                      width: '100%',
                      height: '0.5rem',
                      appearance: 'none',
                      backgroundColor: '#334155',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      accentColor: '#06b6d4'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#94a3b8',
                    marginBottom: '0.5rem'
                  }}>
                    Rotation: {rotation}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '0.5rem',
                      appearance: 'none',
                      backgroundColor: '#334155',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      accentColor: '#06b6d4'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#94a3b8',
                    marginBottom: '0.5rem'
                  }}>
                    Opacity: {opacity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '0.5rem',
                      appearance: 'none',
                      backgroundColor: '#334155',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      accentColor: '#06b6d4'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}