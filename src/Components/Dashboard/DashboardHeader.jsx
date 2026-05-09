import React from 'react';

export default function DashboardHeader({ title, description }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-base-content">{title}</h1>
      {description && (
        <p className="text-base-content/60 mt-2">{description}</p>
      )}
    </div>
  );
}
