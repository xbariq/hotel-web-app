import React, { useState } from "react";
import axios from "axios";
import "../styles.css";
const SearchRoom = () => {
  const [roomCapacity, setRoomCapacity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [rooms, setRooms] = useState<any[]>([]);

  const handleSearch = async () => {
    const queryParams: any = {};

    if (roomCapacity !== "") {
      queryParams.roomCapacity = roomCapacity;
    }

    if (price !== "") {
      queryParams.price = price;
    }

    try {
      console.log("Search Params:", queryParams);

      // Make API request with the selected filters
      const response = await axios.get("http://localhost:3000/rooms", {
        params: queryParams,
      });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms", error);
    }
  };

  return (
    <div>
      <h2>Hotel Web App</h2>
      <h3>Search Rooms</h3>

      {/* Room Search Form */}
      <form>
        <div>
          <label>Room Capacity:</label>
          <input
            type="number"
            value={roomCapacity || ""}
            min="1"
            onChange={(e) =>
              setRoomCapacity(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price || ""}
            min="0"
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>

      {/* Display Search Results */}
      <div>
        <h3>Available Rooms</h3>
        {rooms.length > 0 ? (
          <ul>
            {rooms.map((room) => (
              <li key={room.room_number}>
                Room {room.room_number} - ${room.price} - Capacity:{" "}
                {room.capacity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default SearchRoom;
