const API_BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Respuesta de error no válida' }));
    throw new Error(errorBody.message || `Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const makeAuthenticatedRequest = (url, method, body = {}) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return Promise.reject(new Error("Token no encontrado en localStorage. Por favor, inicie sesión de nuevo."));
  }

  const authenticatedUrl = `${url}?jwt=${token}`;

  return fetch(authenticatedUrl, {
    method: method,
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  }).then(handleResponse);
};


export const login = (email, password) => {
  return fetch(`${API_BASE_URL}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const getCategorias = () => {
  return fetch(`${API_BASE_URL}/categorias.php`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(handleResponse);
};

export const createCategoria = (nombre, descripcion) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/categorias.php`, 'POST', { nombre, descripcion });
};

export const updateCategoria = (categoria) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/categorias.php`, 'PUT', categoria);
};

export const deleteCategoria = (id) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/categorias.php`, 'DELETE', { id });
};

export const getProductos = () => {
  return fetch(`${API_BASE_URL}/productos.php`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(handleResponse);
};

export const createProducto = (producto) => {
  const { jwt, ...productoData } = producto;
  return makeAuthenticatedRequest(`${API_BASE_URL}/productos.php`, 'POST', productoData);
};

export const updateProducto = (producto) => {
  const { jwt, ...productoData } = producto;
  return makeAuthenticatedRequest(`${API_BASE_URL}/productos.php`, 'PUT', productoData);
};

export const deleteProducto = (id) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/productos.php`, 'DELETE', { id });
};