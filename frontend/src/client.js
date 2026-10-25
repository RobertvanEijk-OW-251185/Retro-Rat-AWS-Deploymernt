//rewritten for protection
const API_URL = import.meta.env.VITE_API_URL;

export async function apiGet(path) {
	const res = await fetch(`${API_URL}${path}`, {
		method: "GET",
		headers: getAuthHeaders(),
	});
	if (!res.ok) {
		throw new Error(`API error: ${res.status}`);
	}
	return res.json();
}

function getAuthHeaders() {
	const headers = { "Content-Type": "application/json" };

	const token = localStorage.getItem("token");

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
}

export async function apiPut(path, body) {
	const res = await fetch(`${API_URL}${path}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json", ...getAuthHeaders() },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	return res.json();
}

export async function apiPost(path, body) {
	const res = await fetch(`${API_URL}${path}`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.error || `API error: ${res.status}`);
	}
	return res.json();
}

// export async function apiDelete(path) {
// 	const res = await fetch(`${API_URL}${path}`, {
// 		method: "DELETE",
// 		headers: { ...getAuthHeaders() },
// 	});
// 	if (!res.ok) throw new Error(`API error: ${res.status}`);
// 	return res.json();
// }

export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${res.status}`);
  }
  
  return res.json();
}
