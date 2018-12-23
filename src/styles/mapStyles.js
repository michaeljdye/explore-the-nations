import styled from 'styled-components';
import { media } from './appStyles';

export const GMap = styled.div`
  height: 100%;
`;

export const MapSection = styled.section`
  height: 85rem;
  margin: 0;
  padding: 0;

  ${media.tablet`height: 60vh; grid-row: 1 / 2;`};
`;

export const MapErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15.625rem;
`;
