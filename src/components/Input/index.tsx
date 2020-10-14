import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface TextInput extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  // apesar de ser uma ref de TextInput, o intuito da interface é usar apenas oq vc vai precisar
  focus(): void;
}

const Input: React.RefForwardingComponent/* quando vc recebe uma ref */ <
  InputRef /* tipo da ref */,
  TextInput
> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null); // ligado ao elemento input

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue }); // ligado ao valor

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  // passando do filho pro pai
  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }) /* função q retorna quais informações quero injetar pra dentro da minha ref */,
  );

  useEffect(() => {
    registerField<string>(
      /* o valor que armazena é uma string */ {
        name: fieldName,
        ref: inputValueRef.current,
        path:
          'value' /*
        setValue(ref: any, value) {
          inputValueRef.current.value = value;
          inputElementRef.current.setNativeProps({ text: value }); // responsavel por alterar visulamente o input
        },
        clearValue() {
          inputValueRef.current.value = '';
          inputElementRef.current.clear(); // .setNativeProps({text:''})
        }, */,
      },
    );
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        {...rest}
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
      />
    </Container>
  );
};

export default forwardRef(Input);
