import { useState, useEffect } from 'react'
import { listarComentarios, criarComentario, deletarComentario } from '../../services/comentarios'
import { buscarAvaliacaoUsuario, criarAvaliacao, atualizarAvaliacao, deletarAvaliacao } from '../../services/avaliacoes'
import { atualizarFilme } from '../../services/filmes'

export default function useFilmeDetalhe(filme, usuario, onFechar, onFilmeAtualizado) {
  const [comentarios, setComentarios] = useState([])
  const [minhaAvaliacao, setMinhaAvaliacao] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [visivel, setVisivel] = useState(false)

  const nota = filme.totalNotas > 0 ? (filme.somaNotas / filme.totalNotas).toFixed(1) : '-'

  useEffect(() => {
    const timer = setTimeout(() => setVisivel(true), 10)
    async function carregar() {
      const [lista, avaliacao] = await Promise.all([
        listarComentarios(filme.id),
        usuario ? buscarAvaliacaoUsuario(filme.id, usuario.id) : Promise.resolve(null),
      ])
      setComentarios(lista)
      setMinhaAvaliacao(avaliacao)
      setCarregando(false)
    }
    carregar()
    return () => clearTimeout(timer)
  }, [filme.id, usuario])

  function fechar() {
    setVisivel(false)
    setTimeout(onFechar, 250)
  }

  async function handleAvaliar(novaNota) {
    if (!usuario) return
    if (minhaAvaliacao) {
      const notaAntiga = minhaAvaliacao.nota
      await atualizarAvaliacao(minhaAvaliacao.id, { nota: novaNota })
      const novoFilme = await atualizarFilme(filme.id, { somaNotas: filme.somaNotas - notaAntiga + novaNota })
      setMinhaAvaliacao(prev => ({ ...prev, nota: novaNota }))
      onFilmeAtualizado(novoFilme)
    } else {
      const novaAvaliacao = await criarAvaliacao({ filmeId: filme.id, usuarioId: usuario.id, nota: novaNota })
      const novoFilme = await atualizarFilme(filme.id, { totalNotas: filme.totalNotas + 1, somaNotas: filme.somaNotas + novaNota })
      setMinhaAvaliacao(novaAvaliacao)
      onFilmeAtualizado(novoFilme)
    }
  }

  async function handleRemoverAvaliacao() {
    if (!minhaAvaliacao) return
    await deletarAvaliacao(minhaAvaliacao.id)
    const novoFilme = await atualizarFilme(filme.id, { totalNotas: filme.totalNotas - 1, somaNotas: filme.somaNotas - minhaAvaliacao.nota })
    setMinhaAvaliacao(null)
    onFilmeAtualizado(novoFilme)
  }

  async function handleAdicionarComentario(texto) {
    const novo = await criarComentario({ filmeId: filme.id, usuarioId: usuario.id, usuario: usuario.username, texto })
    setComentarios(prev => [...prev, novo])
  }

  async function handleDeletarComentario(id) {
    await deletarComentario(id)
    setComentarios(prev => prev.filter(c => c.id !== id))
  }

  async function handleEditarFilme(dados) {
    const novoFilme = await atualizarFilme(filme.id, dados)
    onFilmeAtualizado(novoFilme)
  }

  return {
    nota, visivel, comentarios, minhaAvaliacao, carregando,
    fechar, handleAvaliar, handleRemoverAvaliacao,
    handleAdicionarComentario, handleDeletarComentario, handleEditarFilme,
  }
}
