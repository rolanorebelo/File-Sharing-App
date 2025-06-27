"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { Download, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function FileItem({ file }) {
  const [passcode, setPassword] = useState('');
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false);
  const router = useRouter();

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    setIsDownloadEnabled(password === file?.password);
  };

  const handleDownload = () => {
    if (isDownloadEnabled && file?.fileUrl) {
      window.location.href = file.fileUrl;
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 p-8 rounded-3xl shadow-2xl border border-blue-800/40 flex flex-col items-center max-w-md w-full mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-blue-300 hover:text-blue-400 mb-4 self-start font-semibold transition"
      >
        <ArrowLeft size={20} /> Back
      </button>
      <div className="text-center text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow">
        {file?.userName} shared a file with you
      </div>
      <p className="text-blue-200 mb-4 font-medium">Find file details below</p>
      <Image src={'/download-file.gif'} width={150} height={150} className="mb-4 rounded-xl shadow-lg" alt="Download File" />
      <div className="px-4 py-2 text-center mb-4 bg-gray-900 bg-opacity-60 rounded-xl border border-blue-900/40">
        <ul className="list-none text-blue-100 font-semibold space-y-1">
          <li>
            <span className="text-blue-400">File Name:</span> {file?.fileName}
          </li>
          <li>
            <span className="text-blue-400">Size:</span> {(file?.fileSize / 1024).toFixed(2)} KB
          </li>
          <li>
            <span className="text-blue-400">Type:</span> {file?.fileType}
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center gap-3 mt-2 w-full">
        <input
          id="password"
          type="password"
          value={passcode}
          onChange={handlePasswordChange}
          placeholder="Enter password to access"
          className="border border-blue-700 bg-gray-800 text-blue-100 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          disabled={file?.password.length <= 3}
        />
        <button
          onClick={handleDownload}
          className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg transition ${
            isDownloadEnabled ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isDownloadEnabled}
        >
          <Download size={18} /> Download
        </button>
      </div>
      <div className="text-center text-xs mt-6 text-blue-300 opacity-70">*Terms and Conditions apply</div>
    </div>
  )
}

export default FileItem;