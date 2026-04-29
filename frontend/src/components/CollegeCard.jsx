import { Link } from 'react-router-dom';
import { MapPin, IndianRupee, Star, GraduationCap, TrendingUp, Bookmark, BookmarkCheck } from 'lucide-react';

const CollegeCard = ({ college, isSaved, onSaveToggle, onCompareToggle, isCompareSelected }) => {
  // Decision Score Calculation (Max 100)
  // Placement is out of 100, Rating is out of 5.
  const score = Math.round((college.placementPercentage * 0.6) + ((college.rating / 5) * 40));
  
  // Smart Tags Logic
  const tags = [];
  if (college.avgPackage > 12 && college.fees < 300000) tags.push("Best ROI");
  if (college.placementPercentage >= 95) tags.push("Top Placement");
  if (college.fees < 150000) tags.push("Budget Friendly");

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full animate-slide-up">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop'} 
          alt={college.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="text-sm font-bold text-gray-800">Score:</span>
          <span className={`text-sm font-bold ${score >= 85 ? 'text-green-600' : score >= 70 ? 'text-blue-600' : 'text-orange-600'}`}>
            {score}/100
          </span>
        </div>
        
        {tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-blue-600/90 backdrop-blur text-white text-xs font-semibold px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">{college.name}</h3>
          <button 
            onClick={() => onSaveToggle(college._id)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            {isSaved ? <BookmarkCheck size={24} className="text-blue-600" /> : <Bookmark size={24} />}
          </button>
        </div>
        
        <p className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={16} className="mr-1" /> {college.location}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Fees</span>
            <span className="font-semibold flex items-center">
              <IndianRupee size={14} /> {(college.fees / 100000).toFixed(2)}L
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Rating</span>
            <span className="font-semibold flex items-center text-amber-500">
              <Star size={14} className="mr-1 fill-amber-500" /> {college.rating}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Placement</span>
            <span className="font-semibold flex items-center text-green-600">
              <TrendingUp size={14} className="mr-1" /> {college.placementPercentage}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Avg Package</span>
            <span className="font-semibold flex items-center">
              <IndianRupee size={14} /> {college.avgPackage} LPA
            </span>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <Link 
            to={`/college/${college._id}`}
            className="flex-1 btn-primary text-center"
          >
            View Details
          </Link>
          <button 
            onClick={() => onCompareToggle(college)}
            className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
              isCompareSelected 
                ? 'bg-blue-50 border-blue-600 text-blue-600' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isCompareSelected ? 'Selected' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
