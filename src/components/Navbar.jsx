import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const Navbar = ({ navLinks }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-slate-900 flex sm:flex-row flex-col h-full sm:items-center sm:place-content-between sm:max-h-22 text-white">
      <div className="flex items-center place-content-between w-full">
        <Link to="/">
          <div className="flex items-center pl-5 sm:pl-12 py-4 gap-3 text-[#FE99A0]">
            <img className="max-h-16 pr-3" src="/images/replay.png" alt="logo" />
            <span className="border border-light-gray h-12 hidden md:flex"></span>
            <h2 className="replay sm:pl-3 text-2xl">
              <span className="text-[#98BCE5]">RE</span>PLAY
            </h2>
          </div>
        </Link>
        <IoMdMenu
          size={50}
          className={`${menuClicked ? "" : "hidden"} cursor-pointer mr-5 sm:hidden`}
          onClick={() => setMenuClicked((p) => !p)}
        />
      </div>

      <nav
        className={`${
          menuClicked ? "hidden" : ""
        } list-none gap-3 sm:flex flex flex-col items-center sm:flex-row text-[18px] sm:w-full sm:pr-5 sm:justify-end sm:items-center`}
      >
        <li className={`${menuClicked ? "hidden" : ""} cursor-pointer sm:hidden flex place-content-end`}>
          <IoMdMenu size={50} color="#98BCE5" onClick={() => setMenuClicked((p) => !p)} />
        </li>

        {/* Nav links pasados como prop */}
        {navLinks}

        {/* Auth area */}
        {user ? (
          <>
            <li>
              <Link
                to="/perfil"
                className="flex items-center gap-2 text-white hover:text-[#FE99A0] transition"
              >
                <FaUser size={14} />
                <span className="text-sm">{user.displayName || "Perfil"}</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white text-sm transition"
              >
                Salir
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="bg-[#FE99A0] hover:bg-[#fe8089] text-slate-900 font-bold text-sm px-4 py-2 rounded-full transition"
            >
              Iniciar sesión
            </Link>
          </li>
        )}
      </nav>
    </header>
  );
};
