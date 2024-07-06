"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { Download } from 'lucide-react'; // Import the Download icon from lucide-react

function FileItem({file}) {
  const [passcode, setPassword] = useState('');
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false);

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    setIsDownloadEnabled(password === file?.password); // Enable download only if password matches
  };

  const handleDownload = () => {
    // Redirect to fileUrl if download is enabled and fileUrl exists
    if (isDownloadEnabled && file?.fileUrl) {
      window.location.href = file.fileUrl;
    }
  };
  return (
    <div className='p-5 rounded-md bg-white flex flex-col items-center shadow-md'>
      <div className="text-center text-xl font-bold mb-2 text-blue-600">
        {file?.userName} Shared the file with You
      </div>
      <p className="text-gray-500 mb-4">Find File details below</p>
      <Image src={'/download-file.gif'} width={150} height={150} className='mb-4' alt='Download File' />
      <div className="px-4 py-2 text-center">
        <ul className="list-none">
          <li>File Name ⚡ {file?.fileName} ⚡ {file?.fileSize} bytes</li>
          <li>File Type ⚡ {file?.fileType}</li>
        </ul>
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <input
          id="password"
          type="password"
          value={passcode}
          onChange={handlePasswordChange}
          placeholder="Enter password to access"
          className="border rounded-md px-2 py-1 text-gray-700"
          disabled={file?.password.length <= 3}
        />
        <button
          onClick={handleDownload}
          className={`bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 ${
            isDownloadEnabled ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isDownloadEnabled}
        >
          <Download size={16} /> Download
        </button>
      </div>
      <div className="text-center text-sm mt-4 text-gray-500">*Terms and Conditions apply</div>
    </div>
  )
}

export default FileItem
