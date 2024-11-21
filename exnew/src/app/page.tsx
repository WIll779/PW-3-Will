"use client";

import React, {useState, useEffect} from 'react';
import {obterItens, addItem, updateItem, deleteItem} from './api/obj/route.js';

const App = () => {
    const [itens, setItens] = useState([]);
    const [nome, setNome] = useState('');
    const [itemEditando, setItemEditando] = useState < string | null > (null);

    // Carregar os itens do Firestore
    useEffect(() => {
        const carregarItensDoFirestore = async () => {
            try {
                const itensObtidos = await obterItens();
                setItens(itensObtidos);
            } catch (error) {
                console.error('Erro ao carregar os itens:', error);
            }
        };

        carregarItensDoFirestore();
    }, []);

    const adicionarItemHandler = async () => {
        if (!nome) {
            alert('Erro: Por favor, preencha o campo de nome.');
            return;
        }

        try {
            await addItem(nome);
            alert('Sucesso: Item adicionado com sucesso!');
            setNome('');

            const itensObtidos = await obterItens();
            setItens(itensObtidos);
        } catch (error) {
            alert('Erro: Houve um erro ao adicionar o item.');
        }
    };

    const editarItemHandler = (item : any) => {
        setNome(item.name);
        setItemEditando(item.id);
    };

    const atualizarItemHandler = async () => {
        if (!nome) {
            alert('Erro: Por favor, preencha o campo de nome.');
            return;
        }

        try {
            await updateItem(itemEditando as string, nome);
            alert('Sucesso: Item atualizado com sucesso!');
            setItemEditando(null);
            setNome('');

            const itensObtidos = await obterItens();
            setItens(itensObtidos);
        } catch (error) {
            alert('Erro: Houve um erro ao atualizar o item.');
        }
    };

    const deletarItemHandler = async (id : string) => {
        try {
            await deleteItem(id);
            alert('Sucesso: Item deletado com sucesso!');

            const itensObtidos = await obterItens();
            setItens(itensObtidos);
        } catch (error) {
            alert('Erro: Houve um erro ao deletar o item.');
        }
    };

    return (
        <div className="container">
            <div className="box">
                <h2>Agenda</h2>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}/> {
                    itemEditando
                        ? (
                            <button
                                onClick={atualizarItemHandler}
                                style={{
                                    backgroundColor: 'gray',
                                    color: 'gray',
                                    padding: '10px 10px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.3s'
                                }}>
                                Atualizar Item
                            </button>
                        )
                        : (
                            <button
                                onClick={adicionarItemHandler}
                                style={{
                                    backgroundColor: '#008CBA',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.3s'
                                }}>
                                Adicionar Item
                            </button>
                        )
                }
                <table
                    style={{
                        width: '90%',
                        borderCollapse: 'collapse',
                        marginTop: '20px'
                    }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '12px',
                                    textAlign: 'left',
                                    backgroundColor: '#f4f4f4',
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>
                                Nome do Item
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '12px',
                                    textAlign: 'left',
                                    backgroundColor: '#f4f4f4',
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itens.length === 0
                                ? (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            style={{
                                                padding: '20px',
                                                textAlign: 'center',
                                                fontStyle: 'italic',
                                                color: '#888'
                                            }}>
                                            Nenhum item encontrado.
                                        </td>
                                    </tr>
                                )
                                : (itens.map((item : any) => (
                                    <tr key={item.id}>
                                        <td
                                            style={{
                                                border: '1px solid #ddd',
                                                padding: '12px'
                                            }}>{item.name}</td>
                                        <td
                                            style={{
                                                border: '1px solid #ddd',
                                                padding: '12px'
                                            }}>
                                            <button
                                                onClick={() => editarItemHandler(item)}
                                                style={{
                                                    backgroundColor: 'gray',
                                                    color: '#fff',
                                                    padding: '8px 16px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    marginRight: '10px',
                                                    fontSize: '14px',
                                                    transition: 'background-color 0.3s'
                                                }}>
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => deletarItemHandler(item.id)}
                                                style={{
                                                    backgroundColor: 'orange',
                                                    color: '#fff',
                                                    padding: '8px 16px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    transition: 'background-color 0.3s'
                                                }}>
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                )))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;