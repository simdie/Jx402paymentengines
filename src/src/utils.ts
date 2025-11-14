// JX402 API Helper Functions

const API_BASE = 'https://jx402-api.lubaking-co.workers.dev';

export async function apiFetch(endpoint: string, apiKey: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      ...options.headers
    }
  });
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  
  return res.json();
}

export async function simulateRemit(apiKey: string, data: { amount: number; to: string; corridor: string }) {
  return apiFetch('/remit', apiKey, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function fetchTxns(apiKey: string, params: { page?: number; corridor?: string }) {
  const query = new URLSearchParams(params as any).toString();
  return apiFetch(`/txns?${query}`, apiKey);
}

export async function generateKey(apiKey: string) {
  return apiFetch('/keys', apiKey, {
    method: 'POST'
  });
}

export async function revokeKey(apiKey: string, id: string) {
  return apiFetch(`/keys/${id}`, apiKey, {
    method: 'PATCH',
    body: JSON.stringify({ revoked: true })
  });
}

export async function fetchKeys(apiKey: string) {
  return apiFetch('/keys', apiKey);
}
