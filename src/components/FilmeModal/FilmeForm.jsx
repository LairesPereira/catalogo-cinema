import { useState } from 'react'

export default function FilmeForm({ onSalvar, onFechar }) {
  const [titulo, setTitulo] = useState('')
  const [sinopse, setSinopse] = useState('')
  const [capa, setCapa] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!titulo.trim() || !sinopse.trim()) {
      setErro('Título e sinopse são obrigatórios.')
      return
    }
    await onSalvar({
      titulo: titulo.trim(),
      sinopse: sinopse.trim(),
      capa: capa.trim() || 'https://via.placeholder.com/300x450?text=Sem+Capa',
      totalNotas: 0,
      somaNotas: 0,
    })
    onFechar()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
      {erro && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 text-sm px-4 py-3 rounded-lg">
          {erro}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-zinc-300 text-sm font-medium">Título *</label>
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)}
          placeholder="Nome do filme"
          className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2.5 text-white placeholder-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-zinc-300 text-sm font-medium">Sinopse *</label>
        <textarea value={sinopse} onChange={e => setSinopse(e.target.value)}
          placeholder="Descrição do filme" rows={4}
          className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2.5 text-white placeholder-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-zinc-300 text-sm font-medium">URL da Capa</label>
        <input type="text" value={capa} onChange={e => setCapa(e.target.value)}
          placeholder="https://... (opcional)"
          className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2.5 text-white placeholder-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors" />
      </div>
      <div className="flex gap-3 mt-1">
        <button type="button" onClick={onFechar}
          className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer">
          Cancelar
        </button>
        <button type="submit"
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-bold py-2.5 rounded-lg transition-colors cursor-pointer">
          Adicionar
        </button>
      </div>
    </form>
  )
}
