// src/pages/Dashboard.tsx

import styled from 'styled-components';
import AvaliacaoForm from '../components/AvaliacaoForm'; // Importação do novo componente de formulário

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  /* Cor forçada em Branco para o tema B&W (corrigindo o erro de herança) */
  color: var(--color-white) !important; 
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Title>Dashboard de Avaliação Preditiva</Title>
      
      <p style={{ color: 'var(--color-text-secondary)' }}>
        Insira os dados do veículo abaixo para obter a precificação da IA.
      </p>

      {/* INTEGRAÇÃO DO COMPONENTE AQUI */}
      <AvaliacaoForm /> 
      
      {/* Aqui entrará a seção de Resultados (futuramente) */}
      
    </DashboardContainer>
  );
};

export default Dashboard;