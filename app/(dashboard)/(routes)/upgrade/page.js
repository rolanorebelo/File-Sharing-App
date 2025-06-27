"use client"
import React, { useState, useEffect } from 'react'
import { app } from '../../../../firebaseConfig'
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'

function UpgradePage() {
  const [files, setFiles] = useState([])
  const [selectedFileId, setSelectedFileId] = useState('')
  const [file, setFile] = useState(null)
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const db = getFirestore(app)

  // Fetch all files on mount
  useEffect(() => {
    const fetchFiles = async () => {
      const filesCol = collection(db, 'uploadedFiles')
      const filesSnapshot = await getDocs(filesCol)
      const filesList = filesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setFiles(filesList)
    }
    fetchFiles()
  }, [db])

  // When a file is selected, fetch its details
  useEffect(() => {
    const fetchFile = async () => {
      if (!selectedFileId) return
      setMessage('')
      const docRef = doc(db, 'uploadedFiles', selectedFileId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setFile(docSnap.data())
        setNewName(docSnap.data().fileName)
        setNewPassword(docSnap.data().password)
      } else {
        setFile(null)
        setMessage('File not found')
      }
    }
    fetchFile()
  }, [selectedFileId, db])

  const handleUpdate = async () => {
    if (!selectedFileId) return
    const docRef = doc(db, 'uploadedFiles', selectedFileId)
    await updateDoc(docRef, {
      fileName: newName,
      password: newPassword,
    })
    setMessage('File updated successfully!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-10">
      <div className="w-full max-w-xl p-8 rounded-2xl shadow-2xl bg-gray-900 border border-blue-900/40">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400">Upgrade File</h2>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-200">Select a File</label>
          <select
            value={selectedFileId}
            onChange={e => setSelectedFileId(e.target.value)}
            className="border border-blue-700 bg-gray-800 text-gray-100 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a file --</option>
            {files.map(f => (
              <option key={f.id} value={f.id}>
                {f.fileName || f.id}
              </option>
            ))}
          </select>
        </div>
        {file && (
          <div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-gray-200">File Name</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="border border-blue-700 bg-gray-800 text-gray-100 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-1 text-gray-200">Password</label>
              <input
                type="text"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="border border-blue-700 bg-gray-800 text-gray-100 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleUpdate}
              className="w-full bg-primary hover:bg-blue-700 transition text-white font-bold px-4 py-2 rounded-lg shadow"
            >
              Update
            </button>
          </div>
        )}
        {message && <div className="mt-6 text-center text-blue-400 font-semibold">{message}</div>}
      </div>
    </div>
  )
}

export default UpgradePage