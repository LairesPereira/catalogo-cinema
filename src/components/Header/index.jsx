import { Film, LogOut, LogIn, UserPlus } from 'lucide-react'

export default function Header({ usuario, onLogout, onAbrirLogin, onAbrirCadastro }) {
  return (
    <header className="bg-zinc-900 shadow-lg border-b border-zinc-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Film className="text-yellow-400" size={28} />
          <h1 className="text-white text-2xl font-bold tracking-wide">CineReview</h1>
        </div>

        <div className="flex items-center gap-3">
          {usuario ? (
            <>
              <span className="text-zinc-300 text-sm">
                Olá, <span className="text-yellow-400 font-semibold">{usuario.username}</span>
                {usuario.role === 'admin' && (
                  <span className="ml-2 bg-yellow-400 text-zinc-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    ADMIN
                  </span>
                )}
              </span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Sair
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onAbrirCadastro}
                className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <UserPlus size={16} />
                Cadastrar
              </button>
              <button
                onClick={onAbrirLogin}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 text-sm font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <LogIn size={16} />
                Entrar
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
