import { useEffect } from 'react';

import { PLAY_MUSIC_EVENT } from '../utils/constants';
import { AudioAssetUrl } from '../utils/types';

export const usePlayMusicOnMount = (music: AudioAssetUrl) => {
  useEffect(() => {
    const updateEvent = new CustomEvent<{ value: AudioAssetUrl }>(
      PLAY_MUSIC_EVENT,
      {
        detail: { value: music },
      }
    );

    window.dispatchEvent(updateEvent);
  }, [music]);
};
