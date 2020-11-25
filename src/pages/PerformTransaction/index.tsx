import React, { useEffect, useState, FormEvent } from 'react';
import ReactLoading from 'react-loading';
import { FiArrowDown } from 'react-icons/fi';

import api from '../../services/api';

import Header from '../../components/Header';

import InfoCard from '../../components/InfoCard';

import formatValue from '../../utils/formatValue';

import { Container, Title, Form, Select, Message } from './styles';

interface Balance {
  income: string;
  outcome: string;
  total: string;
  rawIncome: number;
  rawOutcome: number;
  rawTotal: number;
}

interface Transaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

const PerformTransaction: React.FC = () => {
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState<number>();
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('transactions');

      setTransactions(response.data.transactions);

      const balanceData = response.data.balance;

      const balenceFormatted = {
        income: formatValue(balanceData.income),
        outcome: formatValue(balanceData.outcome),
        total: formatValue(balanceData.total),
        rawIncome: balanceData.income,
        rawOutcome: balanceData.outcome,
        rawTotal: balanceData.total,
      };

      setBalance(balenceFormatted);
    }

    loadTransactions();
  }, []);

  function showMessage(content: string): void {
    setMessage(content);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  async function handleTransaction(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!title || !type || !value || !category) {
      showMessage('Verifique se todos os campos estão preenchidos...');
      return;
    }

    if (type === 'outcome' && value > balance.rawTotal) {
      showMessage('Saldo insuficiente.');
      return;
    }

    try {
      setLoading(true);

      const data = {
        title,
        type,
        value,
        category,
      };

      const response = await api.post('transactions', data);

      const transaction = response.data;

      setTransactions([...transactions, transaction]);

      setTitle('');
      setType('');
      setValue(0);
      setCategory('');

      const balenceFormatation = {
        newIncome:
          type === 'income'
            ? balance.rawIncome + transaction.value
            : balance.rawIncome,
        newOutcome:
          type === 'outcome'
            ? balance.rawOutcome + transaction.value
            : balance.rawOutcome,
        newTotal:
          type === 'income'
            ? balance.rawTotal + transaction.value
            : balance.rawTotal - transaction.value,
      };

      const balenceFormatted = {
        income: formatValue(balenceFormatation.newIncome),
        outcome: formatValue(balenceFormatation.newOutcome),
        total: formatValue(balenceFormatation.newTotal),
        rawIncome: balenceFormatation.newIncome,
        rawOutcome: balenceFormatation.newOutcome,
        rawTotal: balenceFormatation.newTotal,
      };

      setBalance(balenceFormatted);

      setLoading(false);

      showMessage('Transação realizada com sucesso!');
    } catch (err) {
      setLoading(false);
      showMessage('Ops! Ocorreu um erro :(');
    }
  }

  return (
    <>
      <Header page="perform-transaction" />

      <Container>
        <InfoCard balance={balance} transactions={transactions} />

        <Title>Realizar uma transação</Title>

        {loading && (
          <ReactLoading
            type="spin"
            color="#4124B3"
            height={46}
            width={46}
            className="spin"
          />
        )}

        {message && <Message>{message}</Message>}

        <Form onSubmit={handleTransaction}>
          <Select>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">
                Clique para selecionar o tipo da transação
              </option>
              <option value="income">Depósito</option>
              <option value="outcome">Retirada</option>
            </select>
            <FiArrowDown size={18} color="#C4C4C4" />
          </Select>

          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Escreva um título para a sua transação"
          />

          <input
            value={value}
            onChange={e => setValue(Number(e.target.value))}
            type="number"
            placeholder="Escreva aqui o valor que deseja movimentar"
          />

          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            type="text"
            placeholder="Escreva a categoria da transação"
          />

          <button type="submit">Realizar transação</button>
        </Form>
      </Container>
    </>
  );
};

export default PerformTransaction;
