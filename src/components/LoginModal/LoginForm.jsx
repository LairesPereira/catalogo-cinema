import { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setErro('Preencha todos os campos.')
      return
    }
    const sucesso = await onLogin(username.trim(), password.trim())
    if (!sucesso) setErro('Usuário ou senha inválidos.')
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
      {erro && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 text-sm px-4 py-3 rounded-lg">
          {erro}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-zinc-300 text-sm font-medium">Usuário</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}
          placeholder="Digite seu usuário"
          className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2.5 text-white placeholder-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-zinc-300 text-sm font-medium">Senha</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2.5 text-white placeholder-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors" />
      </div>
      <button type="submit"
        className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-bold py-2.5 rounded-lg transition-colors cursor-pointer mt-1">
        Entrar
      </button>
    </form>
  )
}
