import { Box, Button } from '@chakra-ui/react';

import { useGame } from '../../../../contexts/game-context';
import { PreparationView } from '../../../../scenes/game-loop/preparation';
import { Scene } from '../../../../utils/types';

type PreparationMainViewProps = {
  onChangeView: (view: PreparationView) => void;
};

export const PreparationMainView = ({
  onChangeView,
}: PreparationMainViewProps) => {
  const { goToScene } = useGame();

  const goToGame = () => {
    goToScene(Scene.GAME_LOOP_COOK);
  };

  return (
    <Box>
      <Button onClick={() => onChangeView(PreparationView.RECIPES_VIEW)}>
        Go to recipes
      </Button>
      <Button onClick={() => onChangeView(PreparationView.INGREDIENTS_VIEW)}>
        Go to ingredients
      </Button>
      <Button onClick={goToGame}>Start a new day of work</Button>
    </Box>
  );
};
