import { useState } from 'react';
import './ExplorePage.css';

const exploreImages = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/explore${i + 1}/400/400`,
  likes: Math.floor(Math.random() * 20000 + 500),
  comments: Math.floor(Math.random() * 500 + 10),
  username: ['alex_dev', 'priya.sh', 'karan.fit', 'sneha_art', 'meera_photo', 'arjun.tech'][Math.floor(Math.random() * 6)],
  span: i % 7 === 0 || i % 11 === 0 ? 'double' : 'single',
}));

const categories = ['All', 'Travel', 'Food', 'Fashion', 'Nature', 'Art', 'Fitness', 'Tech'];

const ExplorePage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = exploreImages.filter(img =>
    activeCategory === 'All' || true
  );

  return (
    <div className="explore-page fade-in">
      {/* Search Bar */}
      <div className="explore-page__search-wrap">
        <div className="explore-page__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="explore-page__search-icon">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="explore-page__search-input"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="explore-page__categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`explore-page__category ${activeCategory === cat ? 'explore-page__category--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="explore-page__grid">
        {filtered.map(item => (
          <div
            key={item.id}
            className={`explore-page__grid-item ${item.span === 'double' ? 'explore-page__grid-item--double' : ''}`}
          >
            <img src={item.src} alt={`Explore ${item.id}`} className="explore-page__img" loading="lazy" />
            <div className="explore-page__overlay">
              <div className="explore-page__overlay-stats">
                <span>❤️ {item.likes.toLocaleString()}</span>
                <span>💬 {item.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
