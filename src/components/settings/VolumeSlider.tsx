import {
  Box,
  GridItem,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

import { GraphicEqIcon } from '../icons/icons';

type VolumeSliderProps = {
  label: string;
  volume: number;
  onChange: (value: number) => void;
  onChangeEnd?: () => void;
};

export const VolumeSlider = ({
  label,
  volume,
  onChange,
  onChangeEnd,
}: VolumeSliderProps) => {
  return (
    <>
      <GridItem>
        <Text>{label}</Text>
      </GridItem>
      <GridItem>
        <Slider
          defaultValue={volume}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" as={GraphicEqIcon} />
          </SliderThumb>
        </Slider>
      </GridItem>
    </>
  );
};
