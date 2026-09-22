import React from "react";

export function Footer() {
  return (
    <footer className="bg-void">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <img src="/Light Logo.webp" alt="Get Levrg" width={120} height={32} loading="lazy" decoding="async" />
          <div className="flex items-center gap-3 text-caption text-gray-400">
            <span>&copy; 2026 Get Levrg. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
