require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('./models');

const seedAdmin = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/attendify';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected for Seeding');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@attendify.com' });

    if (adminExists) {
      console.log('Admin user already exists. Exiting...');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@attendify.com',
      password: 'password123', // Will be hashed by pre-save hook
      role: 'admin',
      phone: '1234567890',
    });

    console.log(`Admin user created successfully!
-----------------------------------
Email: ${admin.email}
Password: password123
Role: ${admin.role}
-----------------------------------
Please change this password in production.
    `);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
