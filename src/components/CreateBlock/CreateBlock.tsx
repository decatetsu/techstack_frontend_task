import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input, Stack, Text,
  Textarea, useToast
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {createApartment} from "../../services/apartmentsApi";
import {useState} from "react";
import {SuccessfulCreateToast, UnsuccessfulCreateToast} from "../Toast/Toast";

interface Props {
  rerender(): void;
}

function CreateBlock({rerender}: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [rooms, setRooms] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const onSubmit = () => {
    createApartment({
      name: name,
      price: +price,
      rooms: +rooms,
      description: description,
    })
      .then(response => {
        if (response.data) {
          SuccessfulCreateToast(toast);
          rerender();
        } else {
          UnsuccessfulCreateToast(toast, 'Unknown serverside error happened');
        }
      })
      .catch(error => {
        UnsuccessfulCreateToast(toast, error.response.data.message);
      });
  };

  return (
    <>
      <Heading as='h2' size='md' color='blackAlpha.800' mt={7}>⚒️ Make a new apartment</Heading>
      <Box
        borderColor='gray.300'
        borderWidth={1}
        borderRadius={5}
        bg='gray.200'
        my={4}
        p={5}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!(errors.name || errors.rooms || errors.price || errors.description)}>
            <Stack
              direction='column'
              spacing={4}
              w='100%'
            >
              <Box>
                <FormLabel htmlFor='name'>Name:</FormLabel>
                <Input
                  id='name'
                  type='text'
                  value={name}
                  onInput={e => setName((e.target as HTMLInputElement).value)}
                  placeholder='Ex. Common apartment'
                  bg='whiteAlpha.800'
                  isInvalid={errors.name !== undefined}
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {value: 1, message: 'Name can’t be empty'},
                    maxLength: {value: 98, message: 'Maximum length of name should be 99'},
                  })}
                />
                {errors.name && <Text color='red'>{errors.name.message as string}</Text>}
              </Box>
              <Stack direction='row' w='100%'>
                <Box w='50%'>
                  <FormLabel htmlFor='price'>Price:</FormLabel>
                  <Input
                    id='price'
                    type='number'
                    placeholder='Ex. 99'
                    value={price}
                    onInput={e => setPrice((e.target as HTMLInputElement).value)}
                    bg='whiteAlpha.800'
                    isInvalid={errors.price !== undefined}
                    {...register('price', {
                      required: 'Price is required',
                      min: {value: 1, message: 'Price should be at least 1'},
                    })}
                  />
                  {errors.price && <Text color='red'>{errors.price.message as string}</Text>}
                </Box>
                <Box w='50%'>
                  <FormLabel htmlFor='rooms'>Rooms:</FormLabel>
                  <Input
                    id='rooms'
                    type='number'
                    placeholder='Ex. 2'
                    value={rooms}
                    onInput={e => setRooms((e.target as HTMLInputElement).value)}
                    bg='whiteAlpha.800'
                    isInvalid={errors.price !== undefined}
                    {...register('rooms', {
                      required: 'Rooms is required',
                      min: {value: 1, message: 'Rooms should be at least 1'},
                    })}
                  />
                  {errors.rooms && <Text color='red'>{errors.rooms.message as string}</Text>}
                </Box>
              </Stack>
              <Box w='100%'>
                <FormLabel htmlFor='description'>Description:</FormLabel>
                <Textarea
                  id='description'
                  placeholder='Describe your apartment...'
                  value={description}
                  onInput={e => setDescription((e.target as HTMLInputElement).value)}
                  bg='whiteAlpha.800'
                  isInvalid={errors.description !== undefined}
                  {...register('description', {
                    maxLength: { value: 998, message: 'Maximum length of description should be 998'},
                  })}
                />
                {errors.description && <Text color='red'>{errors.description.message as string}</Text>}
              </Box>
            </Stack>
          </FormControl>
          <Center>
            <Button mt={5} w={300} colorScheme='green' type='submit' isLoading={isSubmitting}>Submit</Button>
          </Center>
        </form>
      </Box>
    </>
  );
}

export default CreateBlock;
