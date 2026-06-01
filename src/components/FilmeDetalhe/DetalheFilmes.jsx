import { useState } from 'react'
import AvaliacaoUsuario from './AvaliacaoUsuario'
import ComentariosPanel from './ComentariosPanel'
import FilmeHeader from './FilmeHeader'
import SinopseFilme from './SinopseFilme'

export default function DetalheFilmes({
  filme, nota, visivel, usuario,
  minhaAvaliacao, comentarios, carregando,
  onAvaliar, onRemoverAvaliacao, onAdicionarComentario, onDeletarComentario, onEditar,
}) {
  const [editando, setEditando] = useState(false)
  const [tituloEdit, setTituloEdit] = useState('')
  const [sinopseEdit, setSinopseEdit] = useState('')

  function abrirEdicao() {
    setTituloEdit(filme.titulo)
    setSinopseEdit(filme.sinopse)
    setEditando(true)
  }

  async function salvarEdicao() {
    if (!tituloEdit.trim() || !sinopseEdit.trim()) return
    await onEditar({ titulo: tituloEdit.trim(), sinopse: sinopseEdit.trim() })
    setEditando(false)
  }

  return (
    <div className={`relative z-10 flex w-full max-w-5xl mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-250 ${visivel ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className="hidden md:block w-2/5 shrink-0 bg-black aspect-2/3">
        <img src={filme.capa} alt={filme.titulo} className="w-full h-full object-cover"
          onError={e => { e.target.src = 'https://via.placeholder.com/400x600?text=Sem+Capa' }} />
      </div>
      <div className="flex flex-col flex-1 bg-zinc-900 min-w-0 overflow-hidden">
        <FilmeHeader
          filme={filme} nota={nota} usuario={usuario}
          editando={editando} tituloEdit={tituloEdit}
          onChangeTitulo={setTituloEdit} onAbrirEdicao={abrirEdicao}
        />
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
          <SinopseFilme
            sinopse={filme.sinopse} editando={editando}
            sinopseEdit={sinopseEdit} onChangeSinopse={setSinopseEdit}
            onSalvar={salvarEdicao} onCancelar={() => setEditando(false)}
          />
          {usuario && (
            <AvaliacaoUsuario minhaAvaliacao={minhaAvaliacao} onAvaliar={onAvaliar} onRemover={onRemoverAvaliacao} />
          )}
          <ComentariosPanel
            comentarios={comentarios} usuario={usuario} carregando={carregando}
            onAdicionar={onAdicionarComentario} onDeletar={onDeletarComentario}
          />
        </div>
      </div>
    </div>
  )
}
