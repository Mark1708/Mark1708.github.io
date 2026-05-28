export type ContentLang = 'en' | 'ru';

interface LocalizableContent {
  title: string;
  description: string;
  descriptionRu?: string;
  summary?: string;
  summaryRu?: string;
  features?: string[];
  featuresRu?: string[];
  [key: string]: unknown;
}

export function getLocalizedContent(data: LocalizableContent, lang: ContentLang) {
  return {
    title: data.title,
    description: lang === 'ru' ? (data.descriptionRu || data.description) : data.description,
    summary: lang === 'ru' ? (data.summaryRu || data.summary) : data.summary,
    features: lang === 'ru' ? (data.featuresRu || data.features) : data.features,
  };
}

export function getLocalePrefix(lang: ContentLang): string {
  return lang === 'ru' ? '/ru' : '';
}
