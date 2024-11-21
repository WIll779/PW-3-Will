// pages/edit/[id].js
import { useState, useEffect } from "react";
import { db, doc, getDoc, updateDoc } from "../../lib/firebase";
import { useRouter } from "next/router";

export default function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, "users", id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name);
          setEmail(userData.email);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", id), {
        name,
        email,
      });
      router.push("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Editar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={Thiago}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={thiagoteodoro.com}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      <a href="/">Voltar</a>
    </div>
  );
}
