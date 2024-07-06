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
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
        progress==100&& getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
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
      console.log('id',fileDocId);
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
    <div className='p-5 px-8 md:px-28'>
      {!uploadCompleted? <div>
    <h2 className='text-[20px] text-center m-5' >Start 
      <strong className='text-primary'> Uploading </strong>
      File and 
      <strong className='text-primary'> Share </strong>
      it</h2>
    <UploadForm uploadBtnClick = {(file) => uploadFile(file) } progress={progress}/>
      </div> : <CompleteCheck/>}
    </div>
  )
}

export default Upload