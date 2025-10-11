import './App.css';
import { Card } from './componentes/Card.jsx';
import menuData from './data/dbcafe.json';

function App() {
  return (
    <>
      <Card data={menuData} />
    </>
  );
}

export default App;