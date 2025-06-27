import React from 'react';

function FileInfo({ file }) {
  if (!file) {
    return (
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-gray-400 text-lg">No file selected</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 p-8 rounded-2xl shadow-xl border border-blue-800/40 flex flex-col items-center">
      <div className="mb-6 flex justify-center">
        <img
          src={file.fileUrl}
          alt={file.fileName}
          className="max-w-xs max-h-64 w-auto h-auto rounded-xl border-4 border-blue-700 shadow-lg bg-gray-800"
        />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow">
          {file.fileName}
        </h3>
        <p className="text-blue-300 mb-1 font-medium">{file.fileType}</p>
        <p className="text-blue-200 font-semibold">{(file.fileSize / 1024).toFixed(2)} KB</p>
      </div>
    </div>
  );
}

export default FileInfo;