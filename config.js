require('dotenv').config();

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/spacedrepetition';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/spacedrepetition';
exports.PORT = process.env.PORT || 3001;

