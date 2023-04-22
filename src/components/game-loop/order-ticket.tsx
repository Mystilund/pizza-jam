import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import { ReactNode } from 'react';

type OrderTicketProps = {
  title: string;
  onClose?: VoidFunction;
  children: ReactNode;
};

export const OrderTicket = ({ title, onClose, children }: OrderTicketProps) => {
  return (
    <Box
      bg="repeating-linear-gradient(transparent 0px, transparent 24px, teal 25px)"
      fontFamily="'Pacifico', cursive"
      pl="20px"
      pb="20px"
      position="relative"
      _before={{
        content: '""',
        width: '2px',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: '15px',
        backgroundColor: 'rgba(255,0,0,0.6)',
      }}
    >
      <Heading fontSize="1.8em" lineHeight="25px">
        {title}
      </Heading>
      {children}
      {onClose && (
        <IconButton
          position="absolute"
          colorScheme="teal"
          top="-15px"
          right={0}
          icon={<CloseIcon />}
          onClick={onClose}
          aria-label="Close"
        />
      )}
    </Box>
  );
};
