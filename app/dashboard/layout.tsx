import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header fixo no topo */}
        <Header />

        {/* Onde as páginas vão renderizar */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}