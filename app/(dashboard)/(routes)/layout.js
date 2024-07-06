"use client"
import SideNav from '../_components/SideNav';
import React, { useState } from 'react';
import TopHeader from '../_components/TopHeader'

function layout({ children }) {
    const [showSideNav, setShowSideNav] = useState(false);
  
    const toggleSideNav = () => {
      setShowSideNav(!showSideNav);
    };
  
    return (
      <div>
        <div className={`fixed inset-y-0 z-50 ${showSideNav ? 'block' : 'hidden'} md:flex md:h-full md:w-64 flex-col`}>
          <SideNav />
        </div>
        <div className={`md:ml-64 ${showSideNav ? 'ml-64' : 'ml-0'}`}>
          <div onClick={toggleSideNav}>
            <TopHeader showSideNav = {showSideNav} />
          </div>
          {children}
        </div>
      </div>
    );
  }

export default layout