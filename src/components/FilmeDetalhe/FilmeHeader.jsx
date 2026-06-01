import { Pencil } from 'lucide-react'
import Estrelas from '../Estrelas'

export default function FilmeHeader({ filme, nota, usuario, editando, tituloEdit, onChangeTitulo, onAbrirEdicao }) {
  return (
    <div className="px-5 py-4 border-b border-zinc-700 shrink-0">
      {editando ? (
        <input
          type="text"
          value={tituloEdit}
          onChange={e => onChangeTitulo(e.target.value)}
          className="w-full bg-zinc-800 border border-yellow-400 rounded-lg px-3 py-1.5 text-white font-bold text-xl focus:outline-none"
        />
      ) : (
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-white font-bold text-xl leading-tight">{filme.titulo}</h2>
          {usuario?.role === 'admin' && (
            <button
              type="button"
              onClick={onAbrirEdicao}
              className="text-zinc-500 hover:text-yellow-400 transition-colors shrink-0 cursor-pointer mt-0.5"
            >
              <Pencil size={15} />
            </button>
          )}
        </div>
      )}
      <div className="flex items-center gap-2 mt-1.5">
        <Estrelas nota={Math.round(filme.somaNotas / (filme.totalNotas || 1))} />
        <span className="text-yellow-400 font-bold text-sm">{nota}</span>
        <span className="text-zinc-500 text-xs">({filme.totalNotas} avaliações)</span>
      </div>
    </div>
  )
}
