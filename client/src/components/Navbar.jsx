import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    // Get the username from the Redux store
    const { username } = useSelector((state) => state.quiz);
    
    // Hook for navigation
    const navigate = useNavigate();
    
    // State to manage search input
    const [search, setSearch] = useState("");

    return (
        <div className="navbar w-full h-[60px] flex items-center justify-between bg-transparent px-10">
            
            {/* Left Section: Logo */}
            <div 
                className="left flex items-center justify-center gap-2 cursor-pointer" 
                onClick={() => navigate("/")}
            >
                <img src="/icon.png" className="w-10 h-10 rounded-full" alt="Logo" />
            </div>

            {/* Right Section: Search Bar, History Button, and Profile */}
            <div className="right flex items-center justify-center gap-5">
                
                {/* Search Bar (Visible on Medium Screens and Above) */}
                <div className="search hidden md:flex items-center justify-center bg-slate-200 border-2 border-slate-400 w-[100%] rounded-lg px-2 h-8">
                    <i>
                        <FiSearch className="mx-2 hover:scale-125 hover:text-blue-700 hover:font-bold cursor-pointer" />
                    </i>
                    <input 
                        placeholder="Search here..." 
                        className="bg-slate-200 rounded-lg w-full px-2 h-full" 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search} 
                        type="text" 
                    />
                </div>

                {/* History Button */}
                <button 
                    onClick={() => navigate("/history")} 
                    className="font-semibold text-black text-sm hover:text-blue-600 transition-all hover:scale-110 cursor-pointer"
                >
                    History
                </button>

                {/* User Profile Section */}
                <div className="flex items-center gap-1">
                    <img className="w-8 h-8 rounded-full" src={"/profile.png"} alt="Profile" />
                    <p className="font-semibold px-2 border shadow-sm rounded-md text-white">{username}</p>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
