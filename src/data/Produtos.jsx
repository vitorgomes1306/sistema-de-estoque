import { useState, useTransition } from "react";
import { produtos as produtosData, categorias } from "../data/produtos";

function Produtos(){
    const [produtos, setProdutos] = useState(produtosData)
    const [filtro, setFiltro] = useState("")
    const [categoriaFiltro, setCategoriaFiltro] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [produtoEditando, setProdutoEditando] = useState(null)
    const [formData, setFormData] = useState({
        nome: "",
        categoria: "",
        quantidade: 0,
        preco: 0,
        estoqueMinimo: 0
})

const produtosFiltrados = produtos.filter(p =>{
    const matchNome = p.nome.toLowerCase().includes(filtro.toLowerCase())
    const matchCategoria = categoriaFiltro === "" || p.categoria === categoriaFiltro
    return matchNome && matchCategoria

})

const abrirModal = (produto = null) => {
    if (produto) {
        setProdutoEditando(produto)
        setFormData({...produto})
    } else {
        setProdutoEditando(null)
        setFormData({
            nome: "",
            categoria: categorias[0],
            quantidade: 0,
            preco: 0,
            estoqueMinimo: 0
        })
    }
}
}