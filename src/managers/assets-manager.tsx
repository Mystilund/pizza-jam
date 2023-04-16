import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { /*audioAssets,*/ CDN_URL, imgAssets } from '../utils/constants';
import { AudioAssetUrl, ImgAssetUrl } from '../utils/types';

type AssetsManagerProps = {
  onSuccess: () => void;
  onError: () => void;
  onProgress: (percentage: number) => void;
};

export const AssetsManager = ({
  onSuccess,
  onError,
  onProgress,
}: AssetsManagerProps) => {
  const progressObj = useRef(
    Object.fromEntries([
      ...imgAssets.map((a) => [a, false]),
      /*...audioAssets.map((a) => [a, false]),*/
    ]) as unknown as Record<ImgAssetUrl | AudioAssetUrl, boolean>
  );

  const onResourceLoaded = () => {
    onProgress(
      Math.round(
        (Object.values(progressObj.current).filter(Boolean).length /
          imgAssets.length /*+ audioAssets.length*/) *
          100
      )
    );
  };

  const loadImage = async (url: ImgAssetUrl) => {
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = (event) => {
        resolve(event);
        progressObj.current[url] = true;
        onResourceLoaded();

        // To keep it loaded in the page and avoid flickering
        const imgNode = document.createElement('img');
        imgNode.src = `${CDN_URL}/images/${url}`;
        document.querySelector('#img-store')?.appendChild(imgNode);
      };
      img.onerror = reject;

      img.src = `${CDN_URL}/images/${url}`;
    });
  };

  /*const loadMusic = async (url: AudioAssetUrl) => {
    const audio = new Audio();

    return new Promise((resolve, reject) => {
      audio.addEventListener(
        'canplay',
        (event) => {
          resolve(event);
          progressObj.current[url] = true;
          onResourceLoaded();
        },
        false
      );
      audio.onerror = reject;

      audio.src = `${CDN_URL}/musics/${url}`;
    });
  };*/

  useEffect(() => {
    Promise.all([
      ...imgAssets.map(loadImage) /*, ...audioAssets.map(loadMusic)*/,
    ])
      .then(onSuccess)
      .catch((err) => {
        console.log(err);
        onError();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Box display="none" id="img-store" />;
};
