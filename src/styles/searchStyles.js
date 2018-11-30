import styled from 'styled-components';

export const SearchSection = styled.div`
  padding: 20px;
  background-color: #fff;
  text-align: center;
  border-top: 1px solid ${props => props.theme.colorGreyDark};
  border-bottom: 1px solid ${props => props.theme.colorGreyDark};
`;

export const Input = styled.input`
  border: none;
  border-radius: 1000px;
  width: 60%;
  height: 3.2rem;
  font-size: 1.6rem;
  text-align: center;
  background-color: ${props => props.theme.colorGreyLight};
  width: 80%;
  transition: all 0.2s;

  &:focus {
    outline: none;
    width: 100%;
  }
`;
