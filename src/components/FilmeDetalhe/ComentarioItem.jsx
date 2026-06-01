import { Trash2 } from 'lucide-react'

export default function ComentarioItem({ comentario, podeDeletar, onDeletar }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <span className="text-yellow-400 text-xs font-semibold">{comentario.usuario} </span>
        <span className="text-zinc-300 text-sm">{comentario.texto}</span>
      </div>
      {podeDeletar && (
        <button
          type="button"
          onClick={() => onDeletar(comentario.id)}
          className="text-zinc-600 hover:text-red-400 transition-colors shrink-0 cursor-pointer mt-0.5"
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  )
}
