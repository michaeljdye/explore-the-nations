import styled, { css } from 'styled-components';

// Declare breakpoint sizes
const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576
};

/**
 * @description Iterate through breakpoints and create media template
 * * Taken from Styled Components documentation:
 * https://www.styled-components.com/docs/advanced#media-templates
 */
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colorGreyLight};
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: 300px 1fr;

  ${media.tablet`grid-template-columns: 1fr;`};
`;

export const MapSection = styled.section`
  height: 100vh;
  margin: 0;
  padding: 0;

  ${media.tablet`height: 60vh; grid-row: 1 / 2;`};
`;

export const GMap = styled.div`
  height: 100%;
`;
