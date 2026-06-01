import { Plus } from 'lucide-react'

export default function ComentarioForm({ texto, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={texto}
        onChange={e => onChange(e.target.value)}
        placeholder="Adicione um comentário..."
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
      />
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
      >
        <Plus size={18} />
      </button>
    </form>
  )
}
