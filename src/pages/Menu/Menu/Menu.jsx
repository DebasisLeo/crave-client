import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/menu-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import { FaPizzaSlice,  FaHamburger, FaIceCream, FaSoap } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter(item => item.category === 'dessert');
  const soup = menu.filter(item => item.category === 'soup');
  const salad = menu.filter(item => item.category === 'salad');
  const pizza = menu.filter(item => item.category === 'pizza');
  const offered = menu.filter(item => item.category === 'offered');

  return (
    <div className="font-sans bg-gray-100">
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>

      <Cover img={menuImg} title="Our Menu" />

      {/* Main Offer Section */}
      <motion.div
        className="py-12 bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle subHeading="Don't Miss" heading="Today's Offer" />
        <MenuCategory items={offered} />
      </motion.div>

      {/* Menu Categories */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <MenuCategory items={desserts} title="Desserts" img={dessertImg} icon={<FaIceCream className="text-4xl hover:text-yellow-300 transition-all" />} />
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <MenuCategory items={pizza} title="Pizza" img={pizzaImg} icon={<FaPizzaSlice className="text-4xl hover:text-red-500 transition-all" />} />
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <MenuCategory items={salad} title="Salads" img={saladImg} icon={<FaHamburger className="text-4xl hover:text-green-500 transition-all" />} />
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <MenuCategory items={soup} title="Soups" img={soupImg} icon={<FaSoap className="text-4xl hover:text-brown-500 transition-all" />} />
      </motion.div>
    </div>
  );
};

export default Menu;
