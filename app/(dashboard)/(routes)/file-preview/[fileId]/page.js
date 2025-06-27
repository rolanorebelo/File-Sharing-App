'use client'
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from '../../../../../firebaseConfig';
import FileShareForm from './_components/FileShareForm';
import FileInfo from './_components/FileInfo';
import { ArrowLeftSquare } from 'lucide-react';
import Link from 'next/link';

function FilePreview({ params }) {
    const db = getFirestore(app);
    const [file, setFile] = useState();

    useEffect(() => {
        if (params.fileId) {
            getFileInfo();
        }
    }, [params.fileId]);

    const getFileInfo = async () => {
        const docRef = doc(db, "uploadedFiles", params.fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setFile(docSnap.data());
        }
    };

    const onPasswordSave = async (password) => {
        const docRef = doc(db, "uploadedFiles", params.fileId);
        await updateDoc(docRef, { password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 font-sans">
            <div className="w-full max-w-4xl p-10 rounded-3xl shadow-2xl bg-gray-950 bg-opacity-90 border border-blue-800/40">
                <Link href='/upload' className='flex gap-3 text-blue-400 hover:underline mb-6 items-center'>
                    <ArrowLeftSquare /> Go to Upload
                </Link>
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                    File <span className="text-blue-400">Preview</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                    <FileInfo file={file} />
                    <FileShareForm file={file} onPasswordSave={onPasswordSave} />
                </div>
            </div>
        </div>
    );
}

export default FilePreview