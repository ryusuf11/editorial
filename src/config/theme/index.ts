import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  sizes: {
    '4xs': '12rem',
    '5xs': '10rem',
    '6xs': '8rem',
  },
  fontStyle: {},
  colors: {},
  styles: {
    global: () => ({
      // button: {
      //   _hover: {
      //     bg: 'transparent',
      //   },
      // },
    }),
  },
});

export { theme };
