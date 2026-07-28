import { readFile } from 'node:fs/promises';

const BASE_PATH = new URL('../src/layouts/Base.astro', import.meta.url);
const NAVBAR_PATH = new URL('../src/components/nav/Navbar.astro', import.meta.url);

function assertContract(condition, message, failures) {
  if (!condition) failures.push(message);
}

const [baseSource, navbarSource] = await Promise.all([
  readFile(BASE_PATH, 'utf8'),
  readFile(NAVBAR_PATH, 'utf8'),
]);
const combinedSource = `${baseSource}\n${navbarSource}`;
const failures = [];
const mappingObject = combinedSource.match(/theme[\w-]*colors?[\w-]*\s*=\s*(?:Object\.freeze\s*\()?\s*\{([\s\S]{0,500})\}/i)?.[1] ?? '';
const lightMapping = combinedSource.match(/(?:theme\s*color|themeColor)[\w-]*light[\w-]*\s*[=:]\s*["'](#[\da-f]{6})["']/i)
  ?? mappingObject.match(/light\s*:\s*["'](#[\da-f]{6})["']/i);
const darkMapping = combinedSource.match(/(?:theme\s*color|themeColor)[\w-]*dark[\w-]*\s*[=:]\s*["'](#[\da-f]{6})["']/i)
  ?? mappingObject.match(/dark\s*:\s*["'](#[\da-f]{6})["']/i);

assertContract(lightMapping, 'missing explicit light theme-color hex mapping', failures);
assertContract(darkMapping, 'missing explicit dark theme-color hex mapping', failures);
assertContract(!lightMapping || !darkMapping || lightMapping[1] !== darkMapping[1], 'light and dark theme-color mappings must differ', failures);
assertContract(/<meta\s+name=["']theme-color["']\s+content=\{[^}]+\}/i.test(baseSource), 'theme-color meta content must use resolved initial mapping', failures);
assertContract(/localStorage\.getItem\(["']portfolio-theme["']\)/.test(combinedSource), 'missing saved-theme resolution', failures);
assertContract(/["']light["']/.test(combinedSource) && /["']dark["']/.test(combinedSource) && /["']system["']/.test(combinedSource), 'missing light, dark, or system mode handling', failures);
assertContract(/matchMedia\(\s*["']\(prefers-color-scheme:\s*dark\)["']\s*\)/.test(combinedSource), 'missing prefers-color-scheme system resolution', failures);
assertContract(/(?:MediaQueryList|matchMedia)[\s\S]*addEventListener\(\s*["']change["']/.test(combinedSource), 'missing system color-scheme change listener', failures);
const applyThemeBlock = combinedSource.match(/function\s+applyTheme\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
const savedThemeUpdatesMetadata = /addEventListener\(\s*["']storage["']/.test(combinedSource)
  || /theme-color|updateThemeColor/.test(applyThemeBlock);
assertContract(savedThemeUpdatesMetadata, 'missing saved-theme metadata update path', failures);
assertContract(/querySelector\(\s*["'][^"']*meta\[name=[\\"']?theme-color/i.test(combinedSource), 'missing runtime theme-color meta lookup', failures);
assertContract(/(?:\.content\s*=|setAttribute\(\s*["']content["'])/.test(combinedSource), 'missing runtime theme-color metadata update', failures);
assertContract(!/(?:getComputedStyle|styleSheets|cssRules)[\s\S]{0,200}(?:theme-color|--color-)/.test(combinedSource), 'theme-color mapping must not inspect serialized CSS', failures);

const inlineScriptIndex = baseSource.indexOf('<script is:inline>');
const headEndIndex = baseSource.indexOf('</head>');
const bodyIndex = baseSource.indexOf('<body>');
assertContract(inlineScriptIndex >= 0 && inlineScriptIndex < headEndIndex && headEndIndex < bodyIndex, 'anti-flash initialization must remain inline in head before body', failures);

if (failures.length > 0) {
  console.error(`Theme color contract check failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.info('Theme color contract check passed for explicit, saved, system, and runtime modes.');
}
