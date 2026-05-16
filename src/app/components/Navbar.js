import Image from "next/image";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ onLoginClick }) {
  const { user } = useAuth();

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" priority />
        </figure>
        <ul className="nav__list--wrapper">
          <li
            className="nav__list nav__list--login"
            onClick={user ? () => signOut(auth) : onLoginClick}
          >
            Login
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
