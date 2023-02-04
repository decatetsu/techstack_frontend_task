import {Heading, Progress, Stack, useToast, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {fetchApartments} from "../../services/apartmentsApi";
import {Apartment} from "../../models/apartment";
import {ApartmentElement} from "../ApartmentElement";
import {PriceSort} from "../PriceSort";
import {RoomFilter} from "../RoomFilter";
import {UnsuccessfulLoadingToast} from "../Toast/Toast";

interface Props {
  rerenderData: boolean;
  rerender(): void;
}

function AvailableRentList({rerenderData, rerender}: Props) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [priceSort, setPriceSort] = useState<string|null>(null);
  const [roomFilter, setRoomFilter] = useState<number|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  const updatePriceSort = (data: string | null) => setPriceSort(data);
  const updateRoomFilter = (data: number | null) => setRoomFilter(data);

  useEffect(() => {
    fetchApartments(priceSort, roomFilter)
      .then(response => setApartments(response.data))
      .catch(_ => UnsuccessfulLoadingToast(toast, 'Cannot reach server'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [rerenderData, priceSort, roomFilter]);

  return (
    <>
      <Heading as='h2' size='md' color='blackAlpha.800' mt={7} mb={4}>🆓 Available apartments ({apartments.length})</Heading>
      {
        loading ?
          <Progress size='xs' isIndeterminate /> :
          <VStack spacing={3} alignItems='left'>
            <Stack direction={{sm: 'row-reverse', base: 'column'}}>
              <PriceSort updatePriceSort={updatePriceSort} />
              <RoomFilter updateRoomFilter={updateRoomFilter} />
            </Stack>
            {apartments.map(apartment =>
              <ApartmentElement
                key={apartment.id}
                apartment={apartment}
                rerender={rerender}
              />
            )}
          </VStack>
      }
    </>
  );
}

export default AvailableRentList;
