// pages/index.js
import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../lib/firebase";

export default function Home() {
  const [users, setUsers] = useState([]);

  // Carregar usuários do Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.Thiago} - {user.thiagoteodoro.com}
            <a href={`/edit/${user.id}`}>Editar</a> | 
            <a href={`/delete/${user.id}`}>Deletar</a>
          </li>
        ))}
      </ul>
      <a href="/add">Adicionar Novo Usuário</a>
    </div>
  );
}
