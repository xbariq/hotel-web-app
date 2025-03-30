import express from "express";
import { Pool } from "pg";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
import { Request, Response } from "express";

interface RoomParams {
  hotel_id: string;
  room_number: string;
}

// Set up the PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hotel_database",
  password: "postgres",
  port: 5432,
});

// Test database connection route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(
      `Hello, Hotel Web App! Database connected at: ${result.rows[0].now}`
    );
  } catch (err) {
    console.error("Database connection error", err);
    res.status(500).send("Database connection failed");
  }
});

// GET route to fetch hotels
app.get("/hotels", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hotel");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching hotels", err);
    res.status(500).send("Error fetching hotels");
  }
});

// POST route to add a new hotel
app.post("/hotels", async (req, res) => {
  const {
    email,
    name,
    street,
    city,
    state,
    country,
    code,
    total_rooms,
    rating,
    owner_id,
    manager_id,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO public.hotel (email, name, street, city, state, country, code, total_rooms, rating, owner_id, manager_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        email,
        name,
        street,
        city,
        state,
        country,
        code,
        total_rooms,
        rating,
        owner_id,
        manager_id,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding hotel", err);
    res.status(500).send("Error adding hotel");
  }
});

// PUT route to update hotel data
app.put("/hotels/:hotel_id", async (req, res) => {
  const { hotel_id } = req.params;
  const {
    email,
    name,
    street,
    city,
    state,
    country,
    code,
    total_rooms,
    rating,
    owner_id,
    manager_id,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE public.hotel
        SET email = $1, name = $2, street = $3, city = $4, state = $5, country = $6, code = $7,
            total_rooms = $8, rating = $9, owner_id = $10, manager_id = $11
        WHERE hotel_id = $12 RETURNING *`,
      [
        email,
        name,
        street,
        city,
        state,
        country,
        code,
        total_rooms,
        rating,
        owner_id,
        manager_id,
        hotel_id,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating hotel", err);
    res.status(500).send("Error updating hotel");
  }
});

// DELETE route to delete a hotel
app.delete("/hotels/:hotel_id", async (req, res) => {
  const { hotel_id } = req.params;
  try {
    await pool.query("DELETE FROM public.hotel WHERE hotel_id = $1", [
      hotel_id,
    ]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting hotel", err);
    res.status(500).send("Error deleting hotel");
  }
});

// GET route for searching available rooms
app.get("/rooms", async (req, res) => {
  const { roomCapacity, price, startDate, endDate } = req.query;

  let query = `SELECT * FROM room WHERE 1=1`;
  let queryParams: any[] = [];

  if (roomCapacity) {
    query += ` AND capacity >= $${queryParams.length + 1}`;
    queryParams.push(roomCapacity);
  }

  if (price) {
    query += ` AND price <= $${queryParams.length + 1}`;
    queryParams.push(price);
  }

  // Check for rooms that are not booked during the specified date range
  if (startDate && endDate) {
    query += ` AND room_number NOT IN (
        SELECT room_number
        FROM stay
        WHERE (start_date, end_date) OVERLAPS ($${queryParams.length + 1}, $${
      queryParams.length + 2
    })
      )`;
    queryParams.push(startDate, endDate);
  }

  try {
    const result = await pool.query(query, queryParams);
    res.json(result.rows); // Return the filtered rooms as JSON
  } catch (err) {
    console.error("Error fetching rooms", err);
    res.status(500).send("Error fetching rooms");
  }
});

// POST route to add a new room
app.post("/rooms", async (req, res) => {
  const { room_number, hotel_id, price, view, extendable, issues, capacity } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO public.room (room_number, hotel_id, price, view, extendable, issues, capacity)
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_number, hotel_id, price, view, extendable, issues, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding room", err);
    res.status(500).send("Error adding room");
  }
});
// PUT route to update room details
app.put(
  "/rooms/:hotel_id/:room_number",
  async (req: express.Request<RoomParams>, res) => {
    const { hotel_id, room_number } = req.params;
    const { price, view, extendable, issues, capacity } = req.body;

    try {
      const result = await pool.query(
        `UPDATE public.room
          SET price = $1, view = $2, extendable = $3, issues = $4, capacity = $5
          WHERE hotel_id = $6 AND room_number = $7 RETURNING *`,
        [price, view, extendable, issues, capacity, hotel_id, room_number]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error updating room", err);
      res.status(500).send("Error updating room");
    }
  }
);
// DELETE route to delete a room
app.delete("/rooms/:hotel_id/:room_number", async (req, res) => {
  const { hotel_id, room_number } = req.params;
  try {
    await pool.query(
      "DELETE FROM public.room WHERE hotel_id = $1 AND room_number = $2",
      [hotel_id, room_number]
    );
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting room", err);
    res.status(500).send("Error deleting room");
  }
});

app.post("/book-room", async (req, res) => {
  const { room_number, hotel_id, startDate, endDate, customer_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings (room_number, hotel_id, start_date, end_date, customer_id) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [room_number, hotel_id, startDate, endDate, customer_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error booking room", err);
    res.status(500).send("Error booking room");
  }
});

// POST route to add a new payment
app.post("/payments", async (req: Request, res: Response) => {
  console.log("Request Body:", req.body); // Add this line to log the body

  const {
    stay_id,
    amount,
    payment_method,
    payment_date,
    stay_type,
    customer_id,
  } = req.body;

  try {
    // Log the request body to ensure correct values are passed
    console.log("Request body:", req.body);

    // Insert payment data into the payments table
    const result = await pool.query(
      `INSERT INTO payments (stay_id, amount, payment_method, payment_date, stay_type, customer_id) 
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [stay_id, amount, payment_method, payment_date, stay_type, customer_id]
    );

    // Optionally update the stay_type in the stay table
    await pool.query(`UPDATE stay SET stay_type = $1 WHERE stay_id = $2`, [
      stay_type,
      stay_id,
    ]);

    res.status(201).json(result.rows[0]); // Return the payment details
  } catch (err) {
    console.error("Error adding payment", err);
    res.status(500).send("Error adding payment");
  }
});

// GET route to fetch all payments
app.get("/payments", async (req, res) => {
  try {
    const result = await pool.query(`
          SELECT payment_id, amount, payment_method, payment_date, stay_type, customer_id, stay_id 
          FROM payments
        `);
    res.json(result.rows); // Send payment details as response
  } catch (err) {
    console.error("Error fetching payments", err);
    res.status(500).send("Error fetching payments");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
