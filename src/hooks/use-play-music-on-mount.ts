import { useEffect } from 'react';

import { PLAY_MUSIC_EVENT } from '../utils/constants';
import { AudioAssetUrl } from '../utils/types';

export const usePlayMusicOnMount = (
  music: AudioAssetUrl,
  options: {
    enabled: boolean;
    loop: boolean;
  } = { enabled: true, loop: true }
) => {
  useEffect(() => {
    if (!options.enabled) {
      return;
    }

    const updateEvent = new CustomEvent<{
      value: AudioAssetUrl;
      loop?: boolean;
    }>(PLAY_MUSIC_EVENT, {
      detail: { value: music, loop: options.loop },
    });

    window.dispatchEvent(updateEvent);
  }, [music, options]);
};
