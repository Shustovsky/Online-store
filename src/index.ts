import './main.scss';
import createHeader from './pages/components/header';
import createCatalog from './pages/catalog/catalog';
import products from './assets/json/products.json';

createHeader({ totalPrice: '€2,428.00', productsCount: 3 }); // Установлены значения для примера
createCatalog(products.products);
