import { Trash2 } from 'lucide-react'
import Estrelas from '../Estrelas'
import { deletarFilme } from '../../services/filmes'

export default function FilmeCard({ filme, usuario, onAbrirDetalhe, onFilmeDeletado }) {
  const nota = filme.totalNotas > 0 ? (filme.somaNotas / filme.totalNotas).toFixed(1) : '—'

  async function handleDeletarFilme(e) {
    e.stopPropagation()
    if (!window.confirm(`Deseja remover o filme "${filme.titulo}"?`)) return
    await deletarFilme(filme.id)
    onFilmeDeletado(filme.id)
  }

  return (
    <div
      onClick={() => onAbrirDetalhe(filme)}
      className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-lg cursor-pointer hover:border-yellow-400/50 hover:bg-zinc-750 transition-colors"
    >
      <div className="flex gap-4 p-4">
        <img
          src={filme.capa}
          alt={filme.titulo}
          className="w-24 h-36 object-cover rounded-xl shrink-0 bg-zinc-700"
          onError={e => { e.target.src = 'https://via.placeholder.com/96x144?text=Sem+Capa' }}
        />

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-white font-bold text-lg leading-tight">{filme.titulo}</h2>
              {usuario?.role === 'admin' && (
                <button
                  type="button"
                  onClick={handleDeletarFilme}
                  className="text-zinc-500 hover:text-red-400 transition-colors shrink-0 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Estrelas nota={Math.round(filme.somaNotas / (filme.totalNotas || 1))} />
              <span className="text-yellow-400 font-bold text-sm">{nota}</span>
              <span className="text-zinc-500 text-xs">({filme.totalNotas} avaliações)</span>
            </div>
          </div>

          <p className="text-zinc-500 text-xs mt-3">Clique para ver detalhes →</p>
        </div>
      </div>
    </div>
  )
}
