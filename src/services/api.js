import axios from 'axios'

// ✅ Récupérer le token JWT depuis le localStorage
const token = localStorage.getItem('token')

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), // ✅ Ajout du token
  },
})

export default apiClient
  