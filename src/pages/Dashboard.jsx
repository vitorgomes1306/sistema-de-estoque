import React from "react";
import { Camera, Monitor, CircleGauge } from "lucide-react";
import { movimentacoes } from "../data/movimentacoes";
import { produtos } from "../data/produtos";

const Dashboard = () => {
  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce(
    (acc, p) => acc + p.quantidade * p.preco,
    0
  );
  const produtosBaixoEstoque = produtos.filter(
    (p) => p.quantidade < p.estoqueMinimo
  );

  const ultimasMovimentacoes = [...movimentacoes]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2">Total de Produtos</h6>
                  <h3 className="card-title mb-0">{totalProdutos}</h3>
                </div>
                <i className="bi bi-box fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2">Itens em Estoque</h6>
                  <h3 className="card-title mb-0">{totalItens}</h3>
                </div>
                <i className="bi bi-boxes fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2">Valor em Estoque</h6>
                  <h3 className="card-title mb-0">
                    {valorTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h3>
                </div>
                <i className="bi bi-currency-dollar fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2">Estoque Baixo</h6>
                  <h3 className="card-title mb-0">
                    {produtosBaixoEstoque.length}
                  </h3>
                </div>
                <i className="bi bi-exclamation-triangle fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <i className="bi bi-exclamation-circle me-2"></i>
              Produtos com Estoque Baixo
            </div>
            <div className="card-body">
              {produtosBaixoEstoque.length === 0 ? (
                <p className="text-muted mb-0">
                  Nenhum produto com estoque baixo.
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {produtosBaixoEstoque.map((produto) => (
                    <li
                      key={produto.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{produto.nome}</span>
                      <span className="badge bg-danger">
                        {produto.quantidade} un.
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <i className="bi bi-clock-history me-2"></i>
              Últimas Movimentações
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {ultimasMovimentacoes.map((mov) => (
                  <li
                    key={mov.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span
                        className={`badge me-2 ${
                          mov.tipo === "entrada" ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {mov.tipo === "entrada" ? "E" : "S"}
                      </span>
                      {mov.produtoNome}
                    </div>
                    <span className="text-muted small">
                      {mov.quantidade} un.
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
