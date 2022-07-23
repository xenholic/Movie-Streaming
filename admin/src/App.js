import AddAdminPage from "./pages/AddAdminPage";
import HomePage from "./pages/HomePage";
import GenrePage from "./pages/GenrePage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRoute2 from "./components/ProtectedRoute2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          // ProtectedRoute2 untuk mencegah admin yang sudah login mengakses halaman login
          element={
            <ProtectedRoute2>
              <LoginPage />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/genres"
          element={
            <ProtectedRoute>
              <GenrePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addAdmin"
          element={
            <ProtectedRoute>
              <AddAdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;