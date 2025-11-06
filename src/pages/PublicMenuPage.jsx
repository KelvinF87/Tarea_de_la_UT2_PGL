import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import * as api from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const cafeInfo = {
  cafeName: "CAMPER CAFE",
  established: "2020",
  contact: {
    website: "Visita nuestra web",
    address: "123 Free Code Camp Drive"
  },
  imgCoffe: "https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg",
  imgDessert: "https://cdn.freecodecamp.org/curriculum/css-cafe/pie.jpg"
};

function PublicMenuPage() {
  const [menuData, setMenuData] = useState({ menu: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productosRes, categoriasRes] = await Promise.all([
          api.getProductos(),
          api.getCategorias(),
        ]);

        const productos = productosRes.records || [];
        const categorias = categoriasRes.records || [];

        const groupedMenu = categorias.reduce((acc, categoria) => {
          const itemsDeCategoria = productos.filter(p => p.categoria_nombre === categoria.nombre && p.disponible);
          
          if (itemsDeCategoria.length > 0) {
            acc[categoria.nombre.toLowerCase()] = itemsDeCategoria;
          }
          return acc;
        }, {});

        setMenuData({ ...cafeInfo, menu: groupedMenu });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{textAlign: 'center', fontSize: '1.5em'}}>Cargando menú...</p>;
  if (error) return <p style={{textAlign: 'center', color: 'red'}}>Error al cargar el menú: {error}</p>;

  return (
    <>
      <div style={{ textAlign: 'center', margin: '20px' }}>
          <button className='btnPrimary' onClick={() => navigate('/login')}>Admin Login</button>
      </div>
      <Card data={menuData} isAdmin={false} />
      <Footer midata={cafeInfo} />
    </>
  );
}

export default PublicMenuPage;