import { useState } from 'react';
import './App.css';
import { Card } from './componentes/Card.jsx';
import { Footer } from './componentes/Footer.jsx';
import { Modal } from './componentes/Modal.jsx';
import initialMenuData from './data/dbcafe.json';

function App() {
  const [menuData, setMenuData] = useState(initialMenuData);
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const handleOpenModal = (type, data = null) => {
    setModal({ isOpen: true, type, data });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, type: null, data: null });
  };

  const handleSubmitModal = (formData) => {
    const { type, data } = modal;

    if (type === 'add-category') {
      const newCategoryName = formData.name.toLowerCase();
      if (newCategoryName && !menuData.menu[newCategoryName]) {
        setMenuData((prevData) => ({
          ...prevData,
          menu: {
            ...prevData.menu,
            [newCategoryName]: [],
          },
        }));
      }
    } else if (type === 'edit-category') {
        const oldCategoryName = data.categoryName;
        const newCategoryName = formData.name.toLowerCase();
        if (newCategoryName && newCategoryName !== oldCategoryName && !menuData.menu[newCategoryName]) {
            setMenuData(prevData => {
                const newMenu = { ...prevData.menu };
                newMenu[newCategoryName] = newMenu[oldCategoryName];
                delete newMenu[oldCategoryName];
                return { ...prevData, menu: newMenu };
            });
        }
    } else if (type === 'add-item') {
        const { categoryName } = data;
        setMenuData(prevData => ({
            ...prevData,
            menu: {
                ...prevData.menu,
                [categoryName]: [
                    ...prevData.menu[categoryName],
                    { name: formData.name, price: parseFloat(formData.price) }
                ]
            }
        }));
    } else if (type === 'edit-item') {
        const { categoryName, item } = data;
        setMenuData(prevData => ({
            ...prevData,
            menu: {
                ...prevData.menu,
                [categoryName]: prevData.menu[categoryName].map(i =>
                    i.name === item.name ? { ...i, name: formData.name, price: parseFloat(formData.price) } : i
                )
            }
        }));
    }

    handleCloseModal();
  };

   const handleDelete = () => {
    const { type, data } = modal;

    if (type === 'delete-category') {
        const { categoryName } = data;
        setMenuData(prevData => {
            const newMenu = { ...prevData.menu };
            delete newMenu[categoryName];
            return { ...prevData, menu: newMenu };
        });
    } else if (type === 'delete-item') {
        const { categoryName, item } = data;
        setMenuData(prevData => ({
            ...prevData,
            menu: {
                ...prevData.menu,
                [categoryName]: prevData.menu[categoryName].filter(i => i.name !== item.name)
            }
        }));
    }
    handleCloseModal();
  };

  return (
    <>
      <Card
        data={menuData}
        onOpenModal={handleOpenModal}
      />
      <Footer midata={menuData} />
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

export default App;