// FileShareForm.js (or any other component)
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
// import { useToasts } from 'react-toast-notifications'; // Import useToasts hook
import GlobalApi from '../../../../../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';

function FileShareForm({ file, onPasswordSave }) {
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useUser();
  // const { addToast } = useToasts(); // Initialize useToasts hook

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(file.shortUrl);
  //   addToast('URL copied to clipboard!', { appearance: 'success' }); // Show success toast
  // };

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };

    // Log data before sending
    console.log("Sending data:", data);

    GlobalApi.SendEmail(data).then(response => {
      console.log("Response:", response);
      // addToast('Email sent successfully!', { appearance: 'success' }); // Show success toast
    });
  };

  return file && (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">Short Url</label>
        <div className="relative">
          <input
            type="text"
            id="url"
            value={file.shortUrl}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            
            className="absolute right-2 top-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Copy className="w-5 h-5 text-gray-400 hover:text-gray-700" />
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="enablePassword"
          checked={passwordEnabled}
          onChange={() => setPasswordEnabled(!passwordEnabled)}
          className="mr-2"
        />
        <label htmlFor="enablePassword" className="text-gray-700">Enable Password?</label>
      </div>

      {passwordEnabled && (
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 disabled:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="mt-2 w-full bg-blue-500 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={password?.length < 3}
            onClick={() => onPasswordSave(password)}
          >
            Save
          </button>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Send File to Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <button
          onClick={sendEmail}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default FileShareForm;
