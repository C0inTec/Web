import axios from "axios";
import { getFirebaseToken } from "./auth";

const api = axios.create({
    baseURL:'http://localhost:8080/user'
})

api.interceptors.request.use(async (config) => {
    const token = await getFirebaseToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface User {
    name: string;
    email:string;
    password: string;

}

export interface UpdateUser {
    id: number;
    name?: string;
    email?: string;
}

// Função para criar um usuário na API
export const createUser = async (user: { name: string; email: string }) => {
    const response = await api.post("/", user);
    return response.data;
};

// Função para buscar usuários na API
export const getUsers = async () => {
    const response = await api.get("/");
    return response.data;
};

// // Atualizar um usuário
// export const updateUser = async (user: UpdateUser) => {
//     const response = await axios.put("http://localhost:8080/user", user);
//     return response.data;
// };

// // Deletar um usuário
// export const deleteUser = async (id: number) => {
//     const response = await axios.delete(`${"http://localhost:8080/user"}/${id}`);
//     return response.data;
// };
 

export default api;
