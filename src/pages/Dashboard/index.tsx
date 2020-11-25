import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { TableLoader } from '../../components/Loaders';

import InfoCard from '../../components/InfoCard';

import formatValue from '../../utils/formatValue';

import { Container, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('transactions');

      const transactionsFormatted = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue:
            transaction.type === 'outcome'
              ? formatValue(transaction.value * -1)
              : formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );

      const balanceData = response.data.balance;

      const balenceFormatted = {
        income: formatValue(balanceData.income),
        outcome: formatValue(balanceData.outcome),
        total: formatValue(balanceData.total),
      };

      setTransactions(transactionsFormatted);
      setBalance(balenceFormatted);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header page="listing" />
      <Container>
        <InfoCard balance={balance} transactions={transactions} />

        {transactions.length ? (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.formattedValue}
                    </td>
                    <td>{transaction.category.title}</td>
                    <td>{transaction.formattedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        ) : (
          <TableLoader />
        )}
      </Container>
    </>
  );
};

export default Dashboard;
