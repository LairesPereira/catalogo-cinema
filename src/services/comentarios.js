const BASE_URL = 'http://localhost:3000'

export async function listarComentarios(filmeId) {
  const res = await fetch(`${BASE_URL}/comentarios`)
  const data = await res.json()
  const todos = Array.isArray(data) ? data : (data.data ?? [])
  return todos.filter(c => String(c.filmeId) === String(filmeId))
}

export async function criarComentario(dados) {
  const res = await fetch(`${BASE_URL}/comentarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function deletarComentario(id) {
  await fetch(`${BASE_URL}/comentarios/${id}`, { method: 'DELETE' })
}
