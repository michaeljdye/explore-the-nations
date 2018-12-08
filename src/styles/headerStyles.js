import styled from 'styled-components';
import { media } from './appStyles';

export const HeaderSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    150deg,
    ${props => props.theme.colorSecondary} 40%,
    ${props => props.theme.colorPrimary} 60%
  );
  height: 60px;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colorWhite};
  font-size: 3.4rem;

  ${media.tablet`font-size: 2.8rem;`};
`;
