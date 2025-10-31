import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom"; 

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1000);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showSidebar = isDesktop || isSidebarOpen;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      
      <Sidebar isOpen={showSidebar} onClose={() => setIsSidebarOpen(false)} />

     
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isDesktop ? "ml-64" : "ml-0"
        }`}
      >
      
        <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-[#E2E8F0] transition-all duration-300">
       
          <Navbar
            onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
            isDesktop={isDesktop}
          />
        </div>

        <main className="flex-1 overflow-y-auto bg-background pt-16 px-4 md:px-8 pb-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}