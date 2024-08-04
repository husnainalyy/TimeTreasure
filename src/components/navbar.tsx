"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { User } from 'next-auth'

const Navbar = () => {
    const { data: session } = useSession()
    const user: User = session?.user as User
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className="p-5 w-full  bg-amber-50 text-black font-lato shadow md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center  md:w-auto w-full">
                <Link href="/" className="text-[#0732EF] text-2xl font-lato cursor-pointer">Time Treasure</Link>
                <span className="text-3xl cursor-pointer mx-2 md:hidden " onClick={toggleMenu}>
                    <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                </span>
            </div>
            <ul
                className={`text-[#0732EF] text-xl md:flex md:items-center m-0 md:static absolute bg-amber-50 w-full md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 ${menuOpen ? 'top-[80px] left-0 opacity-100' : 'top-[-400px] left-0 opacity-0 md:opacity-100 md:top-auto md:left-auto'
                    }`}
            >
                <li className="mx-4 my-6 md:my-0">
                    <Link href="/AboutUs" className="text-[#0732EF] text-xl hover:underline duration-500">
                        About us
                    </Link>
                </li>
                <li className="mx-4 my-6 md:my-0">
                    <Link href="/Services" className="text-[#0732EF] text-xl hover:underline duration-500">
                        Our Services
                    </Link>
                </li>
                {session ? (
                    <>
                        <li className="mx-4 my-6 md:my-0">
                            <span className="text-[#0732EF] text-xl">Welcome, {user?.username || user?.email}</span>
                        </li>
                        <li className="mx-4 my-6 md:my-0">
                            <Link onClick={() => signOut()} href="/" className="w-full md:w-auto bg-amber-50 text-black">
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="mx-4 my-6 md:my-0">
                            <Link href="/signUp" className="text-[#0732EF] text-xl hover:underline duration-500">
                                Sign up
                            </Link>
                        </li>
                        <li className="mx-4 my-6 md:my-0">
                            <Link href="/signIn" className="text-[#0732EF] text-xl hover:underline duration-500">
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar