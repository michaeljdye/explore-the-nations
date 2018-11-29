import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(150deg, #819ff9 40%, #9b63f8 60%);
  height: 60px;
`;

const Title = styled.h1`
  color: #fff;
`;

export default () => {
  return (
    <Wrapper>
      <Title>Explore The Nations</Title>
    </Wrapper>
  );
};
