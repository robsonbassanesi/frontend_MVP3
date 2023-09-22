import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export function SalesTable() {
  const [sales, setSales] = useState([]);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [form, setForm] = useState({
    customer: '',
    product: '',
    category: '',
    amount: '',
    unitary_value: ''
  });
  const [userData, setUserData] = useState({
    display_name: '',
    photo_url: ''
  });
  const { user, singOut } = useContext(AuthContext);

  useEffect(() => {
    // Faça uma solicitação ao servidor para obter as vendas cadastradas
    fetch('http://127.0.0.1:4500/sales')
      .then(response => response.json())
      .then(data => setSales(data.sales))
      .catch(error => console.error('Erro ao buscar vendas:', error));
  }, []);

  const dataForm = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  async function createSale() {
    const formData = new FormData();
    formData.append('customer', form.customer);
    formData.append('product', form.product);
    formData.append('category', form.category);
    formData.append('amount', form.amount);
    formData.append('unitary_value', form.unitary_value);
    console.log(formData);

    axios.post('http://127.0.0.1:4500/sale', formData).catch(error => {
      console.log(error);
    });
  }

  function handleDeleteSale(id) {
    console.log(id);
    let url = 'http://127.0.0.1:4500/sale?sale_id=' + id;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status === 200) {
          // A exclusão foi bem-sucedida, recarregue a página
          window.location.reload();
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }

  useEffect(() => {
    // Tente obter os dados do usuário do localStorage
    const savedUserData = localStorage.getItem('userData');
    const userId = user.id;

    if (savedUserData) {
      // Se os dados do usuário estiverem no localStorage, atualize o estado
      setUserData(JSON.parse(savedUserData));
    } else {
      // Caso contrário, faça uma solicitação ao servidor para obter os dados do usuário
      const url = 'http://127.0.0.1:4500/user?user_id=' + userId;

      fetch(url, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          // Extrair display_name e photo_url dos dados
          const { display_name, photo_url } = data;

          // Atualizar o estado com os dados do usuário
          setUserData({
            display_name: display_name,
            photo_url: photo_url
          });

          // Salvar os dados do usuário no localStorage
          localStorage.setItem(
            'userData',
            JSON.stringify({
              display_name: display_name,
              photo_url: photo_url
            })
          );
        })
        .catch(error =>
          console.error('Erro ao buscar dados do usuário:', error)
        );
    }
  }, []);

  const [cotacao, setCotacao] = useState(null);

  useEffect(() => {
    // Função para buscar a cotação do dólar
    const fetchDollarCotacao = async () => {
      try {
        const response = await fetch(
          'http://economia.awesomeapi.com.br/json/USD-BRL/1'
        );
        const data = await response.json();

        // Extrair o valor da cotação do dólar dos dados
        const cotacaoAtualizada = data[0]?.ask;

        if (cotacaoAtualizada) {
          setCotacao(cotacaoAtualizada);
        } else {
          console.error('Não foi possível obter a cotação do dólar.');
        }
      } catch (error) {
        console.error('Erro ao buscar cotação do dólar:', error);
      }
    };

    // Chamar a função imediatamente para obter a primeira cotação
    fetchDollarCotacao();

    // Configurar um intervalo para buscar a cotação a cada 30 segundos
    const intervalId = setInterval(fetchDollarCotacao, 30000);

    // Limpar o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 ">
      <div className="flex items-center justify-around">
        <h1 className="text-3xl font-bold ">Vendas Cadastradas</h1>
        <button
          className="items-end px-4 py-2 text-white bg-blue-500 rounded-full"
          onClick={() => setIsNewSaleModalOpen(true)}
        >
          Adicionar Venda
        </button>
        <div className="flex flex-col items-center justify-center text-xl font-bold">
          <h2>Cotação do Dólar</h2>
          {cotacao !== null ? (
            <p>USD para BRL: {cotacao}</p>
          ) : (
            <p>Carregando cotação...</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-5">
          <h1 className="text-lg font-bold">{userData.display_name}</h1>
          <img className="w-40 rounded-full" src={userData.photo_url} alt="" />
        </div>
        <button
          type="button"
          onClick={singOut}
          className="text-black font-bold bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Sair
        </button>
      </div>

      <table className="w-full mt-12 bg-white rounded-lg shadow-md">
        <thead>
          <tr className="text-xl bg-gray-200">
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Produto</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Valor Unitário</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Excluir Venda</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sales) && sales.length > 0 ? (
            sales.map(sale => (
              <tr
                key={sale.id}
                className="text-xl font-medium text-center border-b border-gray-300 "
              >
                <td className="px-4 py-2">{sale.customer}</td>
                <td className="px-4 py-2">{sale.product}</td>
                <td className="px-4 py-2">{sale.category}</td>
                <td className="px-4 py-2">{sale.amount}</td>
                <td className="px-4 py-2">
                  <NumericFormat
                    value={sale.unitary_value}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                  />
                </td>
                <td className="px-4 py-2">
                  {' '}
                  <NumericFormat
                    value={sale.total}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                  />
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDeleteSale(sale.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
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
          <div className="w-1/2 p-4 bg-gray-300 rounded-lg">
            <h2 className="mb-4 text-2xl font-bold">Adicionar Nova Venda</h2>
            <form onSubmit={createSale}>
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
                  required
                  placeholder="José da Silva"
                  value={form.customer}
                  onChange={dataForm}
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
                  required
                  placeholder="Tênis"
                  value={form.product}
                  onChange={dataForm}
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
                  required
                  placeholder="Sapatos"
                  value={form.category}
                  onChange={dataForm}
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
                  required
                  placeholder="0"
                  value={form.amount}
                  onChange={dataForm}
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
                  required
                  placeholder="R$ 0,00"
                  value={form.unitary_value}
                  onChange={dataForm}
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
