import Layout from "./components/Layout";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import HotelDetails from "./pages/HotelDetails";
import "./App.css";
import { createContext, useContext, useState } from "react";
import NotFound from "./pages/NotFound";

// Create a context for the toast
const ToastContext = createContext();

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to show a toast
  const showToast = (message, type = "info") => {
    const id = Date.now(); // Unique ID for the toast
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-5 right-1/2 translate-x-1/2 space-y-4 z-50 ">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-5 py-2 rounded shadow-lg text-white text-sm ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => useContext(ToastContext);

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hoteldetails/:hotelId" element={<HotelDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
