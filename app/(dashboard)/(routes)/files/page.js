"use client"
import React from 'react';
import { UserButton, SignInButton, SignedOut, SignedIn } from '@clerk/nextjs';
import FileList from './_components/FileList'; // Adjust the import path as necessary

function Files() {
  return (
    <div>
      <SignedIn>
        <FileList />
      </SignedIn>
      <SignedOut>
        <div className="text-center mt-10">
          <p>You need to sign in to view your files.</p>
          <SignInButton />
        </div>
      </SignedOut>
    </div>
  );
}

export default Files;
