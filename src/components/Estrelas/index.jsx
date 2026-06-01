import { Star } from 'lucide-react'

export default function Estrelas({ nota, interativo = false, onAvaliar }) {
  const estrelas = [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center gap-0.5">
      {estrelas.map(n => {
        const preenchida = nota >= n
        return (
          <button
            type="button"
            key={n}
            onClick={() => interativo && onAvaliar && onAvaliar(n)}
            disabled={!interativo}
            className={`transition-transform ${interativo ? 'cursor-pointer hover:scale-125' : 'cursor-default'}`}
          >
            <Star
              size={18}
              className={preenchida ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}
            />
          </button>
        )
      })}
    </div>
  )
}
