require('dotenv').config();
const mongoose = require('mongoose');
const College = require('./models/College');

const mockColleges = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    location: "Mumbai, Maharashtra",
    fees: 250000,
    rating: 4.9,
    courses: ["B.Tech Computer Science", "B.Tech Electrical", "B.Tech Mechanical"],
    placementPercentage: 98,
    avgPackage: 22.5,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Birla Institute of Technology and Science (BITS)",
    location: "Pilani, Rajasthan",
    fees: 550000,
    rating: 4.8,
    courses: ["B.E. Computer Science", "B.E. Electronics", "M.Sc. Physics"],
    placementPercentage: 96,
    avgPackage: 19.5,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Delhi Technological University (DTU)",
    location: "New Delhi, Delhi",
    fees: 190000,
    rating: 4.5,
    courses: ["B.Tech Software Engineering", "B.Tech Information Technology"],
    placementPercentage: 92,
    avgPackage: 15.0,
    image: "https://www.guidanceforever.org/wp-content/uploads/2023/10/delhi-technological-university-new-delhi-featured-1.jpg"
  },
  {
    name: "National Institute of Technology (NIT) Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: 150000,
    rating: 4.7,
    courses: ["B.Tech Computer Science", "B.Tech Chemical"],
    placementPercentage: 94,
    avgPackage: 16.5,
    image: "https://dfhe5ze0n4pxu.cloudfront.net/College/Background-Images/Background-Image-1738751059565.png"
  },
  {
    name: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    fees: 1950000, // Total fees approx
    rating: 4.2,
    courses: ["B.Tech CSE", "B.Tech ECE"],
    placementPercentage: 88,
    avgPackage: 8.5,
    image: "https://img.collegepravesh.com/2017/02/VIT-Bhopal.jpg"
  },
  {
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    fees: 25000,
    rating: 4.6,
    courses: ["B.Tech Computer Science", "B.Tech Electronics"],
    placementPercentage: 90,
    avgPackage: 14.2,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1000&auto=format&fit=crop"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unicompare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding...');

    await College.deleteMany({});
    console.log('Cleared existing colleges.');

    await College.insertMany(mockColleges);
    console.log('Seeded colleges successfully.');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

seedDB();
