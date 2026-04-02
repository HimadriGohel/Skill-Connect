
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/user.model'); // Path to your User model

const createAdminAccount = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI|| 'mongodb://localhost:27017/skillconnect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin@12'; 

    const existingAdmin = await User.findOne({ email: adminEmail, role: 'admin' });

    if (existingAdmin) {
      console.log('Admin account already exists in the database. Exiting script.');
      return;
    }

    // Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Create the new admin user object
    const newAdmin = new User({
      fullname:'admin',
      phone: adminphone,
      address: adminAddress,
      name: 'Site Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin', // Add a 'role' field to your User schema
    });

    // Save the admin user to the database
    await newAdmin.save();
    console.log(`Admin account for ${adminEmail} created successfully!`);

  } catch (error) {
    console.error('Error creating admin account:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdminAccount();
