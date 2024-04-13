const dotenv = require('dotenv');

const User = require('./models/user');
const Game = require('./models/game');
const Tax = require('./models/tax');
const Coupon = require('./models/coupon');

const users = require('./data/users');
const games = require('./data/games');
const taxes = require('./data/taxes');
const coupons = require('./data/coupons');

// Database
const db = require('./config/database');

// Test Database Connection
try {
  db.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.log(`DB Error: ${error}`);
}

const importData = async () => {
    try {
        // Clean up the tables
        await Game.destroy({ where: {} });
        await User.destroy({ where: {} });
        await Tax.destroy({ where: {} });
        await Coupon.destroy({ where: {} });

        // Bulk create the users
        await User.bulkCreate(users);
        await Game.bulkCreate(games);
        await Tax.bulkCreate(taxes);
        await Coupon.bulkCreate(coupons);

        console.log('Data Imported...');
        process.exit();
    } catch (error) {
        console.log(`Data Import Error: ${error}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        // Clean up the tables
        await Game.destroy({ where: {} });
        await User.destroy({ where: {} });
        await Tax.destroy({ where: {} });
        await Coupon.destroy({ where: {} });

        console.log('Data Destroyed...');
        process.exit();
    } catch (error) {
        console.log(`Data Destroy Error: ${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
