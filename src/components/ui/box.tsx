import type { BoxProps as ChakraBoxProps } from '@chakra-ui/react';
import {
  AbsoluteCenter,
  Box as ChakraBox,
  Span,
  Spinner,
} from '@chakra-ui/react';
import * as React from 'react';

export interface BoxProps extends ChakraBoxProps {}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  function Box(props, ref) {
    const { children, ...rest } = props;
    return (
      <ChakraBox
        shadow={'sm'}
        w={'full'}
        padding={4}
        rounded={'md'}
        gap={4}
        _dark={{ borderColor: 'yellow', borderWidth: 1 }}
        ref={ref}
        {...rest}
      >
        {children}
      </ChakraBox>
    );
  }
);
