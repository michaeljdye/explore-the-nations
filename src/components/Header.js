import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d13e58;
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
