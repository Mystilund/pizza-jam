import { Box, Button, Checkbox, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGame } from '../contexts/game-context';
import { MenuStyle } from '../theme/components/generic-style';
import { PLAY_SOUND_EVENT } from '../utils/constants';
import { AudioAssetUrl, Language } from '../utils/types';
import { LanguageSelector } from './settings/LanguageSelector';
import { ResetSave } from './settings/ResetSave';
import { VolumeSlider } from './settings/VolumeSlider';

type SettingsViewProps = {
  onBack: VoidFunction;
  onKeyboardMenu: VoidFunction;
  withReset?: boolean;
};

export const SettingsView = ({
  onBack,
  onKeyboardMenu,
  withReset = false,
}: SettingsViewProps) => {
  const { configuration, setConfiguration } = useGame();
  const { t, i18n } = useTranslation();

  const onLanguageChange = (value: Language) => {
    i18n.changeLanguage(value);
    setConfiguration({
      ...configuration,
      language: value,
    });
  };
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
    <Box minW="400px" w="50%" maxW="600px" p="40px" {...MenuStyle.menu}>
      <Grid
        templateColumns="max-content 1fr"
        rowGap="20px"
        columnGap="40px"
        mb="20px"
      >
        <LanguageSelector
          value={configuration.language}
          onChange={onLanguageChange}
        />
        <VolumeSlider
          label={t('settingsMenu.generalVolume', {
            percentage: configuration.globalVolume,
          })}
          volume={configuration.globalVolume}
          onChange={onGlobalVolumeChange}
        />
        <VolumeSlider
          label={t('settingsMenu.musicVolume', {
            percentage: configuration.musicVolume,
          })}
          volume={configuration.musicVolume}
          onChange={onMusicVolumeChange}
        />
        <VolumeSlider
          label={t('settingsMenu.soundVolume', {
            percentage: configuration.soundVolume,
          })}
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
            {t('settingsMenu.mute')}
          </Checkbox>
        </GridItem>
        {withReset && <ResetSave />}
      </Grid>
      <Flex gap="40px">
        <Button variant="menu" flex={1} onClick={onKeyboardMenu}>
          {t('settingsMenu.keyboardButton')}
        </Button>
        <Button variant="menu" flex={1} onClick={onBack}>
          {t('back')}
        </Button>
      </Flex>
    </Box>
  );
};
