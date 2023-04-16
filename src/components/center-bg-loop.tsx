import { Center } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { CDN_URL } from '../utils/constants';

export const CenterBGLoop = styled(Center)`
  width: 100%;
  height: 100%;
  background: url('${CDN_URL}/images/menu-bg.jpg') repeat 0 0;
  animation: bg-scrolling 5s infinite;
  animation-timing-function: linear;

  @keyframes bg-scrolling {
    100% {
      background-position: -500px 500px;
    }
  }
`;
