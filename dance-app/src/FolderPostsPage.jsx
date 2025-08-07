import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FolderPostsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dances = JSON.parse(localStorage.getItem('dances')) || [];
  const folder = dances[parseInt(id)];

  if (!folder) {
    return <div className="p-4">Folder not found.</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <button onClick={() => navigate(-1)} className="mb-4 btn btn-outline">← Back</button>
      <h1 className="text-3xl font-bold mb-6">{folder.title} Posts</h1>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {folder.posts && folder.posts.length > 0 ? (
          folder.posts.map((post, index) => (
            <div
              key={index}
              className="mb-4 break-inside-avoid rounded-lg shadow-md bg-white p-2"
            >
              {post.type === 'video' ? (
                <video controls className="w-full rounded-md">
                  <source src={post.mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={post.mediaUrl}
                  alt={`Post ${index}`}
                  className="w-full rounded-md"
                />
              )}
              {post.caption && (
                <p className="mt-2 text-sm text-gray-700">{post.caption}</p>
              )}
            </div>
          ))
        ) : (
          <p>No posts in this folder yet.</p>
        )}
      </div>
    </div>
  );
}
