import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../../../firebaseConfig';
import { useRouter } from 'next/navigation';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "uploadedFiles"));
      const filesList = querySnapshot.docs.map(doc => doc.data());
      setFiles(filesList);
    };

    fetchFiles();
  }, []);

  const handleView = (fileId) => {
    router.push(`/f/${fileId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 font-sans">
      <div className="w-full max-w-5xl p-10 rounded-3xl shadow-2xl bg-gray-950 bg-opacity-90 border border-blue-800/40">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          My <span className="text-blue-400">Files</span>
        </h1>
        <div className="w-full p-4 mb-6 border border-blue-900/40 rounded-lg bg-gray-900 text-blue-200 text-center font-semibold shadow">
          Total Files: {files.length}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-xl shadow">
            <thead>
              <tr>
                <th className="py-3 px-6 border-b border-blue-800 text-blue-300 font-semibold text-left">File Name</th>
                <th className="py-3 px-6 border-b border-blue-800 text-blue-300 font-semibold text-left">Type</th>
                <th className="py-3 px-6 border-b border-blue-800 text-blue-300 font-semibold text-left">Size</th>
                <th className="py-3 px-6 border-b border-blue-800 text-blue-300 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="hover:bg-blue-950/40 transition">
                  <td className="py-3 px-6 border-b border-blue-800 text-gray-100">{file.fileName}</td>
                  <td className="py-3 px-6 border-b border-blue-800 text-gray-300">{file.fileType}</td>
                  <td className="py-3 px-6 border-b border-blue-800 text-gray-300">{(file.fileSize / 1024).toFixed(2)} KB</td>
                  <td className="py-3 px-6 border-b border-blue-800">
                    <button
                      onClick={() => handleView(file.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {files.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    No files found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FileList;