
import React, { useState, useRef } from 'react';
import { Eye, EyeOff, X, Plus, Trash2, Pencil, ChevronDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './homepage.css';   // reuse navbar/footer/buttons/gradients (from HomePage)
import './ProfilePage.css'; // profile-specific styles

export default function ProfilePage() {
  const defaultPfp = '/default_pfp.jpg';
  const defaultBanner = '/default_banner.jpg';

  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultPfp);
  const [bannerImage, setBannerImage] = useState(defaultBanner);
  const [highlightVideo, setHighlightVideo] = useState(null);
  const [headshot, setHeadshot] = useState(null);

  const [userName, setUserName] = useState('Misha Shah');
  const [subtitle, setSubtitle] = useState('Dancer');
  const [tagline, setTagline] = useState(
    "I'm Misha Shah, a passionate dancer and creative spirit with a love for movement and self-expression."
  );

  const [skills, setSkills] = useState([
    'Choreography', 'Floorwork', 'Improvisation', 'Musicality', 'Synchronized Ensemble'
  ]);

  const [dances, setDances] = useState([
    { id: uuidv4(), title: 'Hip-Hop',       imageUrl: '/hiphop.jpg',       isEditing: false },
    { id: uuidv4(), title: 'Contemporary',  imageUrl: '/contemporary.jpg', isEditing: false },
    { id: uuidv4(), title: 'Heels',         imageUrl: '/heels.jpg',        isEditing: false }
  ]);

  const pfpInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const headshotInputRef = useRef(null);
  const newSkillInputRef = useRef(null);

  // NEW: one shared image picker for tiles
  const tileImagePickerRef = useRef(null);
  const [imagePickIndex, setImagePickIndex] = useState(null);

  const handleFileChange = (e, setFn) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFn(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    const val = newSkillInputRef.current?.value?.trim();
    if (val && !skills.includes(val)) {
      setSkills(prev => [...prev, val]);
      newSkillInputRef.current.value = '';
    }
  };

  const handleRemoveSkill = (skill) => setSkills(prev => prev.filter(s => s !== skill));

  const handleDragEnd = (result) => {
    if (!editMode) return;
    const { source, destination } = result;
    if (!destination) return;
    const reordered = [...dances];
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);
    setDances(reordered);
  };

  const handleAddDance = () => {
    setDances(prev => [
      ...prev,
      { id: uuidv4(), title: 'New Style', imageUrl: '/default_dance.jpg', isEditing: true }
    ]);
  };

  const handleDeleteDance = (index) => setDances(prev => prev.filter((_, i) => i !== index));

  const toggleEditDanceTitle = (index) => {
    setDances(prev => prev.map((d, i) => i === index ? { ...d, isEditing: true } : d));
  };

  // NEW: When a tile is clicked in edit mode, open shared picker
  const handleTileImageClick = (index) => {
    if (!editMode) return;
    setImagePickIndex(index);
    tileImagePickerRef.current?.click();
  };

  // NEW: After picking, update that tile's background
  const handleTileImagePicked = (e) => {
    const file = e.target.files?.[0];
    if (!file || imagePickIndex == null) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDances(prev =>
        prev.map((x, i) => (i === imagePickIndex ? { ...x, imageUrl: reader.result } : x))
      );
      setImagePickIndex(null);
      e.target.value = ''; // allow picking the same file again later
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`profile ${editMode ? 'edit-on' : ''}`}>
      {/* Nav Bar — reuse HomePage navbar styles */}
      <nav className="navbar">
        <div className="logo black-text">8count<span className="dot">.</span></div>
        <input className="search" type="text" placeholder="Search dancers, styles, trends..." />
        <div className="nav-buttons">
          <button className="btn create-btn">Create Video</button>
          <button className="btn login-btn">Login</button>
          <button className="notif-btn">🔔</button>
        </div>
      </nav>

      {/* Profile Header (Banner + Avatar + Edit Toggle) */}
      <header className="profile-header">
        <div
          className="profile-banner"
          style={{ backgroundImage: `url(${bannerImage})` }}
          onClick={() => editMode && bannerInputRef.current?.click()}
        >
          {editMode && <div className="profile-edit-overlay">Click to change banner</div>}

          <button
            className="edit-toggle"
            onClick={(e) => { e.stopPropagation(); setEditMode(v => !v); }}
            title={editMode ? 'Exit edit mode' : 'Enter edit mode'}
            aria-label="Toggle edit mode"
          >
            {editMode ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <input
            className="hidden-input"
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setBannerImage)}
          />
        </div>

        <div
          className="profile-avatar"
          onClick={() => editMode && pfpInputRef.current?.click()}
          title={editMode ? 'Click to change profile photo' : undefined}
        >
          <img src={profileImage} alt="Profile" />
          <input
            className="hidden-input"
            ref={pfpInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setProfileImage)}
          />
        </div>
      </header>

      {/* Body */}
      <main className="profile-body">
        {/* Name */}
        {editMode ? (
          <input
            className="input-line profile-title"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : (
          <h1 className="profile-title">{userName}</h1>
        )}

        {/* Subtitle */}
        {editMode ? (
          <input
            className="input-line profile-subtitle"
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        ) : (
          <p className="profile-subtitle">{subtitle}</p>
        )}

        {/* Tagline */}
        {editMode ? (
          <textarea
            className="textarea-box profile-tagline"
            rows={3}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        ) : (
          <p className="profile-tagline">{tagline}</p>
        )}

        {/* Skills */}
        <section className="skill-section-section">
          <strong>Key Skills:</strong>
          <div className="skill-chips">
            {skills.map((s) => (
              <span key={s} className="skill-chip">
                {s}
                {editMode && (
                  <button className="skill-remove" onClick={() => handleRemoveSkill(s)} title="Remove skill">
                    <X size={14} />
                  </button>
                )}
              </span>
            ))}
          </div>

          {editMode && (
            <div className="skill-add-row">
              <input ref={newSkillInputRef} className="input-line" type="text" placeholder="Add skill" />
              <button className="add-btn" onClick={handleAddSkill}>Add</button>
            </div>
          )}
        </section>

        {/* Media: Highlight Reel + Headshot */}
        <section className="media-row section">
          <div className="media-card">
            <h2>Highlight Reel</h2>
            {highlightVideo ? (
              <video controls style={{ width: '100%', borderRadius: '0.5rem' }}>
                <source src={highlightVideo} type="video/mp4" />
              </video>
            ) : (
              <p>No highlight reel uploaded.</p>
            )}
            {editMode && (
              <div style={{ marginTop: '.5rem' }}>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, setHighlightVideo)}
                />
              </div>
            )}
          </div>

          <div className="media-card">
            <h2>Headshot</h2>
            {headshot ? (
              <img src={headshot} alt="Headshot" style={{ width: '100%', maxHeight: '18rem', objectFit: 'contain', borderRadius: '0.5rem' }} />
            ) : (
              <p>No headshot uploaded.</p>
            )}
            {editMode && (
              <div style={{ marginTop: '.5rem' }}>
                <input
                  ref={headshotInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setHeadshot)}
                />
              </div>
            )}
          </div>
        </section>

        {/* Folder grid (drag & drop) */}
        <section className="section">
          {editMode && (
            <button className="join-btn" onClick={handleAddDance}>
              <Plus size={16} style={{ marginRight: 6, verticalAlign: -2 }} />
              Add Folder
            </button>
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="dances" direction="horizontal">
              {(provided) => (
                <div className="folders" ref={provided.innerRef} {...provided.droppableProps}>
                  {dances.map((d, index) => (
                    <Draggable key={d.id} draggableId={d.id} index={index} isDragDisabled={!editMode}>
                      {(providedDraggable) => (
                        <div
                          className="folder-tile"
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          onClick={() => handleTileImageClick(index)}  // NEW: click tile to change image
                          style={{ ...providedDraggable.draggableProps.style, backgroundImage: `url(${d.imageUrl})` }}
                        >
                          {editMode && (
                            <div
                              className="drag-handle"
                              {...providedDraggable.dragHandleProps}
                              onClick={(e) => e.stopPropagation()}   // keep arrow purely for dragging
                              title="Drag"
                            >
                              <ChevronDown size={18} />
                            </div>
                          )}

                          <div className="folder-mask">
                            {editMode && d.isEditing ? (
                              <input
                                autoFocus
                                value={d.title}
                                onChange={(e) =>
                                  setDances(prev =>
                                    prev.map((x, i) => (i === index ? { ...x, title: e.target.value } : x))
                                  )
                                }
                                onBlur={() =>
                                  setDances(prev => prev.map((x, i) => (i === index ? { ...x, isEditing: false } : x)))
                                }
                                style={{
                                  background: 'transparent',
                                  border: '0',
                                  borderBottom: '1px solid white',
                                  color: 'white',
                                  fontWeight: 800,
                                  textAlign: 'center',
                                  outline: 'none',
                                  fontSize: '1.05rem',
                                }}
                              />
                            ) : (
                              <div className="folder-title">{d.title}</div>
                            )}
                            {editMode && (
                              <div className="folder-actions">
                                <button
                                  className="icon-button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleEditDanceTitle(index);
                                  }}
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  className="icon-button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteDance(index);
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>

        {/* NEW: one shared hidden input for all folder tiles */}
        <input
          ref={tileImagePickerRef}
          className="hidden-input"
          type="file"
          accept="image/*"
          onChange={handleTileImagePicked}
        />
      </main>

      {/* Footer — same as HomePage */}
      <footer className="footer">
        <div className="footer-tab">Discover</div>
        <div className="footer-tab">Community</div>
        <div className="footer-tab">Create</div>
        <div className="footer-tab">Profile</div>
      </footer>
    </div>
  );
}