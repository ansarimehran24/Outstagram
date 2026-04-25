import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storiesData } from '../Stories/Stories';

const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = storiesData.find(s => s.id === parseInt(id));

  useEffect(() => {
    if (!story) {
      navigate(-1); // go back if not found
      return;
    }
    const timer = setTimeout(() => {
      navigate(-1); // return to previous tab after 5 seconds
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [id, navigate, story]);

  if (!story) return null;

  return (
    <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      
      {/* Story UI Container */}
      <div style={{ width: '100%', maxWidth: '450px', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header */}
        <div style={{ width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, position: 'absolute', top: 0, left: 0, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={story.avatar} alt={story.username} style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{story.username}</span>
          </div>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'transparent', color: 'white', border: 'none', fontSize: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            &times;
          </button>
        </div>

        {/* Story Image */}
        <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <img src={story.image} alt={story.username} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        </div>
        
        {/* Bottom Message Bar */}
        <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box', zIndex: 10, position: 'absolute', bottom: 0, left: 0, display: 'flex', gap: '15px', alignItems: 'center', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
          <input 
            type="text" 
            placeholder={`Reply to ${story.username}...`} 
            style={{ flex: 1, background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '30px', padding: '12px 20px', color: 'white', fontSize: '15px', outline: 'none' }}
          />
          <button style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default StoryPage;
