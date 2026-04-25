import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = ({ onUpdateUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'Larry',
    username: 'larry_me',
    bio: '📸 BTech CSE | 🚀 React Dev | ✨ Building cool stuff',
    website: '',
    email: 'larry@example.com',
    phone: '',
    gender: '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    onUpdateUser && onUpdateUser({ username: form.username });
    setTimeout(() => { setSaved(false); navigate(`/profile/${form.username}`); }, 1200);
  };

  return (
    <div className="edit-profile fade-in">
      <div className="edit-profile__container">
        <h2 className="edit-profile__title">Edit Profile</h2>

        {/* Avatar Section */}
        <div className="edit-profile__avatar-section">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${form.username}`}
            alt="Profile"
            className="edit-profile__avatar"
          />
          <div>
            <p className="edit-profile__username">{form.username}</p>
            <button className="edit-profile__change-photo">Change profile photo</button>
          </div>
        </div>

        {/* Form */}
        <form className="edit-profile__form" onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text', helper: 'Help people discover your account by using the name you\'re known by.' },
            { label: 'Username', name: 'username', type: 'text', helper: 'You can change your username once every 14 days.' },
            { label: 'Website', name: 'website', type: 'url', helper: '' },
            { label: 'Email', name: 'email', type: 'email', helper: '' },
            { label: 'Phone', name: 'phone', type: 'tel', helper: '' },
          ].map(field => (
            <div key={field.name} className="edit-profile__field">
              <label className="edit-profile__label">{field.label}</label>
              <div className="edit-profile__input-wrap">
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="edit-profile__input"
                  placeholder={field.label}
                />
                {field.helper && <p className="edit-profile__helper">{field.helper}</p>}
              </div>
            </div>
          ))}

          {/* Bio */}
          <div className="edit-profile__field">
            <label className="edit-profile__label">Bio</label>
            <div className="edit-profile__input-wrap">
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="edit-profile__textarea"
                rows={4}
                maxLength={150}
              />
              <div className="edit-profile__bio-count">{form.bio.length}/150</div>
            </div>
          </div>

          {/* Gender */}
          <div className="edit-profile__field">
            <label className="edit-profile__label">Gender</label>
            <div className="edit-profile__input-wrap">
              <select name="gender" value={form.gender} onChange={handleChange} className="edit-profile__select">
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Custom</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="edit-profile__actions">
            <button type="submit" className={`edit-profile__save-btn ${saved ? 'edit-profile__save-btn--saved' : ''}`}>
              {saved ? '✓ Saved!' : 'Submit'}
            </button>
            <Link to={`/profile/${form.username}`} className="edit-profile__cancel-btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
