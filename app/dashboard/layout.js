import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({children}) {
  
  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-screen overflow-y-hidden ml-80 p-20">
        {children}
      </div>
    </>
  )
}
