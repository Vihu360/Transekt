"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Dropdown } from "antd";
import { authApi } from "@/utils/api";
import SVGComponent from "@/app/svgcomponents";

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
  const router = useRouter();
  const pathname = usePathname();
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get user data on component mount (only on client)
  useEffect(() => {
    if (!isClient) return;
    
    const currentUser = authApi.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      // If no user is found, redirect to login
      authApi.logout();
      router.push('/auth/login');
    }
  }, [router, isClient]);

  // Check if mobile on mount and resize
  useEffect(() => {
    if (!isClient) return;
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [isClient]);

  const showSearch = false;
  const searchPlaceholder = "Search...";
  const unreadCount = 0;

  // Show loading during SSR or when no user on client
  if (!isClient || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Navigation items
  const navigationItems = [
    {
      key: "overview",
      icon: <SVGComponent src="DashboardIcon" color="#000000" />,
      label: "Overview",
      path: "/app/overview",
    },
    {
      key: "transactions",
      icon: <SVGComponent src="TransactionsIcon" color="#000000" />,
      label: "Transactions",
      path: "/app/transactions",
    },
    {
      key: "analytics",
      icon: <SVGComponent src="AnalyticsIcon" color="#000000" />,
      label: "Analytics",
      path: "/app/analytics",
    },
    {
      key: "gateways",
      icon: <SVGComponent src="GatewaysIcon" color="#000000" />,
      label: "Gateways",
      path: "/app/gateways",
    },
    {
      key: "settings",
      icon: <SVGComponent src="SettingsIcon" color="#000000" />,
      label: "Settings",
      path: "/app/settings",
    },
  ];

 

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
        authApi.logout();
        router.push("/auth/login");
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
              <SVGComponent src="HamburgerIcon" color="#000000" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Transekt</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200">
                <SVGComponent src="BellIcon" color="#000000" />
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
                  <SVGComponent src="SearchIcon" color="#000000" />
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
                <SVGComponent src="CloseIcon" color="#000000" />
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
                  <SVGComponent src="DownArrowIcon" color="#000000" />
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
                    <SVGComponent src="SearchIcon" color="#000000" />
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