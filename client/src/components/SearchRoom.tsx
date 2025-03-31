import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const SearchRoom = () => {
  const [role, setRole] = useState<string>("customer");
  const [roomCapacity, setRoomCapacity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [city, setCity] = useState<string | "">("");
  const [view, setView] = useState<string | "">("");
  const [startDate, setStartDate] = useState<string | "">("");
  const [endDate, setEndDate] = useState<string | "">("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [customerFormVisible, setCustomerFormVisible] =
    useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    f_name: "",
    m_name: "",
    l_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    code: "",
    registration_date: new Date().toISOString().split("T")[0],
  });

  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string>("");
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

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
    if (city !== "") {
      queryParams.city = city;
    }

    if (view !== "") {
      queryParams.view = view;
    }

    try {
      const response = await axios.get("http://localhost:3000/rooms", {
        params: queryParams,
      });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms", error);
    }
  };

  // Update handleBooking to set room number and hotel ID
  const handleBooking = (room_number: string, hotel_id: number) => {
    if (role === "customer") {
      setSelectedRoomNumber(room_number);
      setSelectedHotelId(hotel_id);
      setCustomerFormVisible(true);
    }
  };

  const handleCustomerFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const customerResponse = await axios.post(
        "http://localhost:3000/hotel_customers",
        {
          ...customerDetails,
        }
      );

      if (customerResponse.status === 201) {
        const stayResponse = await axios.post("http://localhost:3000/stays", {
          start_date: startDate,
          end_date: endDate,
          stay_type: "booking",
          customer_id: customerResponse.data.customer_id,
          room_number: selectedRoomNumber,
          hotel_id: selectedHotelId,
        });

        if (stayResponse.status === 201) {
          setCustomerFormVisible(false);
          setSuccessMessage(
            "Your booking is successful! You will pay upon arrival."
          );
        }
      }
    } catch (error) {
      console.error("Error submitting customer and booking details:", error);
    }
  };

  return (
    <div className="search-room-container">
      <h3>Search Rooms</h3>

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
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <div className="form-group">
          <label>View:</label>
          <input
            type="text"
            value={view || ""}
            onChange={(e) => setView(e.target.value)}
            placeholder="Enter view (e.g., sea, mountain)"
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
                    <ul>
                      <li>Room Number: {room.room_number}</li>
                      <li>Price: ${room.price}</li>
                      <li>Capacity: {room.capacity}</li>
                      <li>View: {room.view}</li>
                      <li>Hotel City: {room.city}</li>
                    </ul>
                  </h4>
                </div>
                <div className="room-actions">
                  {role === "customer" && (
                    <button
                      className="book-button"
                      onClick={() =>
                        handleBooking(room.room_number, room.hotel_id)
                      }
                    >
                      Book
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

      {/* Customer Form for Booking */}
      {customerFormVisible && (
        <div className="customer-form">
          <h4>Customer Details</h4>
          <form onSubmit={handleCustomerFormSubmit}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={customerDetails.f_name}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    f_name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Middle Name (optional):</label>
              <input
                type="text"
                value={customerDetails.m_name}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    m_name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={customerDetails.l_name}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    l_name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Street:</label>
              <input
                type="text"
                value={customerDetails.street}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    street: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                value={customerDetails.city}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    city: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                value={customerDetails.state}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    state: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                value={customerDetails.country}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    country: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate || ""}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate || ""}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Postal Code:</label>
              <input
                type="text"
                value={customerDetails.code}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    code: e.target.value,
                  })
                }
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Display success message */}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SearchRoom;
