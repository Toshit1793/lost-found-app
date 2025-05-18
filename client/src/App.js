import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Submit from "./pages/Submit";
import ViewItems from "./pages/ViewItems";
import Login from "./pages/Login";
import SearchByImage from "./pages/SearchByImage"; // new page
// import Register from "./pages/Register"; // optional

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: "1rem" }}>
        <h1>Lost & Found App</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "1rem" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/submit" style={{ marginRight: "1rem" }}>Submit Item</Link>
          <Link to="/items" style={{ marginRight: "1rem" }}>View Items</Link>
          <Link to="/search-image" style={{ marginRight: "1rem" }}>Search by Image</Link>
          <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
          {/* <Link to="/register">Register</Link> */}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/items" element={<ViewItems />} />
          <Route path="/search-image" element={<SearchByImage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
