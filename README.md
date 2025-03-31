### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Npm 


### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd hotel-web-app
   npm install


### Set up PostgreSQL:

Apply the SQL Schema:

We will provide the hotel_database.sql file, which contains the necessary schema to set up the database tables. After you create the database, execute the script we will provide you as it will create all the tables needed. 

If the payment table is missing, right click on the database name, select run a query, run the following to create the payment table: 
```

-- Create the payments table to store payment details
CREATE TABLE IF NOT EXISTS public.payments (
  payment_id SERIAL PRIMARY KEY,          -- Unique ID for the payment
  customer_id INTEGER NOT NULL,           -- Reference to the customer
  amount DECIMAL(10, 2) NOT NULL,         -- Payment amount
  payment_method VARCHAR(255),            -- Payment method (e.g., 'cash', 'credit card')
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date and time of payment
  stay_type VARCHAR(50) CHECK (stay_type IN ('booking', 'renting')), -- Stay type
  stay_id INTEGER,                        -- Reference to the stay record
  FOREIGN KEY (customer_id) REFERENCES public.hotel_customer(customer_id) ON DELETE CASCADE, -- Reference to hotel_customer
  FOREIGN KEY (stay_id) REFERENCES public.stay(stay_id) ON DELETE CASCADE -- Reference to stay table
);


```



### Configure PostgreSQL Connection
In the project directory, navigate to src/server.ts and update the following details in the pool configuration to match your PostgreSQL setup:
```bash
const pool = new Pool({
  user: "postgres",  // Your PostgreSQL user
  host: "localhost",  // Your PostgreSQL host (localhost for local setups)
  database: "hotel_database",  // Your database name
  password: "postgres",  // Your PostgreSQL password
  port: 5432,  // Default PostgreSQL port
});
```


### Run the Server
Now that everything is set up, run the server using the following command inside hotel-web-app dir:
```bash
npm run dev
```

### Test the Setup
http://localhost:3000
You should see a message saying "Hello, Hotel Web App! Database connected at: [current date and time]".



### Front-end Setup

from hotel-web-app directory, run the following commands in terminal:
```bash
- cd client
- npm start




