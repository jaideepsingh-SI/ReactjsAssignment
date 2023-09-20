const express = require("express");
const cors = require("cors");
const pool = require("./database");



const app = express();

app.use(express.json());
app.use(cors());

// app.post('/api/authenticate', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       // Query the database to check if the provided credentials are valid
//       const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
//       const { rows } = await pool.query(query, [username, password]);
  
//       if (rows.length === 1) {
//         // Generate a JWT token and send it as a response
//         const token = jwt.sign({ username: rows[0].username }, 'your-secret-key', {
//           expiresIn: '1h', // Token expires in 1 hour
//         });
//         res.status(200).json({ message: 'Authentication successful', token });
//       } else {
//         res.status(401).json({ message: 'Authentication failed' });
//       }
//     } catch (error) {
//       console.error('Error authenticating:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

app.post("/adduser", (req, res) => {
  const emp_username = req.body["emp_username"];
  const emp_password = req.body["emp_password"];

  console.log("Username:" + emp_username);
  console.log("Password:" + emp_password);

  const insertSTMT = `INSERT INTO employee(emp_username, emp_password) 
    VALUES ('${emp_username}', '${emp_password}');`;

  pool
    .query(insertSTMT)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })

    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received:" + req.body);
});





app.post("/adddata", (req, res) => {
  const venue = req.body["venue"];
  const sports = req.body["sports"];
  const Equipment = req.body["equipment"];
  const Quantity = req.body["quantity"];
  const event_date = req.body["event_date"];
  const event_time = req.body["event_time"];

  console.log("Venue:" + venue);
  console.log("Sports:" + sports);
  console.log("equipment:" + Equipment);
  console.log("quantity" + Quantity);
  console.log("Event_date:" + event_date);
  console.log("Event_time:" + event_time);

  const insertSports = `INSERT INTO details (venue, sports, equipment, quantity, date, time) 
    VALUES ('${venue}', '${sports}', '${Equipment}', '${Quantity}', '${event_date}', '${event_time}');`;

  pool
    .query(insertSports)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })

    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received:" + req.body);
});




app.get('/sports-options', (req, res) => {
    // Define the SQL query to select distinct sports from the "details" table
    const query = 'SELECT DISTINCT sports FROM details';
  
    pool.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching sports data.' });
        return;
      }
  
      // Extract the "sports" data from the query results
      const sportsData = results.rows.map((row) => row.sports);
  
      res.json(sportsData);
    });
  });
  
  
//   app.get('/venues-for-sport', (req, res) => {
//     const selectedSport = req.query.sport; // Get the selected sport from the query parameter
  
//     // Define the SQL query to select distinct venues for the selected sport
//     const query = `
//       SELECT DISTINCT venue
//       FROM details
//       WHERE sports = $1;
//     `;
  
//     pool.query(query, [selectedSport], (error, results) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching venue data.' });
//         return;
//       }
  
//       // Extract the "venue" data from the query results
//       const venuesData = results.rows.map((row) => row.venue);
  
//       res.json(venuesData);
//     });
//   });
  
app.get('/venue-options', (req, res) => {
    // Define the SQL query to select distinct venues from the "details" table
    const query = 'SELECT DISTINCT venue FROM details';
  
    pool.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching venue data.' });
        return;
      }
  
      // Extract the "venue" data from the query results
      const venuesData = results.rows.map((row) => row.venue);
  
      res.json(venuesData);
    });
  });
  


  app.get('/equipment-and-quantity-for-venue', (req, res) => {
    const selectedVenue = req.query.venue; // Get the selected venue from the query parameter
  
    // Define the SQL query to select distinct equipment and quantity for the selected venue
    const query = `
      SELECT DISTINCT equipment, quantity
      FROM details
      WHERE venue = $1;
    `;
  
    pool.query(query, [selectedVenue], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching equipment and quantity data.' });
        return;
      }
  
      // Extract the "equipment" and "quantity" data from the query results
      const equipmentAndQuantityData = results.rows.map((row) => ({
        equipment: row.equipment,
        quantity: row.quantity
      }));
  
      res.json(equipmentAndQuantityData);
    });
  });
//   app.post('/api/authenticate', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       // Query the database to check if the provided credentials are valid
//       const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
//       const { rows } = await pool.query(query, [username, password]);
  
//       if (rows.length === 1) {
//         res.status(200).json({ message: 'Authentication successful' });
//       } else {
//         res.status(401).json({ message: 'Authentication failed' });
//       }
//     } catch (error) {
//       console.error('Error authenticating:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  
app.listen(4000, () => console.log("Server is running on localhost:4000"));
