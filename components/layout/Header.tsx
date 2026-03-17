import { ThemeToggle } from "../ThemeToggle";

export function Header() {
    return (
        <header className="h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">            
            <h1 className="text-2xl font-bold text-gray-950 dark:text-white">Dashboard</h1>
            <div className="flex-1">

            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                KT
            </div>
        </header>
    );
}