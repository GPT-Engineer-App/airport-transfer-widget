import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, HStack, Button } from "@chakra-ui/react";
import BookingForm from "./pages/BookingForm.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
  return (
    <Router>
      <Container maxW="container.xl" py={8}>
        <HStack spacing={8} justifyContent="center">
          <Link to="/">
            <Button>Booking</Button>
          </Link>
          <Link to="/admin">
            <Button>Admin</Button>
          </Link>
        </HStack>
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
