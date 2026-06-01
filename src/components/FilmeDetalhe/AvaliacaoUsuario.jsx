import Estrelas from '../Estrelas'

export default function AvaliacaoUsuario({ minhaAvaliacao, onAvaliar, onRemover }) {
  return (
    <div className="p-4 bg-zinc-800 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <p className="text-zinc-300 text-sm font-medium">Sua avaliação</p>
        {minhaAvaliacao && (
          <button
            type="button"
            onClick={onRemover}
            className="text-zinc-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
          >
            Remover
          </button>
        )}
      </div>
      <Estrelas nota={minhaAvaliacao?.nota || 0} interativo onAvaliar={onAvaliar} />
    </div>
  )
}
