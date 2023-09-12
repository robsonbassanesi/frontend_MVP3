import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import { SalesModal } from './components/SalesModal/SalesModal';
import { SalesTable } from './components/SalesTable/SalesTable';

function App() {
  return (
    <>
      <Login />
      <Header />
      <SalesModal />
      <SalesTable />
    </>
  );
}

export default App;
