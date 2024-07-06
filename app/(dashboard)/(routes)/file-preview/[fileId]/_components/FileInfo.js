import React from 'react';

function FileInfo({ file }) {
  if (!file) {
    return <div>No file selected</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 justify-center flex">
        <img src={file.fileUrl} alt={file.fileName} className=" max-w-full max-h-64 w-auto h-auto rounded-lg" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">{file.fileName}</h3>
        <p className="text-gray-500 mb-1">{file.fileType}</p>
        <p className="text-gray-500">{(file.fileSize / 1024).toFixed(2)} KB</p>
      </div>
    </div>
  );
}

export default FileInfo;
