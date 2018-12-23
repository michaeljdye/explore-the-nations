import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme.colorGreyDark};
  color: ${props => props.theme.colorWhite};
`;
