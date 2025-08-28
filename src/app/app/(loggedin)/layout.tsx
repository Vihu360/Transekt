"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Dropdown, Avatar } from "antd";
import { authApi } from "@/utils/api";

// Custom Icons
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 6h10" />
    <path d="M4 12h16" />
    <path d="M7 12h13" />
    <path d="M4 18h10" />
  </svg>
);

const AnalyticsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
);

const GatewaysIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const SettingsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>
);

const HamburgerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
);

const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);


const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const DownArrowIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

const TransactionsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M22 10v6a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-6h20zm-14.99 4h-.01a1 1 0 1 0 .01 2a1 1 0 0 0 0 -2zm5.99 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2zm5 -10a4 4 0 0 1 4 4h-20a4 4 0 0 1 4 -4h12z" />
  </svg>
);

// User Avatar Component
const UserAvatar = ({ name, size = "sm" }) => {
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map(n => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center font-semibold shadow-sm`}>
      {getInitials(name)}
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ item, isActive, onClick, isMobile = false }) => (
  <button
    onClick={() => onClick(item.path)}
    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-gradient-to-br from-[#1a4d70] via-[#165aa0] to-[#0a2b90]  text-white shadow-md hover:from-[#1a4d70] hover:via-[#165aa0] hover:to-[#0a2b90] "
        : isMobile
        ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {React.cloneElement(item.icon, { 
      className: `w-5 h-5 ${isActive ? 'text-white' : 'text-current'}` 
    })}
    <span className="font-medium">{item.label}</span>
  </button>
);

// Main Layout Component
const Layout = ({ 
  children
}: {
  children: React.ReactNode
}) => {
      // These should come from your auth context or API calls, not props
  const user = authApi.getCurrentUser();
  const showSearch = false;
  const searchPlaceholder = "Search...";
  const unreadCount = 0;
  const router = useRouter();
  const pathname = usePathname();
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  console.log("user", user);

  // Navigation items
  const navigationItems = [
    {
      key: "overview",
      icon: <DashboardIcon />,
      label: "Overview",
      path: "/app/overview",
    },
    {
      key: "transactions",
      icon: <TransactionsIcon />,
      label: "Transactions",
      path: "/app/transactions",
    },
    {
      key: "analytics",
      icon: <AnalyticsIcon />,
      label: "Analytics",
      path: "/app/analytics",
    },
    {
      key: "gateways",
      icon: <GatewaysIcon />,
      label: "Gateways",
      path: "/app/gateways",
    },
    {
      key: "settings",
      icon: <SettingsIcon />,
      label: "Settings",
      path: "/app/settings",
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Get active navigation key based on current path
  const getActiveKey = () => {
    const currentPath = pathname;
    const activeItem = navigationItems.find(item => 
      currentPath.startsWith(item.path)
    );
    return activeItem?.key || "";
  };

  // Handle navigation
  const handleNavigation = (path) => {
    router.push(path);
    if (isMobile) {
      setMobileDrawer(false);
    }
  };



  // User menu items
  const userMenuItems = [
    {
      key: "profile",
      label: "My Profile",
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        // Add your logout logic here
        localStorage.clear();
        router.push("/login");
        break;
      default:
        break;
    }
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div 
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawer(true)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <HamburgerIcon />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Transekt</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200">
                <BellIcon />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-medium">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </div>
                )}
              </button>
            </div>

            {/* User Avatar */}
            <Dropdown
              menu={{ 
                items: userMenuItems, 
                onClick: handleUserMenuClick 
              }}
              placement="bottomRight"
            >
              <button className="flex items-center">
                <UserAvatar name={user?.name} />
              </button>
            </Dropdown>
          </div>
        </div>

        {/* Page Header */}
        {(showSearch) && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
      
              </div>
            </div>

            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full pl-4 pr-10 py-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="px-4 pb-4">
          {children}
        </div>

        {/* Mobile Drawer */}
        <Drawer
          open={mobileDrawer}
          placement="left"
          width="100vw"
          closable={false}
          styles={{ body: { padding: 0, backgroundColor: '#ffffff' } }}
        >
          <div className="flex flex-col h-full bg-white">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h1 className="text-xl font-bold text-slate-800">Transekt</h1>
              <button
                onClick={() => setMobileDrawer(false)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <NavItem
                    key={item.key}
                    item={item}
                    isActive={getActiveKey() === item.key}
                    onClick={handleNavigation}
                    isMobile={true}
                  />
                ))}
              </div>
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-slate-200">
              <Dropdown
                menu={{ 
                  items: userMenuItems, 
                  onClick: handleUserMenuClick 
                }}
                placement="topRight"
              >
                <button className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                  <UserAvatar name={user.name} />
                  <div className="flex-1 text-left">
                    <div className="text-slate-800 font-medium">
                      {user.name}
                    </div>
                    <div className="text-slate-500 text-sm">
                      {user.email}
                    </div>
                  </div>
                  <DownArrowIcon className="text-slate-400" />
                </button>
              </Dropdown>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div 
      className="flex h-screen font-karla"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Sidebar */}
      <div className="w-[15%] bg-white border-r border-slate-200 flex flex-col shadow-lg">
        {/* Logo */}
        <div className="py-6 px-4 flex items-center gap-3 border-b border-slate-200 w-[90%] mx-auto">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
          <h1 className="text-xl font-semibold text-slate-800">Transekt</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4">
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-3">General</p>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.key}
                item={item}
                isActive={getActiveKey() === item.key}
                onClick={handleNavigation}
              />
            ))}
          </div>
        </nav>

        
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* Header */}
        <header className="bg-white">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex items-center gap-4">
            </div>

            <div className="flex items-center gap-4">
              {showSearch && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="w-80 pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <SearchIcon />
                  </div>
                </div>
              )}

              {/* Notification Bell */}
              <div className="relative border border-slate-200 rounded-lg px-4 py-1 cursor-pointer hover:bg-slate-50 transition-colors duration-200">
                <Dropdown
              menu={{ 
                items: userMenuItems, 
                onClick: handleUserMenuClick 
              }}
              placement="bottom"
            >
              <button className="flex items-center gap-3 justify-center text-slate-700 cursor-pointer hover:text-slate-900">
                <UserAvatar name={user?.name} />
                <p className="font-medium">{user.name}</p>
              </button>
            </Dropdown>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="px-6 py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;