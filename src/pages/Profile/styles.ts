import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 100 : 40}px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 45px;
  justify-content: center;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 98px;
  margin-bottom: 15px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 5px;
`;
