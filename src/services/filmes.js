const BASE_URL = 'http://localhost:3000'

export async function listarFilmes() {
  const res = await fetch(`${BASE_URL}/filmes`)
  const data = await res.json()
  return Array.isArray(data) ? data : (data.data ?? [])
}

export async function criarFilme(dados) {
  const res = await fetch(`${BASE_URL}/filmes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function deletarFilme(id) {
  await fetch(`${BASE_URL}/filmes/${id}`, { method: 'DELETE' })
}

export async function atualizarFilme(id, dados) {
  const res = await fetch(`${BASE_URL}/filmes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  return res.json()
}
