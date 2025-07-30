'use client';

import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {project.support}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 font-medium">
          {project.company}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-1">
              <i className="ri-map-pin-line"></i>
            </div>
            <span>{project.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-1">
              <i className="ri-calendar-line"></i>
            </div>
            <span>{project.deadline}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Bütçe: <span className="font-semibold text-gray-900">{project.budget}</span>
          </div>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {project.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <Link
            href={`/projeler/${project.id}`}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center whitespace-nowrap"
          >
            Detayları Gör
          </Link>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-bookmark-line"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
