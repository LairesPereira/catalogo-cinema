import { X, LogIn } from 'lucide-react'
import LoginForm from './LoginForm'

export default function LoginModal({ onFechar, onLogin }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-700">
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <LogIn size={20} className="text-yellow-400" />
            Entrar
          </h2>
          <button onClick={onFechar} className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <X size={22} />
          </button>
        </div>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  )
}
