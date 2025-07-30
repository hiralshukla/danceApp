import React, { useState, useRef } from 'react';
import { Eye, EyeOff, X, Plus, Trash2, Pencil, ChevronDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

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
    "I'm Misha Shah, a passionate dancer and creative spirit with a love for movement and self‑expression."
  );

  const [skills, setSkills] = useState([
    'Choreography',
    'Floorwork',
    'Improvisation',
    'Musicality',
    'Synchronized Ensemble'
  ]);

  const [dances, setDances] = useState([
    { id: uuidv4(), title: 'Hip‑Hop', imageUrl: '/hiphop.jpg', isEditing: false },
    { id: uuidv4(), title: 'Contemporary', imageUrl: '/contemporary.jpg', isEditing: false },
    { id: uuidv4(), title: 'Heels', imageUrl: '/heels.jpg', isEditing: false }
  ]);

  const pfpInputRef = useRef();
  const bannerInputRef = useRef();
  const videoInputRef = useRef();
  const headshotInputRef = useRef();
  const newSkillInputRef = useRef();

  const handleFileChange = (e, setFn) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFn(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    const newSkill = newSkillInputRef.current.value.trim();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      newSkillInputRef.current.value = '';
    }
  };

  const handleRemoveSkill = skillToRemove => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleDragEnd = result => {
    if (!editMode) return;
    const { source, destination } = result;
    if (!destination) return;
    const reordered = [...dances];
    const [movedItem] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, movedItem);
    setDances(reordered);
  };

  const handleAddDance = () => {
    setDances([...dances, { id: uuidv4(), title: 'New Style', imageUrl: '/default_dance.jpg', isEditing: true }]);
  };

  const handleDeleteDance = index => {
    setDances(prev => prev.filter((_, i) => i !== index));
  };

  const toggleEditDanceTitle = index => {
    const newDances = [...dances];
    newDances[index].isEditing = true;
    setDances(newDances);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="relative h-56 bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
        <button
          onClick={e => {
            e.stopPropagation();
            setEditMode(prev => !prev);
          }}
          className="absolute top-4 right-4 btn btn-sm btn-circle z-20"
        >
          {editMode ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

        {editMode && (
          <div
            className="absolute inset-0 bg-black bg-opacity-30 cursor-pointer"
            onClick={e => {
              if (e.target === e.currentTarget) {
                bannerInputRef.current.click();
              }
            }}
            style={{ zIndex: 10 }}
          />
        )}
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFileChange(e, setBannerImage)}
        />

        <div className={`avatar absolute -bottom-16 left-8 ${editMode ? 'cursor-pointer' : ''}`} onClick={() => editMode && pfpInputRef.current.click()}>
          <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>
        <input ref={pfpInputRef} type="file" accept="image/*" onChange={e => handleFileChange(e, setProfileImage)} className="hidden" />
      </div>

      <div className="pt-20 px-8">
        {editMode ? (
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="text-4xl font-bold bg-transparent border-b border-primary focus:outline-none w-full max-w-md" />
        ) : (
          <h1 className="text-4xl font-bold">{userName}</h1>
        )}

        {editMode ? (
          <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="text-lg bg-transparent text-base-content/70 border-b border-primary focus:outline-none w-full max-w-sm mt-1" />
        ) : (
          <p className="text-lg text-base-content/70">{subtitle}</p>
        )}

        {editMode ? (
          <textarea value={tagline} onChange={e => setTagline(e.target.value)} className="mt-2 w-full max-w-2xl bg-transparent border border-primary p-2 rounded-md text-sm focus:outline-none" />
        ) : (
          <p className="mt-2 max-w-2xl text-sm">{tagline}</p>
        )}

        <div className="mt-4">
          <strong>Key Skills:</strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map(skill => (
              <div key={skill} className="badge badge-primary gap-1 items-center">
                {skill}
                {editMode && <button onClick={() => handleRemoveSkill(skill)} className="ml-1"><X size={12} /></button>}
              </div>
            ))}
          </div>
          {editMode && (
            <div className="mt-2 flex gap-2">
              <input ref={newSkillInputRef} type="text" placeholder="Add skill" className="input input-sm input-bordered" />
              <button onClick={handleAddSkill} className="btn btn-sm btn-primary">Add</button>
            </div>
          )}
        </div>

        {editMode && (
          <div className="mt-6 flex gap-2">
            <button onClick={handleAddDance} className="btn btn-outline btn-sm"><Plus size={16} className="mr-1" /> Add Folder</button>
          </div>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="dances" direction="horizontal">
            {provided => (
              <div className="mt-8 flex flex-wrap gap-4" ref={provided.innerRef} {...provided.droppableProps}>
                {dances.map((d, index) => (
                  <Draggable key={d.id} draggableId={d.id} index={index} isDragDisabled={!editMode}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="relative w-60 pt-[75%] bg-cover bg-center rounded-lg overflow-hidden shadow-lg group"
                        style={{
                          ...provided.draggableProps.style,
                          backgroundImage: `url(${d.imageUrl})`
                        }}
                      >
                        {editMode && (
                          <div {...provided.dragHandleProps} className="absolute top-2 left-2 cursor-move z-30 text-white">
                            <ChevronDown size={18} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-2">
                          {editMode && d.isEditing ? (
                            <input
                              autoFocus
                              type="text"
                              value={d.title}
                              onBlur={() => {
                                const newDances = [...dances];
                                newDances[index].isEditing = false;
                                setDances(newDances);
                              }}
                              onChange={e => {
                                const newDances = [...dances];
                                newDances[index].title = e.target.value;
                                setDances(newDances);
                              }}
                              className="text-white text-xl font-bold bg-transparent border-b border-white text-center focus:outline-none"
                            />
                          ) : (
                            <h3 className="text-white text-xl font-bold">{d.title}</h3>
                          )}
                          {editMode && (
                            <>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  handleDeleteDance(index);
                                }}
                                className="mt-2 btn btn-xs btn-error z-20"
                              >
                                <Trash2 size={14} className="mr-1" /> Delete
                              </button>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  toggleEditDanceTitle(index);
                                }}
                                className="mt-1 btn btn-xs btn-secondary z-20"
                              >
                                <Pencil size={14} className="mr-1" /> Edit Name
                              </button>
                            </>
                          )}
                        </div>
                        {editMode && (
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            onClick={e => e.stopPropagation()}
                            onChange={e => {
                              const file = e.target.files[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => {
                                const updated = [...dances];
                                updated[index].imageUrl = reader.result;
                                setDances(updated);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">Highlight Reel</h2>
          {highlightVideo ? (
            <video controls className="w-full max-w-lg rounded-lg">
              <source src={highlightVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No video uploaded.</p>
          )}
          {editMode && (
            <div className="mt-2">
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={e => handleFileChange(e, setHighlightVideo)}
              />
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">Headshot</h2>
          {headshot ? (
            <img src={headshot} alt="Headshot" className="max-w-xs rounded-lg shadow-md" />
          ) : (
            <p>No headshot uploaded.</p>
          )}
          {editMode && (
            <div className="mt-2">
              <input
                ref={headshotInputRef}
                type="file"
                accept="image/*"
                onChange={e => handleFileChange(e, setHeadshot)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

