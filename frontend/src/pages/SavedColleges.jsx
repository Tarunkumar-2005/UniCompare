import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CollegeCard from '../components/CollegeCard';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedColleges = () => {
  const { user } = useContext(AuthContext);
  const [savedColleges, setSavedColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'https://unicompare-81ya.onrender.com';

  const fetchSavedColleges = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_URL}/api/user/saved`, config);
      setSavedColleges(data);
    } catch (error) {
      console.error("Error fetching saved colleges", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSavedColleges();
  }, [user]);

  const handleSaveToggle = async (collegeId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${API_URL}/api/user/save/${collegeId}`, {}, config);
      // Remove from list since it was unsaved
      setSavedColleges(prev => prev.filter(c => c._id !== collegeId));
    } catch (error) {
      console.error("Error unsaving college", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-blue-600 mb-2 transition-colors">
            <ArrowLeft size={20} className="mr-1" /> Back to Discover
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Bookmark className="text-blue-600" /> Your Saved Colleges
          </h1>
        </div>
      </div>

      {savedColleges.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-gray-300 mb-4 flex justify-center"><Bookmark size={64} /></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No saved colleges yet</h3>
          <p className="text-gray-500 mb-6">Start exploring and save colleges you are interested in.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Discover Colleges</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map(college => (
            <CollegeCard 
              key={college._id} 
              college={college}
              isSaved={true}
              onSaveToggle={handleSaveToggle}
              isCompareSelected={false}
              onCompareToggle={() => {
                navigate('/compare', { state: { colleges: [college] } });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedColleges;
