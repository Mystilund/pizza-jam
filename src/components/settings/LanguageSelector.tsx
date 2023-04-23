import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { chakra, Flex, GridItem, IconButton, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { translateLanguage } from '../../utils/translators';
import { Language } from '../../utils/types';

type LanguageSelectorProps = {
  value: Language;
  onChange: (lang: Language) => void;
};

const LanguageIconButton = chakra(IconButton, {
  baseStyle: {
    borderColor: 'tomato',
    color: 'tomato',
    _hover: {
      bg: '#ff63474d', // tomato 30%
    },
    _focus: {
      borderColor: 'red.600',
      color: 'red.500',
      outline: 0,
      boxShadow: 'none',
      bg: '#ff63471a', // tomato 10%
    },
    _active: {
      bg: 'tomato',
      color: 'black',
      borderColor: 'red.800',
    },
  },
});

export const LanguageSelector = ({
  value,
  onChange,
}: LanguageSelectorProps) => {
  const { t } = useTranslation();
  const languages = Object.values(Language);
  const langIndex = useRef(languages.findIndex((lang) => lang === value));

  const nextLanguage = () => {
    if (langIndex.current + 1 === languages.length) {
      langIndex.current = 0;
    } else {
      ++langIndex.current;
    }
    onChange(languages[langIndex.current]);
  };

  const previousLanguage = () => {
    if (langIndex.current - 1 === -1) {
      langIndex.current = languages.length - 1;
    } else {
      --langIndex.current;
    }
    onChange(languages[langIndex.current]);
  };

  return (
    <>
      <GridItem>{t('settingsMenu.language')} :</GridItem>
      <GridItem>
        <Flex alignItems="center">
          <LanguageIconButton
            variant="outline"
            icon={<ChevronLeftIcon />}
            aria-label="Previous language"
            onClick={previousLanguage}
          />
          <Text flex={1} textAlign="center">
            {translateLanguage(t, value)}
          </Text>
          <LanguageIconButton
            variant="outline"
            icon={<ChevronRightIcon />}
            aria-label="Next language"
            onClick={nextLanguage}
          />
        </Flex>
      </GridItem>
    </>
  );
};
