'use client'
import React from "react";
import { SessionProvider } from 'next-auth/react'
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Character build</h1>
      <SessionProvider>
        <Menu/>
      </SessionProvider>
    </header>
  );
}
export default Header;