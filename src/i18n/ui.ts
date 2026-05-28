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
    'section.featuredProjects': 'Featured Projects',
    'section.featuredProjects.label': 'Selected',
    'featuredProjects.demonstrates': 'Demonstrates',
    'section.articles': 'Writing & Teaching',
    'section.articles.label': 'Knowledge',
    'articles.badge': 'More coming soon',
    'articles.item.hse': 'Guest lecturer at HSE University',
    'articles.item.habr': 'Habr: Spring Boot deployment with Nginx, Let\'s Encrypt and Docker Compose — 31K readers',
    'section.projects': 'Pet Projects',
    'section.projects.label': 'Open Source',
    'hero.available': 'Available for senior/lead roles',
    'hero.current': 'Present',
    'footer.text': 'Mark Gurianov',
    'resume.title': 'Resume — Mark Gurianov',
    'resume.download': 'Download PDF',
    'projects.title': 'Projects',
    'projects.back': 'Back to projects',
    'projects.github': 'View on GitHub',
    'projects.stars': 'stars',
    'projects.features': 'Key Features',
    'projects.technologies': 'Technologies',
    'projects.readMore': 'Read more',
    'nav.projects': 'Projects',
    'project.status.active': 'Active',
    'project.status.archived': 'Archived',
    'project.status.wip': 'Work in progress',
    'project.backToList': 'Back to projects',
    'project.viewGithub': 'View on GitHub',
    'project.liveDemo': 'Live Demo',
    'project.features': 'Key features',
    'project.since': 'Since',
    'project.lastUpdated': 'Last updated',
    'page.projects.title': 'Projects - Mark Gurianov',
    'page.projects.description': 'Open-source projects and pet projects by Mark Gurianov. Backend, DevTools, ML experiments.',
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
    'section.featuredProjects': 'Избранные проекты',
    'section.featuredProjects.label': 'Выборка',
    'featuredProjects.demonstrates': 'Демонстрирует',
    'section.articles': 'Публикации и преподавание',
    'section.articles.label': 'Знания',
    'articles.badge': 'Раздел в проработке',
    'articles.item.hse': 'Приглашённый лектор ВШЭ',
    'articles.item.habr': 'Хабр: Развёртывание Spring Boot с Nginx, Let\'s Encrypt и Docker Compose — 31K читателей',
    'section.projects': 'Pet Projects',
    'section.projects.label': 'Open Source',
    'hero.available': 'Открыт для senior/lead позиций',
    'hero.current': 'н.в.',
    'footer.text': 'Марк Гурьянов',
    'resume.title': 'Резюме — Марк Гурьянов',
    'resume.download': 'Скачать PDF',
    'projects.title': 'Проекты',
    'projects.back': 'Назад к проектам',
    'projects.github': 'Смотреть на GitHub',
    'projects.stars': 'звёзд',
    'projects.features': 'Ключевые возможности',
    'projects.technologies': 'Технологии',
    'projects.readMore': 'Подробнее',
    'nav.projects': 'Проекты',
    'project.status.active': 'Активный',
    'project.status.archived': 'Архив',
    'project.status.wip': 'В разработке',
    'project.backToList': 'Назад к проектам',
    'project.viewGithub': 'Смотреть на GitHub',
    'project.liveDemo': 'Демо',
    'project.features': 'Ключевые возможности',
    'project.since': 'С',
    'project.lastUpdated': 'Обновлено',
    'page.projects.title': 'Проекты — Марк Гурьянов',
    'page.projects.description': 'Open-source проекты и pet projects Марка Гурьянова. Backend, DevTools, ML эксперименты.',
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
    if (targetLang === defaultLang) return `/${rest.join('/')}`;
    return `/${targetLang}/${rest.join('/')}`;
  }
  if (targetLang === defaultLang) return url.pathname;
  return `/${targetLang}${url.pathname}`;
}
