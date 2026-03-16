import React, { useState } from 'react';
import { IoMoonSharp, IoSunny } from "react-icons/io5";

/*Componente Navbar*/
function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-mytheme-bg shadow">
      <div className="max-w-10xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-mytheme-primary">🌍 Nateo Travel</h1>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-mytheme-text hover:text-mytheme-secondary">Home</a>
          <a href="#" className="text-mytheme-text hover:text-mytheme-secondary">Destinations</a>
          <a href="#" className="text-mytheme-text hover:text-mytheme-secondary">Tips</a>
          <a href="#" className="text-mytheme-text hover:text-mytheme-secondary">About</a>
          <button onClick={toggleTheme} className="text-2xl cursor-pointer text-mytheme-text">{isDark ? <IoSunny /> : <IoMoonSharp />}</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar