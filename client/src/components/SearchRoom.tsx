import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const SearchRoom = () => {
  const [role, setRole] = useState<string>("customer");
  const [roomCapacity, setRoomCapacity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string | "">("");
  const [endDate, setEndDate] = useState<string | "">("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const handleSearch = async () => {
    const queryParams: any = {};

    if (roomCapacity !== "") {
      queryParams.roomCapacity = roomCapacity;
    }

    if (price !== "") {
      queryParams.price = price;
    }

    if (startDate !== "") {
      queryParams.startDate = startDate;
    }

    if (endDate !== "") {
      queryParams.endDate = endDate;
    }

    try {
      console.log("Search Params:", queryParams);

      const response = await axios.get("http://localhost:3000/rooms", {
        params: queryParams,
      });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms", error);
    }
  };

  const handleAction = async (room_number: string) => {
    if (role === "customer") {
      try {
        const response = await axios.post("http://localhost:3000/book-room", {
          room_number,
          startDate,
          endDate,
          customer_id: 1,
        });
        console.log("Booking response:", response.data);
        setBookingId(response.data.stay_id);
      } catch (error) {
        console.error("Error booking room:", error);
      }
    } else if (role === "employee" && bookingId) {
      // Convert a booking into renting or process renting directly
      try {
        const response = await axios.post("http://localhost:3000/rent-room", {
          booking_id: bookingId,
          room_number,
          customer_id: 1,
        });
        console.log("Renting response:", response.data);
      } catch (error) {
        console.error("Error renting room:", error);
      }
    }
  };

  return (
    <div className="search-room-container">
      <h3>Search Rooms</h3>

      {/* Role Selection */}

      {/* Room Search Form */}
      <form>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>

      {/* Display Search Results */}
      <div className="rooms-container">
        <h3>Available Rooms</h3>
        {rooms.length > 0 ? (
          <div className="rooms-list">
            {rooms.map((room) => (
              <div className="room-item" key={room.room_number}>
                <div className="room-details">
                  <h4>
                    Room {room.room_number} - ${room.price} - Capacity:{" "}
                    {room.capacity}
                  </h4>
                </div>
                <div className="room-actions">
                  {role === "customer" && (
                    <button
                      className="book-button"
                      onClick={() => handleAction(room.room_number)}
                    >
                      Book
                    </button>
                  )}
                  {role === "employee" && (
                    <button
                      className="rent-button"
                      onClick={() => handleAction(room.room_number)}
                    >
                      Rent
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default SearchRoom;
