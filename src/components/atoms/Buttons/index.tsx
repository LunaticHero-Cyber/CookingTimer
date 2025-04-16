import React from 'react';
import {TouchableOpacityProps, TouchableOpacity} from 'react-native';
import {styles} from './style';

export interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const {children, style, ...rest} = props;

  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
