import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className="text-lg font-bold text-cyan-700">Inicio</Link>
          </li>
          <li className="hidden md:block">
            <Link to="/relevos" className="ml-6 text-lg text-cyan-700 hover:underline">CheckList de Relevos</Link>
          </li>
          <li className="hidden md:block">
            <Link to="/contador" className="ml-6 text-lg text-cyan-700 hover:underline">Contador de Correos</Link>
          </li>
          <li className="hidden md:block">
            <Link to="/llamadas" className="ml-6 text-lg text-cyan-700 hover:underline">Control de Calidad</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
