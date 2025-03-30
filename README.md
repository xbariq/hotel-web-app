### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn


### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd hotel-web-app
   npm install


### Set up PostgreSQL:

Apply the SQL Schema:

We will provide the hotel_database.sql file, which contains the necessary schema to set up the database tables. 

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

from hotel-web-app dir run the following commands in terminal:
```bash
- cd client
- npm start




