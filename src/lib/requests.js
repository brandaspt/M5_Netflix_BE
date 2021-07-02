import axios from "axios"

export const omdbBackend = axios.create({ baseURL: "http://www.omdbapi.com" })
