import { Box, Button, Checkbox, Flex, Grid, GridItem } from '@chakra-ui/react';

import { CenterBGLoop } from '../components/center-bg-loop';
import { LanguageSelector } from '../components/settings/LanguageSelector';
import { ResetSave } from '../components/settings/ResetSave';
import { VolumeSlider } from '../components/settings/VolumeSlider';
import { useGame } from '../contexts/game-context';
import { MenuStyle } from '../theme/components/generic-style';
import { PLAY_SOUND_EVENT } from '../utils/constants';
import { AudioAssetUrl, Language, Scene } from '../utils/types';

export const SettingsScene = () => {
  const { goToScene, backScene, configuration, setConfiguration } = useGame();

  const onLanguageChange = (value: Language) =>
    setConfiguration({
      ...configuration,
      language: value,
    });
  const onGlobalVolumeChange = (value: number) =>
    setConfiguration({
      ...configuration,
      globalVolume: value,
    });
  const onMusicVolumeChange = (value: number) =>
    setConfiguration({
      ...configuration,
      musicVolume: value,
    });
  const onSoundVolumeChange = (value: number) =>
    setConfiguration({
      ...configuration,
      soundVolume: value,
    });
  const onMuteToggle = () =>
    setConfiguration({
      ...configuration,
      muted: !configuration.muted,
    });
  const testSound = () => {
    window.dispatchEvent(
      new CustomEvent<{ value: AudioAssetUrl }>(PLAY_SOUND_EVENT, {
        detail: { value: 'test-beep.mp3' },
      })
    );
  };

  return (
    <CenterBGLoop>
      <Box minW="400px" w="50%" maxW="600px" p="40px" {...MenuStyle.menu}>
        <Grid
          templateColumns={'max-content 1fr'}
          rowGap="20px"
          columnGap="40px"
          mb="20px"
        >
          <LanguageSelector
            value={configuration.language}
            onChange={onLanguageChange}
          />
          <VolumeSlider
            label="General volume"
            volume={configuration.globalVolume}
            onChange={onGlobalVolumeChange}
          />
          <VolumeSlider
            label="Music volume"
            volume={configuration.musicVolume}
            onChange={onMusicVolumeChange}
          />
          <VolumeSlider
            label="Sound volume"
            volume={configuration.soundVolume}
            onChange={onSoundVolumeChange}
            onChangeEnd={testSound}
          />
          <GridItem></GridItem>
          <GridItem>
            <Checkbox
              colorScheme="orange"
              isChecked={configuration.muted}
              onChange={onMuteToggle}
            >
              Mute
            </Checkbox>
          </GridItem>
          <ResetSave />
        </Grid>
        <Flex gap="40px">
          <Button
            variant="menu"
            flex={1}
            onClick={() => goToScene(Scene.KEYBOARD_SETTINGS)}
          >
            Keyboard settings
          </Button>
          <Button variant="menu" flex={1} onClick={backScene}>
            Back
          </Button>
        </Flex>
      </Box>
    </CenterBGLoop>
  );
};
