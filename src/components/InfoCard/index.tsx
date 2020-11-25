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

interface PerformTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface DashboardTransaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface CardProps {
  transactions: PerformTransaction[] | DashboardTransaction[];
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
          {transactions.length ? balance.income : <ValueLoader />}
        </h1>
      </Card>
      <Card>
        <header>
          <p>Saídas</p>
          <img src={outcome} alt="Outcome" />
        </header>
        <h1 data-testid="balance-outcome">
          {transactions.length ? balance.outcome : <ValueLoader />}
        </h1>
      </Card>
      <Card total>
        <header>
          <p>Total</p>
          <img src={total} alt="Total" />
        </header>
        <h1 data-testid="balance-total">
          {transactions.length ? balance.total : <ValueLoader />}
        </h1>
      </Card>
    </CardContainer>
  );
};

export default InfoCard;
