// src/services/api.js

// The API Endpoint
const API_URL = "https://backend.jotish.in/backend_dev/gettabledata.php";

// Mock Data Fallback (Used if API fails due to CORS/Network)
const MOCK_DATA = [
  { id: 1, name: "John Doe", city: "New York", salary: 50000, email: "john@example.com" },
  { id: 2, name: "Jane Smith", city: "Los Angeles", salary: 65000, email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", city: "Chicago", salary: 45000, email: "mike@example.com" },
  { id: 4, name: "Emily Davis", city: "Houston", salary: 70000, email: "emily@example.com" },
  { id: 5, name: "Chris Brown", city: "Phoenix", salary: 55000, email: "chris@example.com" },
  { id: 6, name: "Sarah Wilson", city: "New York", salary: 62000, email: "sarah@example.com" },
  { id: 7, name: "David Lee", city: "Chicago", salary: 48000, email: "david@example.com" },
  { id: 8, name: "Laura Miller", city: "Los Angeles", salary: 72000, email: "laura@example.com" },
  { id: 9, name: "James Taylor", city: "Houston", salary: 58000, email: "james@example.com" },
  { id: 10, name: "Anna Anderson", city: "Phoenix", salary: 52000, email: "anna@example.com" },
];

export const fetchTableData = async () => {
  console.log("🔄 Fetching data from API...");
  
  try {
    // 1. Make the POST request
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 2. Send the specific JSON input required
      body: JSON.stringify({
        username: "test",
        password: "123456"
      }),
    });

    // 3. Check if the request was successful
    if (!response.ok) {
      console.warn("⚠️ API returned an error status. Using Mock Data.");
      return MOCK_DATA;
    }

    // 4. Parse the JSON response
    const data = await response.json();
    console.log("✅ Real API Data Fetched:", data);

    // 5. Return the data (handling if it's inside a 'data' key or raw array)
    if (data && (Array.isArray(data) || data.data)) {
      return Array.isArray(data) ? data : data.data;
    } else {
      console.warn("⚠️ API Data format unexpected. Using Mock Data.");
      return MOCK_DATA;
    }

  } catch (error) {
    // This block runs if there is a Network Error or CORS error
    console.error("❌ API Fetch Failed (Network/CORS). Using Mock Data:", error);
    return MOCK_DATA;
  }
};