import { CenterBGLoop } from '../components/center-bg-loop';
import { KeyboardSettingsView } from '../components/keyboard-settings-view';
import { useGame } from '../contexts/game-context';

export const KeyboardSettingsScene = () => {
  const { backScene } = useGame();

  return (
    <CenterBGLoop py="20px">
      <KeyboardSettingsView onBack={backScene} />
    </CenterBGLoop>
  );
};
