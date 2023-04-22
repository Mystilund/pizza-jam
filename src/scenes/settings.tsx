import { CenterBGLoop } from '../components/center-bg-loop';
import { SettingsView } from '../components/settings-view';
import { useGame } from '../contexts/game-context';
import { Scene } from '../utils/types';

export const SettingsScene = () => {
  const { goToScene, backScene } = useGame();

  return (
    <CenterBGLoop>
      <SettingsView
        onBack={backScene}
        onKeyboardMenu={() => goToScene(Scene.KEYBOARD_SETTINGS)}
      />
    </CenterBGLoop>
  );
};
