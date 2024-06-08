import React, { useState } from "react";
import { Container, VStack, Input, Button, FormControl, FormLabel, Select, Text, useToast } from "@chakra-ui/react";

const airports = [
  { id: 1, name: "Heathrow", price: 50 },
  { id: 2, name: "Gatwick", price: 45 },
  { id: 3, name: "Manchester", price: 40 },
];

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

export default AdminPage;
