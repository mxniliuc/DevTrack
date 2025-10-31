import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/devtrack-logo.png";

interface NavbarProps {
  onMenuClick: () => void;
  isDesktop?: boolean;
}

export function Navbar({ onMenuClick, isDesktop }: NavbarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 h-16 bg-white border-b border-[#E2E8F0] shadow-sm fixed top-0 left-0 right-0 z-50">
      {!isDesktop && (
        <button
          className="p-2 text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <div
        className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="DevTrack Logo"
          className="object-contain"
          style={{
            width: "140px",
            height: "auto",
            transform: "translateY(4px)",
          }}
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
  {user && (
    <span className="hidden md:inline text-[#475569] text-sm md:text-base whitespace-nowrap">
      Logged in as{" "}
      <span className="font-medium text-[#0F172A]">{user.username}</span>
    </span>
  )}

        <Button
          onClick={handleAuthClick}
          className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg"
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
}