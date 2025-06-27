"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { app } from '../../../../firebaseConfig'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc, getFirestore } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import {generateRandomString} from '../../../../app/_utils/GenerateRandomString'; 
import CompleteCheck from './_components/CompleteCheck'
import { useRouter } from 'next/navigation';

function Upload() {
  const {user} = useUser();
  const [progress,setProgress] = useState();
  const router = useRouter();
  const [fileDocId, setFileDocId] = useState();
  const [uploadCompleted, setUploadCompleted] = useState();
  const db = getFirestore(app);
  const storage = getStorage(app)
  const  uploadFile = (file) => {
    const metadata = {
      contentType: file.type
    };
    const storageRef = ref(storage, 'file-upload/'+file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        progress==100&& getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveInfo(file, downloadURL);
        });
      })    
  }

  useEffect(() => {
    progress == 100&& setTimeout(() =>{
      setUploadCompleted(true);
    },2000)
  },[progress==100]);

  useEffect(() => {
    uploadCompleted&& 
    setTimeout(() =>{
      setUploadCompleted(false);
      router.push('/file-preview/'+fileDocId);
    },2000)},[uploadCompleted==true]);

  const saveInfo = async (file, fileUrl) => {
    const docId =generateRandomString().toString();
    await setDoc(doc(db, "uploadedFiles", docId), {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: fileUrl,
      userName: user.fullName,
      userEmail: user.primaryEmailAddress.emailAddress,
      password: '',
      id:docId,
      shortUrl:process.env.NEXT_PUBLIC_BASE_URL+'f/'+docId
    });
    setFileDocId(docId);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 font-sans">
      <div className="w-full max-w-2xl p-10 rounded-3xl shadow-2xl bg-gray-950 bg-opacity-90 border border-blue-800/40">
        {!uploadCompleted ? (
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Upload &amp; <span className="text-blue-400">Share</span> Your Files
            </h2>
            <p className="text-center text-lg text-gray-300 mb-8 font-medium">
              Securely upload your files and share them with anyone, anywhere.
            </p>
            <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress}/>
          </div>
        ) : (
          <CompleteCheck/>
        )}
      </div>
    </div>
  )
}

export default Upload