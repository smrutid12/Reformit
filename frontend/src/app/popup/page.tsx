"use client";
import React, { useState } from "react";

export default function PopUp() {
  const [fileType, setFileType] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    console.log("Dropped file:", file);
  };

  const handleConvert = () => {
    console.log("Converting:", { fileType, convertTo });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white tracking-wide">
          Reformit
        </h2>

        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 transition-colors duration-300 ${
            dragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "border-dashed border-gray-300 bg-gray-50 dark:bg-gray-700"
          } rounded-lg p-6 text-center text-gray-500 dark:text-gray-100 mb-5 cursor-pointer`}
        >
          {dragging ? "Drop the file here" : "Drag & drop your file"}
        </div>

        {/* Upload Button */}
        <div className="text-center mb-5">
          <input
            type="file"
            id="upload"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                console.log("Uploaded:", e.target.files[0]);
              }
            }}
          />
          <label htmlFor="upload">
            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-md shadow-sm transition duration-200">
              Upload File
            </button>
          </label>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="File Type (e.g., PDF)"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Convert To (e.g., DOCX)"
            value={convertTo}
            onChange={(e) => setConvertTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
        >
          Convert
        </button>
      </div>
    </div>
  );
}
