import styled from 'styled-components';

export const SearchSection = styled.section`
  padding: 20px;
  background-color: #fff;
  text-align: center;
  border-top: 1px solid ${props => props.theme.colorGreyDark};
  border-bottom: 1px solid ${props => props.theme.colorGreyDark};

  & div {
    position: relative;
  }

  & label {
    opacity: 0;
    cursor: text;
    font-weight: 300;
    position: absolute;
    top: 20%;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%);
    transition: all 0.2s;
  }
`;

export const Input = styled.input`
  border: none;
  border-radius: 1000px;
  height: 3.2rem;
  font-size: 1.6rem;
  text-align: center;
  box-shadow: 0 1px 1px #00000026;
  background-color: ${props => props.theme.colorGreyLight};
  width: 80%;
  transition: all 0.2s;

  &:focus {
    outline: none;
    width: 100%;
  }
`;

export const SubmitBtn = styled.button`
  border: none;
  border-radius: 3px;
  background: ${props => props.theme.colorPrimary};
  margin: 1.5rem 0 0 0;
  padding: 0.6rem 1.4rem;
  color: ${props => props.theme.colorWhite};
  font-size: 1.4rem;
  font-weight: 700;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;
