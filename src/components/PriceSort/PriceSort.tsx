import {Box, Select, Text} from "@chakra-ui/react";

interface Props {
  updatePriceSort(data: string | null): void;
}

function PriceSort({updatePriceSort}: Props) {

  return (
    <Box>
      <Text>Sort by: </Text>
      <Select id='price-sort' onInput={e => {
        const value = (e.target as HTMLSelectElement).value;
        updatePriceSort(value === 'none' ? null : value);
      }}>
        <option value='none'>None</option>
        <option value='asc'>Price - lowest to highest</option>
        <option value='desc'>Price - highest to lowest</option>
      </Select>
    </Box>

  );
}

export default PriceSort;
