import styled from 'styled-components';

export const LocationContent = styled.li`
  background: ${props => props.theme.colorWhite};
  border-bottom: 1px solid ${props => props.theme.colorGreyDark};
  color: ${props => props.theme.colorWhite};
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: ${props => props.theme.colorGreyDark};
  background-position: 0;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    ${props => props.theme.colorPrimary} 50%
  );
  background-size: 250%;
  transition: all 0.4s;

  &:hover,
  &:focus {
    outline: none;
    color: ${props => props.theme.colorWhite}
    cursor: pointer;
    background-position: 100%;
  }

  .location-title,
  .location-address {
    margin: 0;
    padding: 5px;
    border-bottom: 1px dotted ${props => props.theme.colorSecondary}
  }

  .location-title {
    font-weight: 700;
  }
`;
