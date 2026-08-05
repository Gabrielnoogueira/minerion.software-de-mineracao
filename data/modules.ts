export type Module = {
  name: string;
  description: string;
};

export const modules: Module[] = [
  {
    name: "Minerion Administrativo",
    description: "Financeiro, contábil, fiscal, ativo.",
  },
  {
    name: "Minerion Pessoas",
    description:
      "Recrutamento, folha, ponto, SST, tarefas, visitas, reservas.",
  },
  {
    name: "Minerion Suprimentos",
    description: "Compras, estoques, contratos, custos.",
  },
  {
    name: "Minerion Mercado",
    description:
      "Vendas, e-commerce, prestação de serviços, logística, agendamento de cargas, expedição.",
  },
  {
    name: "Minerion Produção",
    description: "Lavra, produção, mineração, equipamentos móveis, escort.",
  },
  {
    name: "Minerion Manutenção",
    description: "Preditivas, preventivas, corretivas, pneus.",
  },
  {
    name: "Minerion Qualidade",
    description: "Análise de qualidade, lotes, certificados.",
  },
];
