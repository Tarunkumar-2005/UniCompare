import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MapPin, IndianRupee, Star, TrendingUp, BookOpen, Bookmark, BookmarkCheck, ArrowLeft } from 'lucide-react';

const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/colleges/${id}`);
        setCollege(data);
        
        // Check if saved
        if (user) {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const res = await axios.get(`http://localhost:5000/api/user/saved`, config);
          const savedIds = res.data.map(c => typeof c === 'object' ? c._id : c);
          setIsSaved(savedIds.includes(data._id));
        }
      } catch (error) {
        console.error("Error fetching college", error);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id, user]);

  const handleSaveToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`http://localhost:5000/api/user/save/${id}`, {}, config);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling save", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">College not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 btn-primary">Go Back Home</button>
      </div>
    );
  }

  const score = Math.round((college.placementPercentage * 0.6) + ((college.rating / 5) * 40));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={20} className="mr-1" /> Back to listings
      </button>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        {/* Header Hero */}
        <div className="relative h-64 md:h-80 w-full">
          <img 
            src={college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop'} 
            alt={college.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex justify-between items-end">
              <div className="text-white">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-white">{college.name}</h1>
                <p className="flex items-center text-gray-200 text-lg">
                  <MapPin size={20} className="mr-2" /> {college.location}
                </p>
              </div>
              <button 
                onClick={handleSaveToggle}
                className="bg-white/20 backdrop-blur hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                {isSaved ? <BookmarkCheck size={28} className="text-blue-400" /> : <Bookmark size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
              <span className="block text-gray-500 text-sm mb-1">Decision Score</span>
              <span className="text-3xl font-bold text-blue-600">{score}/100</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
              <span className="block text-gray-500 text-sm mb-1">Total Fees</span>
              <span className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                <IndianRupee size={20} /> {(college.fees / 100000).toFixed(2)}L
              </span>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 text-center border border-amber-100">
              <span className="block text-amber-600 text-sm mb-1">Rating</span>
              <span className="text-2xl font-bold text-amber-600 flex items-center justify-center">
                <Star size={20} className="mr-1 fill-amber-500" /> {college.rating}/5
              </span>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-100">
              <span className="block text-green-600 text-sm mb-1">Placement Rate</span>
              <span className="text-2xl font-bold text-green-600 flex items-center justify-center">
                <TrendingUp size={20} className="mr-1" /> {college.placementPercentage}%
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Left Col */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="text-blue-600" /> Offered Courses
                </h3>
                <div className="flex flex-wrap gap-3">
                  {college.courses.map((course, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium border border-gray-200">
                      {course}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About Placements</h3>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This institution has a strong track record of placing students in top tech companies and MNCs.
                  </p>
                  <div className="flex items-center gap-4 text-lg">
                    <div className="font-semibold text-gray-900">Average Package:</div>
                    <div className="text-blue-600 font-bold">{college.avgPackage} LPA</div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Col: Mock Reviews */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Reviews</h3>
              
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">A</div>
                  <span className="font-semibold">Amit Kumar</span>
                  <span className="text-amber-500 flex ml-auto"><Star size={14} className="fill-amber-500" /> 5</span>
                </div>
                <p className="text-sm text-gray-600">Great campus life and excellent placement cell. Best decision I made!</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">S</div>
                  <span className="font-semibold">Sneha Sharma</span>
                  <span className="text-amber-500 flex ml-auto"><Star size={14} className="fill-amber-500" /> 4</span>
                </div>
                <p className="text-sm text-gray-600">Academics are tough but totally worth it for the ROI.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
