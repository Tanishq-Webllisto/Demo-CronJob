const { Client } = require('pg');
const cron = require('node-cron');

// PostgreSQL connection configuration
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  host: 'localhost',
  port: 5432,
  database: 'your_database',
};

// Create a PostgreSQL client
const client = new Client(dbConfig);

// Connect to the PostgreSQL database
client.connect();

// Function to insert a dummy record into the table
const insertDummyRecord = async () => {
  try {
    // Generate random values for the dummy record
    const name = `DummyName${Date.now()}`;
    const value = Math.floor(Math.random() * 100);

    // Insert the record into the table
    const query = {
      text: 'INSERT INTO dummy_table (name, value) VALUES ($1, $2)',
      values: [name, value],
    };

    await client.query(query);
    console.log(`Inserted record: ${name}, ${value}`);
  } catch (error) {
    console.error('Error inserting record:', error.message);
  }
};

// Schedule the job to run every hour
cron.schedule('0 * * * *', () => {
  insertDummyRecord();
});

// Close the database connection when the script is terminated
process.on('SIGINT', () => {
  client.end();
  process.exit();
});
