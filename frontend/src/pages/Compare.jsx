import { useLocation, useNavigate } from 'react-router-dom';
import { IndianRupee, MapPin, Star, TrendingUp, Trophy, ArrowLeft } from 'lucide-react';

const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const colleges = location.state?.colleges || [];

  if (colleges.length < 2) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-4">Not enough colleges selected for comparison</h2>
        <p className="text-gray-600 mb-6">Please go back and select at least 2 colleges.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Back to Discover</button>
      </div>
    );
  }

  // Find best values for highlighting
  const bestPlacement = Math.max(...colleges.map(c => c.placementPercentage));
  const bestPackage = Math.max(...colleges.map(c => c.avgPackage));
  const lowestFees = Math.min(...colleges.map(c => c.fees));
  const bestRating = Math.max(...colleges.map(c => c.rating));

  // Determine overall winner based on Decision Score logic
  const scores = colleges.map(c => Math.round((c.placementPercentage * 0.6) + ((c.rating / 5) * 40)));
  const bestScore = Math.max(...scores);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-blue-600 mb-2 transition-colors">
            <ArrowLeft size={20} className="mr-1" /> Back
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">Compare Colleges</h1>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="w-full min-w-max text-left border-collapse">
          <thead>
            <tr>
              <th className="p-6 border-b border-gray-200 bg-gray-50 w-48 sticky left-0 z-10">Features</th>
              {colleges.map((college, idx) => (
                <th key={college._id} className="p-6 border-b border-gray-200 border-l align-top w-72">
                  <div className="flex flex-col items-center text-center">
                    {scores[idx] === bestScore && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-3 flex items-center gap-1">
                        <Trophy size={14} /> Overall Best
                      </span>
                    )}
                    <img 
                      src={college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop'} 
                      alt={college.name} 
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                    />
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{college.name}</h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-gray-200 bg-gray-50 sticky left-0 z-10 font-medium text-gray-700">Decision Score</td>
              {colleges.map((college, idx) => (
                <td key={college._id} className="p-4 border-b border-gray-200 border-l text-center">
                  <span className={`text-xl font-bold ${scores[idx] === bestScore ? 'text-green-600' : 'text-gray-900'}`}>
                    {scores[idx]}/100
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-b border-gray-200 bg-gray-50 sticky left-0 z-10 font-medium text-gray-700 flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" /> Location
              </td>
              {colleges.map(college => (
                <td key={college._id} className="p-4 border-b border-gray-200 border-l text-center text-gray-600">
                  {college.location}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-b border-gray-200 bg-gray-50 sticky left-0 z-10 font-medium text-gray-700 flex items-center gap-2">
                <IndianRupee size={18} className="text-gray-400" /> Total Fees
              </td>
              {colleges.map(college => (
                <td key={college._id} className={`p-4 border-b border-gray-200 border-l text-center font-medium ${college.fees === lowestFees ? 'text-green-600 bg-green-50' : 'text-gray-900'}`}>
                  ₹{(college.fees / 100000).toFixed(2)}L
                  {college.fees === lowestFees && <span className="block text-xs mt-1 text-green-700 font-bold">Most Affordable</span>}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-b border-gray-200 bg-gray-50 sticky left-0 z-10 font-medium text-gray-700 flex items-center gap-2">
                <Star size={18} className="text-gray-400" /> Rating
              </td>
              {colleges.map(college => (
                <td key={college._id} className={`p-4 border-b border-gray-200 border-l text-center font-medium ${college.rating === bestRating ? 'text-amber-600 bg-amber-50' : 'text-gray-900'}`}>
                  {college.rating} / 5
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-b border-gray-200 bg-gray-50 sticky left-0 z-10 font-medium text-gray-700 flex items-center gap-2">
                <TrendingUp size={18} className="text-gray-400" /> Placement Rate
              </td>
              {colleges.map(college => (
                <td key={college._id} className={`p-4 border-b border-gray-200 border-l text-center font-medium ${college.placementPercentage === bestPlacement ? 'text-blue-600 bg-blue-50' : 'text-gray-900'}`}>
                  {college.placementPercentage}%
                  {college.placementPercentage === bestPlacement && <span className="block text-xs mt-1 text-blue-700 font-bold">Highest Rate</span>}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-b border-gray-200 bg-gray-50 sticky left-0 z-10 font-medium text-gray-700 flex items-center gap-2">
                <IndianRupee size={18} className="text-gray-400" /> Avg. Package
              </td>
              {colleges.map(college => (
                <td key={college._id} className={`p-4 border-b border-gray-200 border-l text-center font-medium ${college.avgPackage === bestPackage ? 'text-blue-600 bg-blue-50' : 'text-gray-900'}`}>
                  {college.avgPackage} LPA
                  {college.avgPackage === bestPackage && <span className="block text-xs mt-1 text-blue-700 font-bold">Best Package</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
