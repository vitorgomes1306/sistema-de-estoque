import React from 'react'
import { Camera, Monitor, CircleGauge} from 'lucide-react';
import { movimentacoes} from "../data/movimentacoes"
import { produtos} from "../data/produtos"

const Dashboard = () => {
  
  const totalProdutos = produtos.length
  const totalItens = produtos.reduce((acc, p) => acc + p.quantidade, 0)
  const valorTotal = produtos.reduce((acc, p) => acc + (p.quantidade * p.preco), 0)
  const produtosBaixoEstoque = produtos.filter(p => p.quantidade < p.estoqueMinimo)

  const ultimasMovimentacoes = [ ...movimentacoes]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0,5)
  
  return (
    <div>Dashboard



      
    </div>
  )
}

export default Dashboard