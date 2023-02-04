import {Apartment} from "../../models/apartment";
import {
  Box, Button,
  Card, CardBody, CardFooter, Center,
  Heading, Stack,
  Tag, Text, useToast,
} from "@chakra-ui/react";
import {deleteApartment} from "../../services/apartmentsApi";
import {SuccessfulDeleteToast} from "../Toast";
import {UnsuccessfulDeleteToast} from "../Toast";

interface Props {
  apartment: Apartment;
  rerender(): void;
}

function ApartmentElement({apartment, rerender}: Props) {
  const toast = useToast();

  const onApartmentDelete = () => {
    deleteApartment(apartment.id)
      .then(response => {
        if (response.data) {
          SuccessfulDeleteToast(toast);
          rerender();
        } else {
          UnsuccessfulDeleteToast(toast, 'Requested apartment does not exist');
        }
      })
      .catch(error => UnsuccessfulDeleteToast(toast, error.response.data.message));
  }

  return (
    <Card
      direction='column'
      borderColor='gray.300'
      borderWidth={1}
      borderRadius={5}
      bg='gray.100'
      w='100%'
    >
      <Stack direction={{sm: 'row', base: 'column'}}>
        <CardBody>
          <Heading size='sm' mb={3}>{apartment.name}</Heading>
          <Text>{apartment.description}</Text>
          <Stack direction='row' mt={2}>
            <Box><Tag colorScheme='blue'>Rooms</Tag> {apartment.rooms}</Box>
            <Box><Tag colorScheme='blue'>Price</Tag> ${apartment.price}</Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Center w='100%'>
            <Button
              colorScheme='red'
              w={{sm: 150, base: '100%'}}
              onClick={onApartmentDelete}
            >Delete</Button>
          </Center>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default ApartmentElement;
