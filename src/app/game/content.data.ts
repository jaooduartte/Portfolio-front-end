import { SKILLS } from './skills.data';
import { Section } from './game-state.service';
export type ContentPage = {
  title: string;
  text?: string;
  progress?: number;
  image?: string;
  alt?: string;
  links?: ReadonlyArray<{ label: string; url: string; download?: string }>;
};
export const CONTENT: Record<
  Exclude<Section, 'projects'>,
  ReadonlyArray<ContentPage>
> = {
  about: [
    {
      title: 'Olá, eu sou João.',
      text: 'Sou estudante de Engenharia de Software na Universidade Católica de Santa Catarina, em Joinville-SC. Atuo como desenvolvedor full-stack, resolvendo problemas e criando soluções digitais.',
    },
    {
      title: 'O que eu construo',
      text: 'Meu foco é a evolução de plataformas SaaS: modelagem de dados, regras de negócio, integrações com APIs externas e manutenção de ambientes produtivos.',
    },
    {
      title: 'Do backend à interface',
      text: 'Trabalho com Laravel, PHP e Node.js, APIs REST, autenticação e controle de acesso. Tenho experiência com multi-tenant, migrations e correções estruturadas em produção.',
    },
    {
      title: 'Interfaces e produto',
      text: 'Construo interfaces com React, Next.js e Tailwind CSS, incluindo dashboards, componentes reutilizáveis, temas e permissões. Também utilizo SQL, Figma, Git, GitHub e Jira.',
    },
    {
      title: 'Sempre em movimento',
      text: 'Tenho experiência com integrações, automações no Jira e incorporação de serviços externos. Busco continuar aprendendo e criando soluções tecnológicas bem construídas.',
    },
  ],
  experience: [
    {
      title: 'Eloverde Ambiental',
      text: 'Desenvolvedor FullStack Junior · Out/2025 – Jul/2026. Desenvolvimento com PHP (Laravel) e Angular, implementação de funcionalidades, versionamento com Git e manipulação de dados em banco.',
    },
    {
      title: 'Eloverde Ambiental',
      text: 'Analista de Suporte · Nov/2023 – Out/2025. Suporte técnico, diagnóstico e resolução de incidentes, registro de melhorias e apoio à evolução contínua do produto.',
    },
    {
      title: 'P. X. de Oliveira',
      text: 'Papelaria e Atacado · Vendedor · Jan/2014 – Ago/2015. Atendimento direto ao cliente no varejo, apoiando decisões de compra com clareza, agilidade e boa experiência.',
    },
  ],
  skills: SKILLS.map((skill) => ({
    title: skill.name,
    progress: skill.percent,
  })),
  contact: [
    {
      title: 'Vamos conversar?',
      text: 'João Duarte · Software Developer · Joinville-SC',
      links: [
        { label: 'E-mail', url: 'mailto:jpdx2010@hotmail.com' },
        { label: 'WhatsApp ↗', url: 'https://wa.me/5547999919004' },
      ],
    },
    {
      title: 'Encontre-me por aí',
      links: [
        {
          label: 'LinkedIn ↗',
          url: 'https://www.linkedin.com/in/jaooduartte/',
        },
        { label: 'GitHub ↗', url: 'https://github.com/jaooduartte' },
        { label: 'Instagram ↗', url: 'https://www.instagram.com/jaooduartte/' },
      ],
    },
    {
      title: 'Meu currículo',
      text: 'Conheça minha trajetória profissional.',
      links: [
        {
          label: 'Baixar currículo ↓',
          url: '/assets/CURRICULO-2026.2.pdf',
          download: 'CURRICULO-2026.2.pdf',
        },
      ],
    },
  ],
};
