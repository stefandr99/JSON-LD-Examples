import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#121212] h-16 shadow-md flex items-center px-20 bold text-2xl">
      <button
        className="font-bold cursor-pointer bg-[#E2B616] px-2 py-2 rounded-md"
        onClick={() => {
          navigate(`/`);
        }}
      >
        SerSte Movie Browser
      </button>
    </div>
  );
};

export default Header;
