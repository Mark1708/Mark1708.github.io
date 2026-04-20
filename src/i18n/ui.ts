export const languages = {
  en: 'EN',
  ru: 'RU',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'nav.export.pdf': 'PDF',
    'nav.export.html': 'HTML',
    'nav.export.label': 'Export',
    'nav.theme.system': 'System',
    'nav.theme.dark': 'Dark',
    'nav.theme.light': 'Light',
    'section.experience': 'Experience',
    'section.experience.label': 'Career',
    'section.skills': 'Skills',
    'section.skills.label': 'Technical',
    'section.projects': 'Pet Projects',
    'section.projects.label': 'Open Source',
    'hero.available': 'Available for senior/lead roles',
    'hero.current': 'Present',
    'footer.text': 'Mark Gurianov',
    'resume.title': 'Resume — Mark Gurianov',
    'resume.download': 'Download PDF',
  },
  ru: {
    'nav.export.pdf': 'PDF',
    'nav.export.html': 'HTML',
    'nav.export.label': 'Экспорт',
    'nav.theme.system': 'Авто',
    'nav.theme.dark': 'Тёмная',
    'nav.theme.light': 'Светлая',
    'section.experience': 'Опыт работы',
    'section.experience.label': 'Карьера',
    'section.skills': 'Навыки',
    'section.skills.label': 'Технологии',
    'section.projects': 'Pet Projects',
    'section.projects.label': 'Open Source',
    'hero.available': 'Открыт для senior/lead позиций',
    'hero.current': 'н.в.',
    'footer.text': 'Марк Гурьянов',
    'resume.title': 'Резюме — Марк Гурьянов',
    'resume.download': 'Скачать PDF',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getRouteForLang(url: URL, targetLang: Lang): string {
  const [, maybeLang, ...rest] = url.pathname.split('/');
  if (maybeLang in languages) {
    if (targetLang === defaultLang) return '/' + rest.join('/');
    return `/${targetLang}/${rest.join('/')}`;
  }
  if (targetLang === defaultLang) return url.pathname;
  return `/${targetLang}${url.pathname}`;
}
