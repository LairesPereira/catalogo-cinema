import { X } from 'lucide-react'
import DetalheFilmes from './DetalheFilmes'
import useFilmeDetalhe from './useFilmeDetalhe'

export default function FilmeDetalhe({ filme, usuario, onFechar, onFilmeAtualizado }) {
  const {
    nota, visivel, comentarios, minhaAvaliacao, carregando,
    fechar, handleAvaliar, handleRemoverAvaliacao,
    handleAdicionarComentario, handleDeletarComentario, handleEditarFilme,
  } = useFilmeDetalhe(filme, usuario, onFechar, onFilmeAtualizado)

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-250 ${visivel ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/85" onClick={fechar} />

      <button
        type="button"
        onClick={fechar}
        className="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition-colors cursor-pointer bg-black/40 rounded-full p-1.5"
      >
        <X size={22} />
      </button>

      <DetalheFilmes
        filme={filme}
        nota={nota}
        visivel={visivel}
        usuario={usuario}
        minhaAvaliacao={minhaAvaliacao}
        comentarios={comentarios}
        carregando={carregando}
        onAvaliar={handleAvaliar}
        onRemoverAvaliacao={handleRemoverAvaliacao}
        onAdicionarComentario={handleAdicionarComentario}
        onDeletarComentario={handleDeletarComentario}
        onEditar={handleEditarFilme}
      />
    </div>
  )
}
