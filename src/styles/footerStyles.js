import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  display: flex;
  grid-column: 1 / -1;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme.colorGreyDark};
  color: ${props => props.theme.colorWhite};
  text-align: center;
`;
