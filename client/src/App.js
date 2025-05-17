import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Submit from "./pages/Submit";
import ViewItems from "./pages/ViewItems"; // you'll create this

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: "1rem" }}>
        <h1>Lost & Found App</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "1rem" }}>
          <Link to="/submit" style={{ marginRight: "1rem" }}>Submit Item</Link>
          <Link to="/items">View Items</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/submit" element={<Submit />} />
          <Route path="/items" element={<ViewItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
