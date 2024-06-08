import React, { useState } from "react";
import { Container, VStack, Input, Button, FormControl, FormLabel, Select, useToast, HStack } from "@chakra-ui/react";
import { FaPlane, FaCalendarAlt, FaUser, FaEnvelope, FaMoneyBillWave, FaClock, FaSuitcase, FaInfoCircle } from "react-icons/fa";
import emailjs from "emailjs-com";

const airports = [
  { id: 1, name: "Heathrow", price: 50 },
  { id: 2, name: "Gatwick", price: 45 },
  { id: 3, name: "Manchester", price: 40 },
];

const BookingForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", date: "", airport: "", price: 0, flightDetails: "", pickUpTime: "", luggageQuantity: "" });
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
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          ...formData,
          airport: formData.airport,
          price: formData.price,
          flightDetails: formData.flightDetails,
          pickUpTime: formData.pickUpTime,
          luggageQuantity: formData.luggageQuantity,
        },
        "YOUR_USER_ID",
      )
      .then(
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
        <FormControl id="flightDetails" isRequired>
          <FormLabel>
            <FaInfoCircle /> Flight Details
          </FormLabel>
          <Input type="text" name="flightDetails" value={formData.flightDetails} onChange={handleChange} />
        </FormControl>
        <FormControl id="pickUpTime" isRequired>
          <FormLabel>
            <FaClock /> Pick-Up Time
          </FormLabel>
          <Input type="time" name="pickUpTime" value={formData.pickUpTime} onChange={handleChange} />
        </FormControl>
        <FormControl id="luggageQuantity" isRequired>
          <FormLabel>
            <FaSuitcase /> Quantity of Luggage
          </FormLabel>
          <Input type="number" name="luggageQuantity" value={formData.luggageQuantity} onChange={handleChange} />
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

export default BookingForm;
