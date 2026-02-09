import React from "react";

export default function AuthCard({ title, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          {title}
        </h2>

        {children}

        {footer && (
          <p className="text-sm text-center mt-6 text-gray-600">{footer}</p>
        )}
      </div>
    </div>
  );
}
