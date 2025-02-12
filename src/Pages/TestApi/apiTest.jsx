import { useEffect, useState } from "react";
import { getUsers } from "../../services/api";
const Test = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Usuários</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Test;
