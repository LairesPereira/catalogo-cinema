const BASE_URL = 'http://localhost:3000'

export async function listarAvaliacoes(filmeId) {
  const res = await fetch(`${BASE_URL}/avaliacoes`)
  const data = await res.json()
  const todos = Array.isArray(data) ? data : (data.data ?? [])
  return todos.filter(a => String(a.filmeId) === String(filmeId))
}

export async function buscarAvaliacaoUsuario(filmeId, usuarioId) {
  const res = await fetch(`${BASE_URL}/avaliacoes`)
  const data = await res.json()
  const todos = Array.isArray(data) ? data : (data.data ?? [])
  return todos.find(
    a => String(a.filmeId) === String(filmeId) && String(a.usuarioId) === String(usuarioId)
  ) || null
}

export async function criarAvaliacao(dados) {
  const res = await fetch(`${BASE_URL}/avaliacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function atualizarAvaliacao(id, dados) {
  const res = await fetch(`${BASE_URL}/avaliacoes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function deletarAvaliacao(id) {
  await fetch(`${BASE_URL}/avaliacoes/${id}`, { method: 'DELETE' })
}
