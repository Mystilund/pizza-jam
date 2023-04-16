import { Box, Button, Text } from '@chakra-ui/react';

import { PreparationView } from '../../../../scenes/game-loop/preparation';

type PreparationIngredientsViewProps = {
  onChangeView: (view: PreparationView) => void;
};

export const PreparationIngredientsView = ({
  onChangeView,
}: PreparationIngredientsViewProps) => {
  return (
    <Box>
      <Button onClick={() => onChangeView(PreparationView.MAIN_VIEW)}>
        Back
      </Button>
      <Text>Ingredients</Text>
    </Box>
  );
};
