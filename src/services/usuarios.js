const BASE_URL = 'http://localhost:3000'

export async function listarUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`)
  const data = await res.json()
  return Array.isArray(data) ? data : (data.data ?? [])
}

export async function criarUsuario(dados) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  return res.json()
}
