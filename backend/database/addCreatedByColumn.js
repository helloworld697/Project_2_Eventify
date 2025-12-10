const sequelize = require('../config/database');

const addCreatedByColumn = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected');

    // this Adds createdBy column if it doesn't exist
    await sequelize.query(`
      ALTER TABLE events ADD COLUMN createdBy INT AFTER image_url;
    `).catch(err => {
      if (err.message.includes('already exists')) {
        console.log('✓ Column createdBy already exists');
      } else {
        throw err;
      }
    });

    console.log('✓ createdBy column added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error adding column:', error.message);
    process.exit(1);
  }
};

addCreatedByColumn();
