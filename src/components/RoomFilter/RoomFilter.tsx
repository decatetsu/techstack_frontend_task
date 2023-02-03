import {Box, Input, Text} from "@chakra-ui/react";

interface Props {
  updateRoomFilter(data: number | null): void;
}

function RoomFilter({updateRoomFilter}: Props) {
  return (
    <Box>
      <Text>Filter rooms: </Text>
      <Input id='room-filter' type='number' min='1' onInput={e => {
        const value = (e.target as HTMLInputElement).value;
        updateRoomFilter(value === '' ? null : +value);
      }}/>
    </Box>
  );
}

export default RoomFilter;
