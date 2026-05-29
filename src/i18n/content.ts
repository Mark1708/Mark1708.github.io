export type ContentLang = 'en' | 'ru';

interface LocalizableContent {
  title: string;
  description: string;
  descriptionRu?: string;
  summary?: string;
  summaryRu?: string;
  demonstrates?: string;
  demonstratesRu?: string;
  problem?: string;
  problemRu?: string;
  architecture?: string;
  architectureRu?: string;
  decisions?: string[];
  decisionsRu?: string[];
  tradeoffs?: string[];
  tradeoffsRu?: string[];
  role?: string[];
  roleRu?: string[];
  futureImprovements?: string[];
  futureImprovementsRu?: string[];
  features?: string[];
  featuresRu?: string[];
  [key: string]: unknown;
}

export function getLocalizedContent(data: LocalizableContent, lang: ContentLang) {
  return {
    title: data.title,
    description: lang === 'ru' ? (data.descriptionRu || data.description) : data.description,
    summary: lang === 'ru' ? (data.summaryRu || data.summary) : data.summary,
    demonstrates: lang === 'ru' ? (data.demonstratesRu || data.demonstrates) : data.demonstrates,
    problem: lang === 'ru' ? (data.problemRu || data.problem) : data.problem,
    architecture: lang === 'ru' ? (data.architectureRu || data.architecture) : data.architecture,
    decisions: lang === 'ru' ? (data.decisionsRu || data.decisions) : data.decisions,
    tradeoffs: lang === 'ru' ? (data.tradeoffsRu || data.tradeoffs) : data.tradeoffs,
    role: lang === 'ru' ? (data.roleRu || data.role) : data.role,
    futureImprovements: lang === 'ru' ? (data.futureImprovementsRu || data.futureImprovements) : data.futureImprovements,
    features: lang === 'ru' ? (data.featuresRu || data.features) : data.features,
  };
}

export function getLocalePrefix(lang: ContentLang): string {
  return lang === 'ru' ? '/ru' : '';
}
