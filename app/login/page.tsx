import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    "use server";
    
    const email = formData.get("email");
    const password = formData.get("password");

    // Validação hardcoded simples para demonstração
    if (email === "admin@teste.com" && password === "123456") {
      const cookieStore = await cookies();
      
      cookieStore.set("auth-token", "meu-token-simulado", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 dia
      });

      redirect("/dashboard");
    } else {

      console.error("Credenciais inválidas");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Acesso ao Dashboard
            </h1>

            <form action={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">E-mail</label>
                    <input type="email" name="email" defaultValue={"admin@teste.com"} required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Senha</label>
                    <input type="password" name="password" defaultValue={"123456"} required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none" />

                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
                    Entrar
                </button>
            </form>
        </div>
    </main>
  )
}