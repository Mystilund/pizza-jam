import { CookProvider } from '../contexts/cook-context';
import { useGame } from '../contexts/game-context';
import { GameLoopProvider } from '../contexts/game-loop-context';
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
  }

  return (
    <GameLoopProvider>
      {activeScene === Scene.GAME_LOOP_PREPARATION && (
        <GameLoopPreparationScene />
      )}
      {activeScene === Scene.GAME_LOOP_COOK && (
        <CookProvider>
          <GameLoopCookScene />
        </CookProvider>
      )}
      {activeScene === Scene.GAME_LOOP_SUMMARY && <GameLoopSummaryScene />}
    </GameLoopProvider>
  );
};
