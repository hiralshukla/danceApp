import React, { useState, useRef } from 'react';

export default function ProfilePage() {
  const defaultPfp = '/default_pfp.jpg';
  const [profileImage, setProfileImage] = useState(defaultPfp);
  const fileInputRef = useRef();

  const handleImageClick = () => fileInputRef.current.click();
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const user = {
    name: 'Misha Shah',
    subtitle: 'Dancer',
    tagline:
      "I'm Misha Shah, a passionate dancer and creative spirit with a love for movement and self‑expression.",
    skills: ['Choreography', 'Floorwork', 'Improvisation', 'Musicality', 'Synchronized Ensemble'],
    dances: [
      { title: 'Hip‑Hop', imageUrl: '/hiphop.jpg' },
      { title: 'Contemporary', imageUrl: '/contemporary.jpg' },
      { title: 'Heels', imageUrl: '/heels.jpg' },
    ],
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Banner + Avatar */}
      <div className="relative h-56 bg-gray-800">
        <div
          className="avatar absolute -bottom-16 left-8 cursor-pointer"
          onClick={handleImageClick}
        >
          <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Info */}
      <div className="pt-20 px-8">
        <h1 className="text-4xl font-bold">{user.name}</h1>
        <p className="text-lg text-base-content/70">{user.subtitle}</p>
        <p className="mt-2 max-w-2xl text-sm">{user.tagline}</p>

        {/* Skills */}
        <div className="mt-4">
          <strong>Key Skills:</strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.skills.map(skill => (
              <span key={skill} className="badge badge-primary">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Dance Cards */}
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {user.dances.map(d => (
            <div
              key={d.title}
              className="relative w-full pt-[75%] bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
              style={{ backgroundImage: `url(${d.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{d.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}