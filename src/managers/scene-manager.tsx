import { useGame } from '../contexts/game-context';
import { GameLoopCookScene } from '../scenes/game-loop/cook';
import { GameLoopPreparationScene } from '../scenes/game-loop/preparation';
import { GameLoopSummaryScene } from '../scenes/game-loop/summary';
import { KeyboardSettingsScene } from '../scenes/keyboard-settings';
import { MainMenuScene } from '../scenes/main-menu';
import { SettingsScene } from '../scenes/settings';
import { Scene } from '../utils/types';

export const SceneManager = () => {
  const { activeScene } = useGame();

  switch (activeScene) {
    case Scene.MAIN_MENU:
      return <MainMenuScene />;
    case Scene.SETTINGS:
      return <SettingsScene />;
    case Scene.KEYBOARD_SETTINGS:
      return <KeyboardSettingsScene />;
    case Scene.GAME_LOOP_PREPARATION:
      return <GameLoopPreparationScene />;
    case Scene.GAME_LOOP_COOK:
      return <GameLoopCookScene />;
    case Scene.GAME_LOOP_SUMMARY:
      return <GameLoopSummaryScene />;
    default:
      return null;
  }
};
