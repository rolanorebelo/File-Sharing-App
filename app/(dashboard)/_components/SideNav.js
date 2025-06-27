"use client"
import Image from 'next/image'
import React from 'react'
import { File, Shield, Upload } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: File,
            path: '/files'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: Shield,
            path: '/upgrade'
        },
    ]
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="h-full min-h-screen w-64 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900 shadow-2xl flex flex-col">
            <div className="p-8 flex flex-col items-center border-b border-blue-900/40">
                <Image src='/logo.png' width={120} height={80} alt="Logo" className="mb-2" />
                <span className="text-xl font-bold text-blue-300 tracking-wide"></span>
            </div>
            <nav className="flex-1 py-8">
                <ul className="flex flex-col gap-2">
                    {menuList.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`flex items-center gap-4 w-full px-6 py-3 rounded-lg transition-all duration-200
                                    ${pathname === item.path
                                        ? 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-700 text-white shadow-lg'
                                        : 'text-blue-200 hover:bg-blue-900/60 hover:text-white'
                                    } font-semibold text-lg`}
                                onClick={() => router.push(item.path)}
                            >
                                <item.icon size={22} className="shrink-0" />
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto p-6 text-xs text-blue-300 opacity-60 text-center">
                &copy; {new Date().getFullYear()} CipherShare
            </div>
        </div>
    )
}

export default SideNav