import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, Bookmark, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">U</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">UniCompare</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Discover</Link>
            <Link to="/compare" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
              <BarChart2 size={18} /> Compare
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/saved" className="text-gray-600 hover:text-blue-600 transition-colors tooltip flex items-center gap-1">
                  <Bookmark size={20} /> <span className="hidden sm:inline font-medium">Saved</span>
                </Link>
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
                    <User size={18} />
                  </div>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Log in</Link>
                <Link to="/signup" className="btn-primary">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
