export default function DashboardLoading() {
    return (
        <div>
            {/* Titulo */}
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse mb-6"></div>

            {/* Cards Superiores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-4"></div>
                        <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                    </div>
                ))}
            </div>

            {/* Área do Gráfico */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-6"></div>

                {/* Div imitando a altura do gráfico */}
                <div className="h-80 w-full bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
            </div>
        </div>
    )
}