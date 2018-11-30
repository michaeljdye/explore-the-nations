import styled from 'styled-components';

export const LocationsSection = styled.section`
  background: ${props => props.theme.colorWhite};
  border-bottom: 1px solid ${props => props.theme.colorGreyDark};
  color: ${props => props.theme.colorWhite};
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: ${props => props.theme.colorGreyDark};

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colorGreyLight};
  }

  .location-title,
  .location-address {
    font-size: 1.6rem;
    margin: 0;
    padding: 5px;
  }

  .location-title {
    font-weight: 700;
  }
`;
