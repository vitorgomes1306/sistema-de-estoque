import { useState, useTransition } from "react";
import { produtos as produtosData, categorias } from "../data/produtos";

function Produtos() {
  const [produtos, setProdutos] = useState(produtosData);
  const [filtro, setFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    quantidade: 0,
    preco: 0,
    estoqueMinimo: 0,
  });

  const produtosFiltrados = produtos.filter((p) => {
    const matchNome = p.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchCategoria =
      categoriaFiltro === "" || p.categoria === categoriaFiltro;
    return matchNome && matchCategoria;
  });

  const abrirModal = (produto = null) => {
    if (produto) {
      setProdutoEditando(produto);
      setFormData({ ...produto });
    } else {
      setProdutoEditando(null);
      setFormData({
        nome: "",
        categoria: categorias[0],
        quantidade: 0,
        preco: 0,
        estoqueMinimo: 0,
      });
    }
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setProdutoEditando(null);
  };
  const salvarProduto = (e) => {
    e.preventDefault();
    if (produtoEditando) {
      setProdutos(
        produtos.map((p) =>
          p.id === produtoEditando.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      const novoId = Math.max(...produtos.map((p) => p.id)) + 1;
      setProdutos([...produtos, { ...formData, id: novoId }]);
    }
    fecharModal();
  };
  const excluirProduto = (id) => {
    if (confirm("Tem certeza que deseja excluir este produto")) {
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Produtos</h2>
          <button className="btn btn-primary" onClick={() => abrirModal()}>
            <i className="bi bi-plus-lg me-2"></i>
            Novo Produto
          </button>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nome..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th className="text-center">Quantidade</th>
                  <th className="text-end">Preço</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.categoria}</td>
                    <td className="text-center">{produto.quantidade}</td>
                    <td className="text-end">
                      {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="text-center">
                      {produto.quantidade <= produto.estoqueMinimo ? (
                        <span className="badge bg-danger">Baixo</span>
                      ) : (
                        <span className="badge bg-success">Normal</span>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => abrirModal(produto)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => excluirProduto(produto.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {produtoEditando ? "Editar Produto" : "Novo Produto"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={fecharModal}
                  ></button>
                </div>
                <form onSubmit={salvarProduto}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categoria</label>
                      <select
                        className="form-select"
                        required
                        value={formData.categoria}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categoria: e.target.value,
                          })
                        }
                      >
                        {categorias.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Quantidade</label>
                        <input
                          type="number"
                          className="form-control"
                          required
                          min="0"
                          value={formData.quantidade}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantidade: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Preço</label>
                        <input
                          type="number"
                          className="form-control"
                          required
                          min="0"
                          step="0.01"
                          value={formData.preco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preco: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Estoque Mín.</label>
                        <input
                          type="number"
                          className="form-control"
                          required
                          min="0"
                          value={formData.estoqueMinimo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estoqueMinimo: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={fecharModal}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Produtos