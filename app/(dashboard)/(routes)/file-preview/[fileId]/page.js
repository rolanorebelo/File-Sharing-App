'use client'
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from '../../../../../firebaseConfig';
import FileShareForm from './_components/FileShareForm';
import FileInfo from './_components/FileInfo';
import { ArrowLeftSquare } from 'lucide-react';
import Link from 'next/link';
// import { ToastProvider } from 'react-toast-notifications';

function FilePreview({ params }) {
    const db = getFirestore(app);
    const [file, setFile] = useState();

    useEffect(() => {
        console.log(params.fileId)
        if (params.fileId) {
            getFileInfo();
        }
    }, [params.fileId]);

    const getFileInfo = async () => {
        const docRef = doc(db, "uploadedFiles", params.fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };

    const onPasswordSave = async (password) => {
        const docRef = doc(db, "uploadedFiles", params.fileId);
        await updateDoc(docRef, { password });
    };

    return (
        <div className='py-10 px-20'>
            <Link href='/upload' className='flex gap-3'><ArrowLeftSquare /> Go to Upload</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                <FileInfo file={file} />
                <FileShareForm file={file} onPasswordSave={onPasswordSave} />
            </div>
        </div>
       
    );
}

export default FilePreview;
