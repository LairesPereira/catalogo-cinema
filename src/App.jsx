import { useState, useEffect } from 'react'
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import CadastroModal from './components/CadastroModal'
import FilmeModal from './components/FilmeModal'
import ListaFilmes from './components/ListaFilmes'
import FilmeDetalhe from './components/FilmeDetalhe'
import { listarFilmes, criarFilme } from './services/filmes'
import { listarUsuarios, criarUsuario } from './services/usuarios'

export default function App() {
  const [filmes, setFilmes] = useState([])
  const [usuario, setUsuario] = useState(null)
  const [modalAberto, setModalAberto] = useState(null)
  const [filmeAberto, setFilmeAberto] = useState(null)

  useEffect(() => {
    listarFilmes().then(setFilmes)
  }, [])

  async function handleLogin(username, password) {
    const usuarios = await listarUsuarios()
    const encontrado = usuarios.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    )
    if (encontrado) { setUsuario(encontrado); setModalAberto(null); return true }
    return false
  }

  async function handleCadastro(username, password) {
    const usuarios = await listarUsuarios()
    const existe = usuarios.find(u => u.username.toLowerCase() === username.toLowerCase())
    if (existe) return false
    const novo = await criarUsuario({ username, password, role: 'user' })
    setUsuario(novo); setModalAberto(null); return true
  }

  async function handleAdicionarFilme(dados) {
    const novo = await criarFilme(dados)
    setFilmes(prev => [novo, ...prev])
  }

  function handleFilmeAtualizado(filmeAtualizado) {
    setFilmes(prev => prev.map(f => f.id === filmeAtualizado.id ? filmeAtualizado : f))
    setFilmeAberto(prev => prev?.id === filmeAtualizado.id ? filmeAtualizado : prev)
  }

  function handleFilmeDeletado(filmeId) {
    setFilmes(prev => prev.filter(f => f.id !== filmeId))
    setFilmeAberto(prev => prev?.id === filmeId ? null : prev)
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header usuario={usuario} onLogout={() => setUsuario(null)}
        onAbrirLogin={() => setModalAberto('login')} onAbrirCadastro={() => setModalAberto('cadastro')} />
      <ListaFilmes filmes={filmes} usuario={usuario} onAbrirDetalhe={setFilmeAberto}
        onFilmeDeletado={handleFilmeDeletado} onAbrirAdicionarFilme={() => setModalAberto('filme')} />
      {filmeAberto && (
        <FilmeDetalhe filme={filmeAberto} usuario={usuario}
          onFechar={() => setFilmeAberto(null)} onFilmeAtualizado={handleFilmeAtualizado} />
      )}
      {modalAberto === 'login' && <LoginModal onFechar={() => setModalAberto(null)} onLogin={handleLogin} />}
      {modalAberto === 'cadastro' && <CadastroModal onFechar={() => setModalAberto(null)} onCadastro={handleCadastro} />}
      {modalAberto === 'filme' && <FilmeModal onFechar={() => setModalAberto(null)} onSalvar={handleAdicionarFilme} />}
    </div>
  )
}
