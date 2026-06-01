import { Check, X as XIcon } from 'lucide-react'

export default function SinopseFilme({ sinopse, editando, sinopseEdit, onChangeSinopse, onSalvar, onCancelar }) {
  if (editando) {
    return (
      <div className="flex flex-col gap-2">
        <textarea
          value={sinopseEdit}
          onChange={e => onChangeSinopse(e.target.value)}
          rows={5}
          className="w-full bg-zinc-800 border border-yellow-400 rounded-lg px-3 py-2 text-zinc-300 text-sm leading-relaxed focus:outline-none resize-none"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSalvar}
            className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-bold text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Check size={15} /> Salvar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="flex items-center gap-1.5 bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <XIcon size={15} /> Cancelar
          </button>
        </div>
      </div>
    )
  }

  return <p className="text-zinc-300 text-sm leading-relaxed">{sinopse}</p>
}
