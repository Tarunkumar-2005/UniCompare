import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CollegeCard from '../components/CollegeCard';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [savedIds, setSavedIds] = useState([]);
  const [compareList, setCompareList] = useState([]);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/colleges`, {
        params: { search, location, maxFees, page, limit: 6 }
      });
      setColleges(data.colleges);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching colleges", error);
    }
    setLoading(false);
  };

  const fetchSavedColleges = async () => {
    if (!user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_URL}/api/user/saved`, config);
      setSavedIds(data.map(c => typeof c === 'object' ? c._id : c));
    } catch (error) {
      console.error("Error fetching saved", error);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [page]);

  useEffect(() => {
    fetchSavedColleges();
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchColleges();
  };

  const handleSaveToggle = async (collegeId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`${API_URL}/api/user/save/${collegeId}`, {}, config);
      setSavedIds(data.savedColleges);
    } catch (error) {
      console.error("Error toggling save", error);
    }
  };

  const handleCompareToggle = (college) => {
    setCompareList(prev => {
      const exists = prev.find(c => c._id === college._id);
      if (exists) return prev.filter(c => c._id !== college._id);
      if (prev.length >= 3) {
        alert("You can only compare up to 3 colleges at a time.");
        return prev;
      }
      return [...prev, college];
    });
  };

  const goToCompare = () => {
    if (compareList.length < 2) {
      alert("Select at least 2 colleges to compare.");
      return;
    }
    // Pass state to Compare page
    navigate('/compare', { state: { colleges: compareList } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Search and Filters Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Discover Top Colleges</h1>
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search colleges by name..." 
              className="pl-10 input-field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <input 
              type="text" 
              placeholder="Location" 
              className="input-field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <input 
              type="number" 
              placeholder="Max Fees" 
              className="input-field"
              value={maxFees}
              onChange={(e) => setMaxFees(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn-primary flex items-center justify-center gap-2">
            <SlidersHorizontal size={18} /> Filter
          </button>
        </form>
      </div>

      {/* Compare Floating Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-4 animate-slide-up">
          <span className="font-medium">{compareList.length}/3 Selected for Compare</span>
          <button 
            onClick={goToCompare}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full font-bold text-sm transition-colors flex items-center gap-2"
          >
            <BarChart2 size={16} /> Compare Now
          </button>
        </div>
      )}

      {/* College Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : colleges.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-gray-400 mb-4 flex justify-center"><Search size={48} /></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No colleges found</h3>
          <p className="text-gray-500">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map(college => (
            <CollegeCard 
              key={college._id} 
              college={college}
              isSaved={savedIds.includes(college._id)}
              onSaveToggle={handleSaveToggle}
              isCompareSelected={compareList.some(c => c._id === college._id)}
              onCompareToggle={handleCompareToggle}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-4">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="p-2 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium text-gray-700">Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="p-2 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

    </div>
  );
};

export default Home;
