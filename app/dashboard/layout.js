import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({children}) {
  
  return (
    <>
      <div className="flex h-screen">
        <div className="w-80 p-6">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  )
}
