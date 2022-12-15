import './main.scss';
import createHeader from './pages/components/header';
import createCatalog from "./pages/catalog/catalog";

createHeader({ totalPrice: '€2,428.00', productsCount: 3 }); // Установлены значения для примера
createCatalog();
