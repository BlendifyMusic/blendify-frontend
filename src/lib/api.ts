import { getFirebaseAuth } from './firebase';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const user = getFirebaseAuth().currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthHeaders()),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return res.json();
}

export const api = {
  createBlend: () => request<{ blendId: string }>('/blend', { method: 'POST' }),

  getBlend: (id: string) => request<any>(`/blend/${id}`),

  joinBlend: (id: string) =>
    request<{ status: string; result: any }>(`/blend/${id}/join`, { method: 'POST' }),

  pushPlaylist: (blendId: string) =>
    request<{ playlistUrl: string }>(`/playlist/${blendId}/push`, { method: 'POST' }),

  getAuthUrl: (platform: 'spotify' | 'ytmusic', blendId?: string) => {
    const params = blendId ? `?blendId=${blendId}` : '';
    return `${API_BASE}/auth/${platform}${params}`;
  },
};
