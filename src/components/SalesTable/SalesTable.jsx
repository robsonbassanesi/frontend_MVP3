import { useState, useEffect } from 'react';

export function SalesTable() {
  const [sales, setSales] = useState([]);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [newSaleData, setNewSaleData] = useState({
    customer: '',
    product: '',
    category: '',
    amount: 0,
    unitary_value: 0,
    total: 0 // Adicione um estado para o total
  });
  console.log(newSaleData);
  useEffect(() => {
    // Faça uma solicitação ao servidor para obter as vendas cadastradas
    fetch('http://127.0.0.1:4500/sales')
      .then(response => response.json())
      .then(data => setSales(data.sales))
      .catch(error => console.error('Erro ao buscar vendas:', error));
  }, []);

  // Função para calcular o total com base em amount e unitary_value
  const calculateTotal = () => {
    const amount = parseFloat(newSaleData.amount);
    const unitaryValue = parseFloat(newSaleData.unitary_value);
    if (!isNaN(amount) && !isNaN(unitaryValue)) {
      return amount * unitaryValue;
    }
    return 0;
  };

  const handleNewSaleSubmit = event => {
    event.preventDefault();

    // Calcula o total antes de enviar para o servidor
    const total = calculateTotal();

    // Atualiza o estado de newSaleData com o total calculado
    setNewSaleData({ ...newSaleData, total });

    // Faça uma solicitação POST ao servidor para adicionar uma nova venda
    fetch('http://127.0.0.1:4500/sale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSaleData)
    })
      .then(response => response.json())
      .then(data => {
        // Atualize a lista de vendas com a nova venda
        setSales([...sales, data]);
        setIsNewSaleModalOpen(false);
        // Limpe os dados do formulário e reset o total
        setNewSaleData({
          customer: '',
          product: '',
          category: '',
          amount: 0,
          unitary_value: 0,
          total: 0
        });
      })
      .catch(error => console.error('Erro ao adicionar venda:', error));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">Vendas Cadastradas</h1>
      <button
        className="absolute px-4 py-2 text-white bg-blue-500 rounded-full top-4 right-4"
        onClick={() => setIsNewSaleModalOpen(true)}
      >
        Adicionar Venda
      </button>
      <table className="w-full mt-12 bg-white rounded-lg shadow-md">
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
            <form onSubmit={handleNewSaleSubmit}>
              {/* ... Campos do formulário para adicionar uma nova venda ... */}
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
                  type="number"
                  id="amount"
                  name="amount"
                  className="w-full px-3 py-2 border rounded"
                  value={newSaleData.amount}
                  onChange={e =>
                    setNewSaleData({ ...newSaleData, amount: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="unitary_value" className="block text-gray-600">
                  Valor Unitário:
                </label>
                <input
                  type="number"
                  id="unitary_value"
                  name="unitary_value"
                  className="w-full px-3 py-2 border rounded"
                  value={newSaleData.unitary_value}
                  onChange={e =>
                    setNewSaleData({
                      ...newSaleData,
                      unitary_value: e.target.value
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="total" className="block text-gray-600">
                  Total:
                </label>
                <input
                  type="number"
                  id="total"
                  name="total"
                  className="w-full px-3 py-2 border rounded"
                  value={newSaleData.total}
                  readOnly
                />
              </div>
              {/* ... Outros campos ... */}
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
