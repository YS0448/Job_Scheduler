import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/media/image/logo/web_logo.png";

import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { apiCall } from "@/services/apiCall";
import { showToast } from "@/components/common/AlertService";
import { useLoader } from "@/context/LoaderContext";

export default function Header() {
  const { isOpen, setIsOpen } = useSidebar();
  const { user, setUser, role } = useAuth();
  const navigator = useNavigate();
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const { showLoader, hideLoader } = useLoader();

  const homePath = role === "customer" ? "/dashboard/customer" : "/";

  const handleLogout = async () => {
    try {
      showLoader();
      const res = await apiCall("PATCH", "/auth/logout");
      showToast("success", res.data.message);

      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); 
      setUser(null);
      navigator("/login");

    } catch (err) {
      console.log(err);
    }finally{
      hideLoader();
    } 
  };

  const getInitials = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((elt) => elt[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="h-16 px-2 md:px-10 flex items-center justify-between border-b border-border bg-background text-foreground">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded hover:bg-muted"
          aria-label="Open Sidebar"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>

        <Link to={homePath}>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {role === "guest" ? (
          <>
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>

            <Button
              className="bg-brand-primary text-white hover:opacity-90"
              asChild
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarFallback className="bg-brand-accent text-brand-base">
                  {getInitials(user?.full_name) || "YS"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem >
                <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
