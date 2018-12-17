import styled from 'styled-components';
import { media } from './appStyles';

export const HeaderSection = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    150deg,
    ${props => props.theme.colorSecondary} 40%,
    ${props => props.theme.colorPrimary} 60%
  );
  height: 7rem;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colorWhite};

  ${media.tablet`font-size: 2.8rem;`};
`;
