import React from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import { CardContainer, Card } from './styles';

import { ValueLoader } from '../Loaders';

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface CardProps {
  transactions: number;
  balance: Balance;
}

const InfoCard: React.FC<CardProps> = ({
  transactions,
  balance,
}: CardProps) => {
  return (
    <CardContainer>
      <Card>
        <header>
          <p>Entradas</p>
          <img src={income} alt="Income" />
        </header>
        <h1 data-testid="balance-income">
          {transactions ? balance.income : <ValueLoader />}
        </h1>
      </Card>
      <Card>
        <header>
          <p>Saídas</p>
          <img src={outcome} alt="Outcome" />
        </header>
        <h1 data-testid="balance-outcome">
          {transactions ? balance.outcome : <ValueLoader />}
        </h1>
      </Card>
      <Card total>
        <header>
          <p>Total</p>
          <img src={total} alt="Total" />
        </header>
        <h1 data-testid="balance-total">
          {transactions ? balance.total : <ValueLoader />}
        </h1>
      </Card>
    </CardContainer>
  );
};

export default InfoCard;
