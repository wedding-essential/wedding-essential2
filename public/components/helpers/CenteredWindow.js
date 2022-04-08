import React from "react";

export default function CenteredWindow({ children }) {
  return (
    <div className="min-h-screen h-full flex items-center justify-center bg-pink-pattern bg-cover">
      <div
        className="
        my-3
      bg-white bg-opacity-80 rounded-md shadow-lg w-11/12 p-2 md:w-4/5 lg:w-3/5 md:p-4"
      >
        {children}
      </div>
    </div>
  );
}
