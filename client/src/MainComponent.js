import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./MainComponent.css";

const MainComponent = () => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllNumbers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Log the request for debugging
      console.log("Attempting to fetch values from server...");
      
      // Try with explicit server URL if needed
      // const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      // const data = await axios.get(`${serverUrl}/api/values/all`);
      
      // Original request with more detailed error handling
      const data = await axios.get("/api/values/all");
      console.log("Response received:", data);
      
      if (data.data && data.data.rows) {
        setValues(data.data.rows.map(row => row.number));
      } else {
        console.warn("Unexpected response format:", data.data);
        setValues([]);
      }
    } catch (err) {
      console.error("Error fetching values:", {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data
      });
      
      setError(`Failed to fetch values: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveNumber = useCallback(
    async event => {
      event.preventDefault();
      
      if (!value.trim()) {
        setError("Please enter a value");
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        console.log("Attempting to save value:", value);
        
        // Try with explicit server URL if needed
        // const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        // await axios.post(`${serverUrl}/api/values`, { value });
        
        // Original request with more detailed error handling
        await axios.post("/api/values", { value });
        console.log("Value saved successfully");
        
        setValue("");
        getAllNumbers();
      } catch (err) {
        console.error("Error saving value:", {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        
        setError(`Failed to save value: ${err.message}`);
      } finally {
        setLoading(false);
      }
    },
    [value, getAllNumbers]
  );

  useEffect(() => {
    getAllNumbers();
  }, [getAllNumbers]);

  return (
    <div>
      <button onClick={getAllNumbers} disabled={loading}>
        {loading ? "Loading..." : "Get all numbers"}
      </button>
      
      {error && (
        <div style={{ color: 'red', margin: '10px 0', padding: '5px', border: '1px solid red' }}>
          {error}
        </div>
      )}
      
      <br />
      <span className="title">Values</span>
      <div className="values">
        {values.length > 0 ? (
          values.map((value, index) => (
            <div className="value" key={index}>{value}</div>
          ))
        ) : (
          <div style={{ fontStyle: 'italic' }}>No values found</div>
        )}
      </div>
      
      <form className="form" onSubmit={saveNumber}>
        <label>Enter your value: </label>
        <input
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
          disabled={loading}
          placeholder="Enter a number"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      
      <div style={{ marginTop: '20px', fontSize: '0.8em', color: loading ? 'blue' : error ? 'red' : 'green' }}>
        API Status: {loading ? 'Loading...' : error ? 'Error' : 'Ready'}
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Troubleshooting</h3>
        <p>If you're seeing API errors, check the following:</p>
        <ul>
          <li>Make sure your API server is running</li>
          <li>Check that the API endpoints (/api/values/all and /api/values) exist</li>
          <li>Verify your Nginx configuration is correctly routing /api requests</li>
          <li>Check browser console for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
};

export default MainComponent;
