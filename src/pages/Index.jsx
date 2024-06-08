import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, VStack, HStack, Input, Button, FormControl, FormLabel, Select, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaPlane, FaCalendarAlt, FaUser, FaEnvelope, FaMoneyBillWave } from "react-icons/fa";
import emailjs from "emailjs-com";

const airports = [
  { id: 1, name: "Heathrow", price: 50 },
  { id: 2, name: "Gatwick", price: 45 },
  { id: 3, name: "Manchester", price: 40 },
];

const BookingForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", date: "", airport: "", price: 0 });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAirportChange = (e) => {
    const selectedAirport = airports.find((airport) => airport.id === parseInt(e.target.value));
    setFormData({ ...formData, airport: selectedAirport.name, price: selectedAirport.price });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID").then(
      (result) => {
        toast({
          title: "Booking Successful",
          description: "Your booking has been sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      (error) => {
        toast({
          title: "Booking Failed",
          description: "There was an error sending your booking.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    );
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>
            <FaUser /> Name
          </FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>
            <FaEnvelope /> Email
          </FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>
            <FaCalendarAlt /> Date
          </FormLabel>
          <Input type="date" name="date" value={formData.date} onChange={handleChange} />
        </FormControl>
        <FormControl id="airport" isRequired>
          <FormLabel>
            <FaPlane /> Airport
          </FormLabel>
          <Select name="airport" value={formData.airport} onChange={handleAirportChange}>
            <option value="">Select Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="price">
          <FormLabel>
            <FaMoneyBillWave /> Price
          </FormLabel>
          <Input type="text" name="price" value={formData.price} readOnly />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg">
          Book Now
        </Button>
      </VStack>
    </Container>
  );
};

const AdminPage = () => {
  const [airportPrices, setAirportPrices] = useState(airports);
  const [newPrice, setNewPrice] = useState({ id: "", price: "" });
  const toast = useToast();

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setNewPrice({ ...newPrice, [name]: value });
  };

  const handleUpdatePrice = () => {
    const updatedAirports = airportPrices.map((airport) => (airport.id === parseInt(newPrice.id) ? { ...airport, price: parseInt(newPrice.price) } : airport));
    setAirportPrices(updatedAirports);
    toast({
      title: "Price Updated",
      description: "The airport price has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Admin Page</Text>
        <FormControl id="airport" isRequired>
          <FormLabel>Select Airport</FormLabel>
          <Select name="id" value={newPrice.id} onChange={handlePriceChange}>
            <option value="">Select Airport</option>
            {airportPrices.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="price" isRequired>
          <FormLabel>New Price</FormLabel>
          <Input type="number" name="price" value={newPrice.price} onChange={handlePriceChange} />
        </FormControl>
        <Button onClick={handleUpdatePrice} colorScheme="blue" size="lg">
          Update Price
        </Button>
      </VStack>
    </Container>
  );
};

const App = () => {
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
};

export default App;
