import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../../../firebaseConfig';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
      const fetchFiles = async () => {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "uploadedFiles"));
        const filesList = querySnapshot.docs.map(doc => doc.data());
        setFiles(filesList);
      };
  
      fetchFiles();
    }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Files</h1>
      <div  className="w-full p-2 mb-4 border border-gray-300 rounded-md">Total Files
        : {files.length}</div>
      <div className="flex justify-between items-center mb-4">
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">File Name</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Size</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{file.fileName}</td>
              <td className="py-2 px-4 border-b">{file.fileType}</td>
              <td className="py-2 px-4 border-b">{(file.fileSize / 1024).toFixed(2)} KB</td>
              <td className="py-2 px-4 border-b">
                <a href={file.shortUrl} className="text-blue-500 hover:underline">View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
