import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import ComentarioItem from './ComentarioItem'
import ComentarioForm from './ComentarioForm'

export default function ComentariosPanel({ comentarios, usuario, carregando, onAdicionar, onDeletar }) {
  const [texto, setTexto] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!texto.trim()) return
    onAdicionar(texto.trim())
    setTexto('')
  }

  const podeDeletar = (c) =>
    usuario && (usuario.role === 'admin' || usuario.id === c.usuarioId)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <MessageCircle size={15} className="text-zinc-400" />
        <span className="text-zinc-300 text-sm font-semibold">
          Comentários ({comentarios.length})
        </span>
      </div>

      {carregando ? (
        <p className="text-zinc-500 text-sm">Carregando...</p>
      ) : comentarios.length === 0 ? (
        <p className="text-zinc-500 text-sm">Nenhum comentário ainda.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {comentarios.map(c => (
            <ComentarioItem key={c.id} comentario={c} podeDeletar={podeDeletar(c)} onDeletar={onDeletar} />
          ))}
        </div>
      )}

      <div className="pt-3 border-t border-zinc-700">
        {usuario
          ? <ComentarioForm texto={texto} onChange={setTexto} onSubmit={handleSubmit} />
          : <p className="text-zinc-500 text-sm text-center">Faça login para comentar e avaliar.</p>
        }
      </div>
    </div>
  )
}
