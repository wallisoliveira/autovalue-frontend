// src/components/AvaliacaoForm.tsx

import React, { useState, useMemo } from 'react'; // Adicionado useMemo para filtragem
import styled from 'styled-components';
import api from '../services/api'; 
import axios from 'axios';
import { veiculosData, marcas } from '../data/veiculosData'; // Importa dados detalhados

// --- Styled Components (Design B&W) ---

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: var(--color-accent); 
  border-radius: 4px;
  border: 1px solid var(--color-border);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--color-white); 
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-black); 
  color: var(--color-white); 
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-white); 
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-black);
  color: var(--color-white);
  
  &:focus {
    outline: none;
    border-color: var(--color-white);
  }
`;

const Button = styled.button`
  grid-column: 1 / -1; 
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  background-color: var(--color-white); 
  color: var(--color-black); 
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cccccc; 
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// --- Componente de Resultado (Exibe o retorno da IA) ---

const ResultadoWrapper = styled.div`
    grid-column: 1 / -1;
    padding: 20px;
    border-top: 1px solid var(--color-border);
    margin-top: 20px;
    color: var(--color-white);
    background-color: #111111;
`;

const PMCValue = styled.h3`
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-white);
    margin: 15px 0 10px;
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 10px;
`;

const ResultadoItem = styled.p`
    font-size: 1rem;
    margin-bottom: 8px;
    span {
        font-weight: bold;
        color: #B2FF59;
    }
`;

const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
};


const ResultadoIA: React.FC<{ resultado: any }> = ({ resultado }) => {
    const avaliacao = resultado.avaliacao_preditiva;

    if (!avaliacao || !avaliacao.preco_maximo_compra) {
        return (
            <ResultadoWrapper>
                <h2>RESULTADO DA AVALIAÇÃO</h2>
                <p style={{ color: 'red' }}>A simulação da IA falhou ou não retornou dados de preço.</p>
            </ResultadoWrapper>
        );
    }

    return (
        <ResultadoWrapper>
            <h2>RESULTADO DA AVALIAÇÃO (Simulação da IA)</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                ID do Veículo Criado: <span>{resultado.id}</span> | Placa: <span>{resultado.placa}</span>
            </p>

            <h3>PREÇO MÁXIMO DE COMPRA (PMC)</h3>
            <PMCValue>{formatarMoeda(avaliacao.preco_maximo_compra)}</PMCValue>
            
            <ResultadoItem>
                Tempo Médio de Venda Previsto (TMV): 
                <span> {avaliacao.tmv_previsto_dias} dias</span>
            </ResultadoItem>
            <ResultadoItem>
                Referência FIPE: <span>{formatarMoeda(avaliacao.fipe_referencia)}</span>
            </ResultadoItem>
            <ResultadoItem>
                Margem Desejada Calculada: <span>{avaliacao.margem_desejada}%</span>
            </ResultadoItem>
        </ResultadoWrapper>
    );
};


// --- COMPONENTE PRINCIPAL ---

const AvaliacaoForm: React.FC = () => {
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    quilometragem: '',
    margemDesejada: '15', 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  // Lógica para filtrar modelos com base na marca selecionada
  const modelosFiltrados = useMemo(() => {
    const marcaSelecionada = formData.marca;
    return marcaSelecionada ? veiculosData[marcaSelecionada as keyof typeof veiculosData] || [] : [];
  }, [formData.marca]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'marca') {
        // Reseta o modelo ao mudar a marca
        setFormData({
            ...formData,
            marca: value,
            modelo: '', 
        });
    } else {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
  };

  // Helper para garantir que enviamos um número (mesmo que 0) e não NaN
  const getNumberValue = (value: string): number => {
    const num = parseInt(value);
    return isNaN(num) ? 0 : num;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResultado(null);

    const dadosParaAPI = {
        placa: formData.placa,
        marca: formData.marca,
        modelo: formData.modelo, // Agora inclui a Versão!
        ano: getNumberValue(formData.ano), 
        quilometragem: getNumberValue(formData.quilometragem),
        status: 'AVALIACAO', 
        cor: 'PRETO', // Valor padrão para evitar erro de validação
    };

    try {
        const response = await api.post('/veiculos/', dadosParaAPI);
        
        setResultado(response.data); 
        alert(`Avaliação enviada! ID: ${response.data.id}. Verifique o resultado abaixo.`);

     } catch (error: any) {
        let mensagemErro = 'Erro desconhecido ao processar a avaliação.';

        if (axios.isAxiosError(error) && error.response) {
            const responseData = error.response.data;
            
            if (typeof responseData === 'object' && responseData !== null) {
                const primeiroCampo = Object.keys(responseData)[0];
                if (primeiroCampo) {
                    const mensagem = Array.isArray(responseData[primeiroCampo]) ? responseData[primeiroCampo][0] : String(responseData[primeiroCampo]);
                    mensagemErro = `Erro de validação em "${primeiroCampo}": ${mensagem}`;
                } else if (responseData.detail) {
                    mensagemErro = `Erro da API: ${responseData.detail}`;
                } else {
                    mensagemErro = 'Erro de validação. Verifique o console para o JSON completo.';
                }
            }
        }
        
        console.error('Erro de requisição DETALHADO:', error.response?.data || error);
        alert(`Falha no Envio. ${mensagemErro}`); 

    } finally {
        setIsLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      
      {/* 1. Placa */}
      <FormGroup>
        <Label htmlFor="placa">Placa</Label>
        <Input 
          id="placa"
          name="placa"
          type="text"
          value={formData.placa}
          onChange={handleChange}
          placeholder="Ex: ABC1D23"
          required
        />
      </FormGroup>

      {/* 2. MARCA */}
      <FormGroup>
        <Label htmlFor="marca">Marca</Label>
        <Select 
          id="marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Selecione a Marca</option>
          {marcas.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </Select>
      </FormGroup>

      {/* 3. MODELO (COM VERSÕES) */}
      <FormGroup>
        <Label htmlFor="modelo">Modelo e Versão</Label>
        <Select 
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            disabled={!formData.marca}
            required
        >
            <option value="" disabled>Selecione o Modelo</option>
            {modelosFiltrados.map(m => (
                <option key={m} value={m}>{m}</option>
            ))}
        </Select>
      </FormGroup>

      {/* 4. Ano */}
      <FormGroup>
        <Label htmlFor="ano">Ano</Label>
        <Input 
          id="ano"
          name="ano"
          type="number"
          value={formData.ano}
          onChange={handleChange}
          placeholder="Ex: 2020"
          required
        />
      </FormGroup>

      {/* 5. Quilometragem */}
      <FormGroup>
        <Label htmlFor="quilometragem">Quilometragem (KM)</Label>
        <Input 
          id="quilometragem"
          name="quilometragem"
          type="number"
          value={formData.quilometragem}
          onChange={handleChange}
          placeholder="Ex: 50000"
          required
        />
      </FormGroup>

      {/* 6. Margem Desejada */}
      <FormGroup>
        <Label htmlFor="margemDesejada">Margem de Lucro Desejada (%)</Label>
        <Input 
          id="margemDesejada"
          name="margemDesejada"
          type="number"
          value={formData.margemDesejada}
          onChange={handleChange}
          placeholder="Ex: 15"
          required
        />
      </FormGroup>

      {/* Botão de Submissão com estado de carregamento */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'PROCESSANDO IA...' : 'OBTER PRECIFICAÇÃO DA IA'}
      </Button>
      
      {resultado && <ResultadoIA resultado={resultado} />}
    </FormContainer>
  );
};

export default AvaliacaoForm;