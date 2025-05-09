'use client'

import React from "react";
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Menu = () => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }
   
    const userId = session ? session.user.id : false;

    return (
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/character_list" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="/name_and_race_form" className="hover:text-gray-400">
              Create character
            </a>
          </li>
          {userId ? (
            <li>
              <Link href={`/profile/${userId}`} className="hover:text-gray-400">
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    )
}

export default Menu;