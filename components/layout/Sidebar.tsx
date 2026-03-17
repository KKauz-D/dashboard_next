import Link from "next/link";
import { LayoutDashboard, Settings, Users } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Meu App</h2>
            </div>
            <nav className="flex-1 px-2 space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors" >
                <LayoutDashboard size={20} />
                    Inicio
                </Link>
                {/* <Link href="/dashboard/usuarios" className="flex items-center gap-3 px-4 py-3 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors" >
                <LayoutDashboard size={20} />
                    Usuários
                </Link> */}
            </nav>
        </aside>
    )
}   