import { Plus } from 'lucide-react'
import FilmeCard from '../FilmeCard'

export default function ListaFilmes({ filmes, usuario, onAbrirDetalhe, onFilmeDeletado, onAbrirAdicionarFilme }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold">Filmes</h2>
          <p className="text-zinc-400 text-sm mt-1">{filmes.length} filmes cadastrados</p>
        </div>
        {usuario?.role === 'admin' && (
          <button
            onClick={onAbrirAdicionarFilme}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus size={18} />
            Adicionar Filme
          </button>
        )}
      </div>

      {filmes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">Nenhum filme cadastrado ainda.</p>
          {usuario?.role === 'admin' && (
            <p className="text-zinc-600 text-sm mt-2">Clique em "Adicionar Filme" para começar.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filmes.map(filme => (
            <FilmeCard
              key={filme.id}
              filme={filme}
              usuario={usuario}
              onAbrirDetalhe={onAbrirDetalhe}
              onFilmeDeletado={onFilmeDeletado}
            />
          ))}
        </div>
      )}
    </main>
  )
}
