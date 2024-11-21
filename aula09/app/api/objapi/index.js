// Importar Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore"; 

// Configurações do Firebase (pegue essas do seu console Firebase)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let pessoas = [
    { id: 1, nome: "Henrique", sobrenome: "Silva" },
    { id: 2, nome: "Maria", sobrenome: "Oliveira" }
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      // Retorna a lista de pessoas
      res.status(200).json(pessoas);
    } else if (req.method === 'POST') {
      // Adiciona uma nova pessoa
      const novaPessoa = { id: pessoas.length + 1, ...req.body };
      pessoas.push(novaPessoa);
      res.status(201).json(novaPessoa);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }