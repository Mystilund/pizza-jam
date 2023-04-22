import { Box } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useGame } from '../contexts/game-context';
import {
  audioAssets,
  CDN_URL,
  PAUSE_MUSIC_EVENT,
  PLAY_MUSIC_EVENT,
  PLAY_SOUND_EVENT,
  RESUME_MUSIC_EVENT,
  STOP_MUSIC_EVENT,
} from '../utils/constants';
import { AudioAssetUrl } from '../utils/types';

export const AudioManager = () => {
  const { configuration } = useGame();
  const [musicLoaded, setMusicLoaded] = useState<AudioAssetUrl | null>(null);
  const soundTrackIndex = useRef(0);
  const musicRef = useRef<HTMLAudioElement>(null);
  const soundTrack1Ref = useRef<HTMLAudioElement>(null);
  const soundTrack2Ref = useRef<HTMLAudioElement>(null);
  const soundTrack3Ref = useRef<HTMLAudioElement>(null);

  const sounds = useMemo(
    () => [soundTrack1Ref, soundTrack2Ref, soundTrack3Ref],
    []
  );

  useLayoutEffect(() => {
    if (
      musicRef.current &&
      (musicRef.current.paused ||
        !musicRef.current.currentTime ||
        musicRef.current.ended)
    ) {
      musicRef.current.play();
    }
  }, [musicLoaded]);

  useEffect(() => {
    const playMusic = (event: Event) => {
      if (isCustomMusicEvent(event)) {
        setMusicLoaded(event.detail.value);
        if (typeof event.detail.loop !== 'undefined' && musicRef.current) {
          musicRef.current.loop = event.detail.loop;
        }
      }
    };

    const playSound = (event: Event) => {
      if (isCustomMusicEvent(event)) {
        const index = soundTrackIndex.current;

        soundTrackIndex.current = index + 1 === sounds.length ? 0 : index + 1;
        const element = sounds[index].current;

        if (element) {
          element.pause();
          element.currentTime = 0;
          element.src = `${CDN_URL}/musics/${event.detail.value}`;
          element.play();
        }
      }
    };

    const stopMusic = () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    };

    const resumeMusic = () => {
      if (musicRef.current) {
        musicRef.current.play();
      }
    };

    const pauseMusic = () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };

    window.addEventListener(PLAY_MUSIC_EVENT, playMusic);
    window.addEventListener(PAUSE_MUSIC_EVENT, pauseMusic);
    window.addEventListener(RESUME_MUSIC_EVENT, resumeMusic);
    window.addEventListener(STOP_MUSIC_EVENT, stopMusic);
    window.addEventListener(PLAY_SOUND_EVENT, playSound);

    return () => {
      window.removeEventListener(PLAY_MUSIC_EVENT, playMusic);
      window.removeEventListener(PAUSE_MUSIC_EVENT, pauseMusic);
      window.removeEventListener(RESUME_MUSIC_EVENT, resumeMusic);
      window.removeEventListener(STOP_MUSIC_EVENT, stopMusic);
      window.removeEventListener(PLAY_SOUND_EVENT, playSound);
    };
  }, [sounds]);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = computedVolume(
        configuration.globalVolume,
        configuration.musicVolume
      );
    }

    sounds.forEach((soundTrack) => {
      if (soundTrack.current) {
        soundTrack.current.volume = computedVolume(
          configuration.globalVolume,
          configuration.soundVolume
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration]);

  return (
    <Box>
      <audio
        ref={musicRef}
        src={`${CDN_URL}/musics/${musicLoaded}`}
        autoPlay
        loop
        muted={configuration.muted}
      />
      <audio ref={soundTrack1Ref} muted={configuration.muted} />
      <audio ref={soundTrack2Ref} muted={configuration.muted} />
      <audio ref={soundTrack3Ref} muted={configuration.muted} />
    </Box>
  );
};

/* ----- */

function isCustomMusicEvent(
  e: Event
): e is CustomEvent<{ value: AudioAssetUrl; loop?: boolean }> {
  return !!(
    'detail' in e &&
    e.detail &&
    typeof e.detail === 'object' &&
    'value' in e.detail &&
    typeof e.detail.value === 'string' &&
    audioAssets.includes(e.detail.value as AudioAssetUrl)
  );
}

function computedVolume(globalVolume: number, musicVolume: number) {
  return (globalVolume / 100) * (musicVolume / 100);
}
