"use client"
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../firebaseConfig';
import FileItem from './_components/FileItem';

function FileView({ params }) {
    const db = getFirestore(app);
    const [file, setFile] = useState(null); // Initialize file state as null
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        if (params.fileId) {
            getFileInfo();
        }
    }, [params.fileId]); // Run effect whenever fileId changes

    const getFileInfo = async () => {
        setLoading(true); // Set loading state to true before fetching data
        const docRef = doc(db, "uploadedFiles", params?.fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data());
        } else {
            console.log("No such document!");
        }

        setLoading(false); // Set loading state to false after data fetch completes
    };

    return (
        <div className='bg-gray-700 h-screen w-full flex justify-center items-center flex-col gap-4'>
            {loading ? (
                <p>Loading...</p> // Show loading indicator while fetching data
            ) : file ? (
                <FileItem file={file} /> // Render FileItem component when file data is available
            ) : (
                <p>No file found.</p> // Handle case where file data is not available
            )}
        </div>
    );
}

export default FileView;
