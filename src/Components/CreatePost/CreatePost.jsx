import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const [step, setStep] = useState('upload'); // upload | edit | caption
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [filter, setFilter] = useState('none');
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filters = [
    { name: 'Normal', value: 'none' },
    { name: 'Clarendon', value: 'contrast(1.2) saturate(1.35)' },
    { name: 'Gingham', value: 'brightness(1.05) hue-rotate(-10deg)' },
    { name: 'Moon', value: 'grayscale(1) contrast(1.1) brightness(1.1)' },
    { name: 'Lark', value: 'contrast(0.9) brightness(1.1) saturate(1.2)' },
    { name: 'Reyes', value: 'sepia(0.3) contrast(0.85) brightness(1.1) saturate(0.75)' },
    { name: 'Juno', value: 'saturate(1.4) contrast(1.05)' },
    { name: 'Slumber', value: 'saturate(0.66) brightness(1.05)' },
    { name: 'Crema', value: 'contrast(0.9) brightness(1.15) sepia(0.15)' },
    { name: 'Ludwig', value: 'contrast(1.05) brightness(1.05) saturate(0.9)' },
  ];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setStep('edit');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setStep('edit');
    }
  };

  const handlePost = () => {
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      setPosted(true);
      setTimeout(() => navigate('/'), 1500);
    }, 1500);
  };

  if (posted) {
    return (
      <div className="create-post__success fade-in">
        <div className="create-post__success-icon">✅</div>
        <h2>Post Shared!</h2>
        <p>Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="create-post fade-in">
      <div className="create-post__card">
        {/* Header */}
        <div className="create-post__header">
          {step !== 'upload' && (
            <button className="create-post__back" onClick={() => setStep(step === 'caption' ? 'edit' : 'upload')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          )}
          <h2 className="create-post__title">
            {step === 'upload' ? 'Create new post' : step === 'edit' ? 'Crop & Filter' : 'New post'}
          </h2>
          {step === 'edit' && (
            <button className="create-post__next-btn" onClick={() => setStep('caption')}>Next</button>
          )}
          {step === 'caption' && (
            <button className="create-post__share-btn" onClick={handlePost} disabled={posting}>
              {posting ? 'Sharing...' : 'Share'}
            </button>
          )}
        </div>

        {/* Upload Area */}
        {step === 'upload' && (
          <div className="create-post__upload" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => inputRef.current.click()}>
            <input type="file" ref={inputRef} onChange={handleFile} accept="image/*" style={{ display: 'none' }} />
            <div className="create-post__upload-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <h3>Drag photos and videos here</h3>
            <p>Or click to browse from computer</p>
            <button className="create-post__upload-btn" onClick={e => { e.stopPropagation(); inputRef.current.click(); }}>
              Select from computer
            </button>
          </div>
        )}

        {/* Edit / Filter */}
        {step === 'edit' && preview && (
          <div className="create-post__edit">
            <div className="create-post__preview-wrap">
              <img
                src={preview}
                alt="Preview"
                className="create-post__preview-img"
                style={{ filter }}
              />
            </div>
            <div className="create-post__filters">
              {filters.map(f => (
                <button
                  key={f.name}
                  className={`create-post__filter-item ${filter === f.value ? 'create-post__filter-item--active' : ''}`}
                  onClick={() => setFilter(f.value)}
                >
                  <div className="create-post__filter-preview" style={{ filter: f.value }}>
                    <img src={preview} alt={f.name} />
                  </div>
                  <span>{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Caption */}
        {step === 'caption' && preview && (
          <div className="create-post__caption-step">
            <div className="create-post__caption-left">
              <img src={preview} alt="Preview" className="create-post__caption-img" style={{ filter }} />
            </div>
            <div className="create-post__caption-right">
              <div className="create-post__user-row">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=larry" alt="me" className="create-post__caption-avatar" />
                <span className="create-post__caption-username">larry_me</span>
              </div>
              <textarea
                className="create-post__caption-textarea"
                placeholder="Write a caption..."
                value={caption}
                onChange={e => setCaption(e.target.value)}
                maxLength={2200}
              />
              <div className="create-post__char-count">{caption.length}/2,200</div>
              <input
                type="text"
                placeholder="Add location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="create-post__location-input"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
