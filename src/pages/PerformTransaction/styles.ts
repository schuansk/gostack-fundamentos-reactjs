import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  div.spin {
    display: block;
    margin: 0 auto;
    margin-bottom: -46px;
  }
`;

export const Title = styled.h1`
  margin-top: 64px;
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const Message = styled.p`
  max-width: 736px;
  text-align: center;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
  background: #8e71ff;
  font-weight: bold;
  margin-bottom: -44px;
`;

export const Form = styled.form`
  max-width: 736px;
  margin: 0 auto;
  margin-top: 64px;

  align-items: center;

  input {
    width: 100%;
    height: 64px;
    padding: 0px 24px;
    border: none;
    border-radius: 5px;
    margin-top: 16px;

    font-size: 16px;
    color: #363f5f;

    &::placeholder {
      color: #c4c4c4;
    }
  }

  button {
    display: block;
    width: 180px;
    height: 60px;
    margin: 0 auto;
    margin-top: 16px;
    background: #4124b3;
    border: none;
    border-radius: 5px;
    transition: background-color 0.2s;

    color: #fff;
    text-align: center;

    &:hover {
      background: ${shade(0.2, '#4124b3')};
    }
  }
`;

export const Select = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 5px;
  height: 64px;
  padding: 0px 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  select {
    width: 95%;
    border: none;
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    font-size: 16px;
    color: #363f5f;
  }
`;
