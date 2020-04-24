import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 30000,
  headers: {
    'Content-type': 'application/json',
  },
})

export default {
  api,
}
