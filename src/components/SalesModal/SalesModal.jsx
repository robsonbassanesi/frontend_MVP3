import { useState, useEffect } from 'react';

export function SalesModal() {
  const [sales, setSales] = useState([]);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);

  useEffect(() => {
    // Faça uma solicitação ao servidor para obter as vendas cadastradas
    fetch('http://127.0.0.1:4500/sales')
      .then(response => response.json())
      .then(data => setSales(data.sales))
      .catch(error => console.error('Erro ao buscar vendas:', error));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">Vendas Cadastradas</h1>
      <button
        className="absolute px-4 py-2 text-white bg-blue-500 rounded-full top-4 right-4"
        onClick={() => setIsNewSaleModalOpen(true)}
      >
        Adicionar Venda
      </button>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Produto</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Valor Unitário</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sales.sales) ? (
            sales.map(sale => (
              <tr key={sale.id} className="border-b border-gray-300">
                <td className="px-4 py-2">{sale.customer}</td>
                <td className="px-4 py-2">{sale.product}</td>
                <td className="px-4 py-2">{sale.category}</td>
                <td className="px-4 py-2">{sale.amount}</td>
                <td className="px-4 py-2">{sale.unitary_value}</td>
                <td className="px-4 py-2">{sale.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhuma venda encontrada</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para adicionar nova venda */}
      {isNewSaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-1/2 p-4 bg-white rounded-lg">
            <h2 className="mb-4 text-2xl font-bold">Adicionar Nova Venda</h2>
            <form>
              {/* Campos do formulário para adicionar uma nova venda */}
              {/* Exemplo: */}
              <div className="mb-4">
                <label htmlFor="customer" className="block text-gray-600">
                  Cliente:
                </label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="product" className="block text-gray-600">
                  Produto:
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-600">
                  Categoria:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-600">
                  Quantidade:
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="unitary_value" className="block text-gray-600">
                  Valor Unitário:
                </label>
                <input
                  type="text"
                  id="unitary_value"
                  name="unitary_value"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="total" className="block text-gray-600">
                  Total:
                </label>
                <input
                  type="text"
                  id="total"
                  name="total"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-blue-500 rounded-full"
                  onClick={() => setIsNewSaleModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 ml-2 text-white bg-green-500 rounded-full"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
