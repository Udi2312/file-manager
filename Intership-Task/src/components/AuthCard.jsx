import React from "react";

export default function AuthCard({ title, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {title}
        </h2>

        {children}

        {footer && (
          <p className="text-sm text-center mt-4 text-gray-600">{footer}</p>
        )}
      </div>
    </div>
  );
}
