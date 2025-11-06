

import { useState, useEffect, useCallback } from 'react';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { Modal } from '../components/Modal';
import * as api from '../api/apiService';
import { useAuth } from '../hooks/useAuth';
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

function AdminPage() {
  const [menuData, setMenuData] = useState({ menu: {} });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null });
  const { logout } = useAuth();
  const navigate = useNavigate();

 const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [productosRes, categoriasRes] = await Promise.all([
        api.getProductos(),
        api.getCategorias(),
      ]);

      const productos = productosRes.records || [];
      const categoriasData = categoriasRes.records || [];

      const groupedMenu = categoriasData.reduce((acc, categoria) => {
        acc[categoria.nombre.toLowerCase()] = {
          id: categoria.id,
          items: productos.filter(p => p.categoria_nombre === categoria.nombre)
        };
        return acc;
      }, {});
      
      setMenuData({ ...cafeInfo, menu: groupedMenu });
      setCategorias(categoriasData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

   useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (type, data = null) => {
    setModal({ isOpen: true, type, data: { ...data, categorias } });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, type: null, data: null });
  };
 const handleSubmitModal = async (formData) => {
   const { type, data } = modal;
   try {
       const payload = {
           nombre: formData.name,
           precio: String(formData.price),
           descripcion: formData.description || '',
           categoria_id: parseInt(formData.categoria_id, 10),
           disponible: formData.disponible,
       };

        if (type === 'add-category') {
            await api.createCategoria(formData.name, formData.description || '');
        } else if (type === 'edit-category') {
            await api.updateCategoria({ id: data.categoryId, nombre: formData.name, descripcion: formData.description || '' });
        } else if (type === 'add-item') {
            await api.createProducto(payload); 
        } else if (type === 'edit-item') {
            await api.updateProducto({
                id: data.item.id,
                ...payload 
            });
        }
    } catch (err) {
        alert(`Error al enviar el formulario: ${err.message}`);
    } finally {
        handleCloseModal();
        fetchData();
    }
  };
  const handleDelete = async () => {
    const { type, data } = modal;
    try {
        if (type === 'delete-item') {
            await api.deleteProducto(data.item.id);
        } else if (type === 'delete-category') {
            await api.deleteCategoria(data.categoryId);
        }
    } catch (err) {
        alert(`Error: ${err.message}`);
    } finally {
        handleCloseModal();
        fetchData();
    }
  };

  if (loading) return <p>Cargando menú...</p>;
  if (error) return <p>Error al cargar el menú: {error}</p>;

  return (
    <>
      <div style={{ textAlign: 'center', margin: '20px' }}>
          <button className='btnPrimary' onClick={() => navigate('/')}>Ver Menú Público</button>
          <button className='btnSalir' onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
      <Card data={menuData} onOpenModal={handleOpenModal} isAdmin={true} />
      <Footer midata={cafeInfo} />
      <Modal 
        isOpen={modal.isOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmitModal} 
        onDelete={handleDelete} 
        type={modal.type} 
        initialData={modal.data} 
      />
    </>
  );
}

export default AdminPage;