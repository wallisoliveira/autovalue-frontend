// src/components/NavBar.tsx

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  /* Fundo da NavBar é Preto (o padrão do corpo já é preto) */
  background-color: var(--color-black); 
  border-bottom: 1px solid var(--color-border); /* Linha sutil para separar */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-white); /* Logo em Branco */
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavLinks = styled.nav`
  a {
    margin-left: 1.5rem;
    color: var(--color-white);
    opacity: 0.8;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 1;
      color: var(--color-white); /* Mantém o Branco, aumenta a opacidade */
    }
  }
`;

const NavBar: React.FC = () => {
  return (
    <Header>
      <Logo to="/">AutoValue AI</Logo>
      <NavLinks>
        <Link to="/">Avaliação</Link>
        <Link to="/kanban">Kanban</Link>
        <Link to="/relatorios">Relatórios</Link>
      </NavLinks>
    </Header>
  );
};

export default NavBar;