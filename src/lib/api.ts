const API_URL = import.meta.env.VITE_API_URL;

// Store token and unit_id in memory and localStorage
let authToken: string | null = null;
let unitId: number | null = null;

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem("authToken", token);
}

export function getAuthToken() {
  return authToken || localStorage.getItem("authToken");
}

export function setUnitId(id: number) {
  unitId = id;
  localStorage.setItem("unitId", id.toString());
}

export function getUnitId() {
  const storedUnitId = localStorage.getItem("unitId");
  return unitId || (storedUnitId ? parseInt(storedUnitId, 10) : null);
}

async function request(method: string, endpoint: string, data?: any) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const options: RequestInit = {
    method,
    headers,
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error("API error: " + response.statusText);
  }
  return response.json();
}

export function get(endpoint: string) {
  return request("GET", endpoint);
}

export function post(endpoint: string, data?: any) {
  return request("POST", endpoint, data);
}

export function put(endpoint: string, data?: any) {
  return request("PUT", endpoint, data);
}

export async function del(endpoint: string) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error("API error: " + response.statusText);
  }

  // Handle 204 No Content response
  if (response.status === 204) {
    return { status: 204, message: "Successfully deleted" };
  }

  // For other successful responses, try to parse JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return { status: response.status, message: "Success" };
}

// Login API (does not use auth token)
export async function loginUser(loginname: string, password: string) {
  const response = await fetch(`${API_URL}api/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginname, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed: " + response.statusText);
  }
  const data = await response.json();
  setAuthToken(data.access); // Save access token
  setUnitId(data.unit_id); // Save unit_id
  return data;
}