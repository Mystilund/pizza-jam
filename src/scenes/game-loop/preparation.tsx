import { useCallback, useState } from 'react';

import { PreparationIngredientsView } from '../../components/game-loop/preparation/views/ingredients-view';
import { PreparationMainView } from '../../components/game-loop/preparation/views/main-view';
import { PreparationRecipesView } from '../../components/game-loop/preparation/views/recipes-view';
import { usePlayMusicOnMount } from '../../hooks/use-play-music-on-mount';

export enum PreparationView {
  MAIN_VIEW,
  RECIPES_VIEW,
  INGREDIENTS_VIEW,
}

export const GameLoopPreparationScene = () => {
  const [currentView, setCurrentView] = useState(PreparationView.MAIN_VIEW);

  usePlayMusicOnMount('funiculi-funicula.mp3');

  const changeView = useCallback((view: PreparationView) => {
    setCurrentView(view);
  }, []);

  switch (currentView) {
    case PreparationView.INGREDIENTS_VIEW:
      return <PreparationIngredientsView onChangeView={changeView} />;
    case PreparationView.RECIPES_VIEW:
      return <PreparationRecipesView onChangeView={changeView} />;
    default:
      return <PreparationMainView onChangeView={changeView} />;
  }
};
