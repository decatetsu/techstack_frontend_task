import React, {useState} from 'react';
import {Container, Heading} from "@chakra-ui/react";
import {CreateBlock} from "../CreateBlock";
import {AvailableRentList} from "../AvailableRentList";

function App() {
  const [rerenderData, setRerenderData] = useState<boolean>(false);

  const rerender = () => setRerenderData(!rerenderData);

  return (
    <Container maxW='5xl' py={10}>
      <Heading as='h1' color='blackAlpha.800'>Apartments Marketplace</Heading>
      <CreateBlock rerender={rerender}/>
      <AvailableRentList rerenderData={rerenderData} rerender={rerender}/>
    </Container>
  );
}

export default App;
