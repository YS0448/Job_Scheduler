import { Home, Settings, User, LayoutDashboard, X, FilePlus, ClipboardList  } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";


export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const location = useLocation();
  const { role } = useAuth();


const sidebarItems = [
  { name: "Home", path: role === 'customer' ? '/dashboard/customer' : '/', icon: Home },
  { name: "Create Job", path: "/create-job", icon: FilePlus },
  { name: "View Jobs", path: "/view-jobs", icon: ClipboardList  }, // <-- new item
  { name: "Profile", path: "/profile", icon: User },
];

  const handleLinkClick = () => {
    if (isOpen && window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-20 sm:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-brand-primary text-brand-base z-21 w-full
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:static sm:translate-x-0
          ${isOpen ? "sm:w-64" : "sm:w-16"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-accent">
          {isOpen ? (
            <>
              <h2 className="text-lg font-bold text-brand-base">Dashboard</h2>
              <button onClick={toggleSidebar} className="p-1 rounded hover:bg-brand-muted/50">
                <X className="w-5 h-5 text-brand-base" />
              </button>
            </>
          ) : (
            <button onClick={toggleSidebar} className="p-1 rounded hover:bg-brand-muted/50">
              <LayoutDashboard className="w-5 h-5 text-brand-base" />
            </button>
          )}
        </div>

        {/* Sidebar Items */}
        <nav className="flex-1 p-2">
          <ul className="flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center gap-3 py-2 px-3 rounded hover:bg-brand-muted/50  
                      ${isActive ? "bg-brand-muted/30 " : "text-brand-base"}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
