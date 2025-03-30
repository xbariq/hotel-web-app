import React, { useEffect, useState } from "react";
import axios from "axios";

interface Hotel {
  hotel_id: number;
  email: string;
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  code: string;
  total_rooms: number;
  rating: number | null;
  owner_id: number | null;
  manager_id: number | null;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        setError("Error fetching hotels");
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.hotel_id}>
            {hotel.name} - {hotel.city}, {hotel.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
