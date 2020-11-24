import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  page: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  page,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to="/" className={page === 'listing' ? 'selected' : ''}>
          Listagem
        </Link>
        <Link to="/import" className={page === 'import' ? 'selected' : ''}>
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
