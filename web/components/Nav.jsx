"use client"

import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
    return (
        // I want a clean nav bar with a logo and a hamburger menu
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center pl-2">
                <Image src="/assets/images/echoreadertextrevised.svg" width={175} height={60} alt="EchoReader Logo" className="object-contain"/>
            </Link>

            <div className="flex">
            <Link href="/about" className="flex gap-2 pr-2">
                <p className="text-2xl font-semibold nav_links">About</p>
            </Link>
            <Link href="https://github.com/shojha24/EchoReader" className="flex gap-2 pr-2">
                <p className="text-2xl font-semibold nav_links">Github</p>
            </Link>
            </div>
        </nav>
    );
}

export default Nav;