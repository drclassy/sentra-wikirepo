import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const srcRoot = path.join(root, 'src');

function collectFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectFiles(filePath);
    }
    return /\.(ts|tsx)$/.test(entry.name) ? [filePath] : [];
  });
}

const failures = [];

for (const filePath of collectFiles(srcRoot)) {
  const source = readFileSync(filePath, 'utf8');
  const rel = path.relative(root, filePath).replaceAll(path.sep, '/');

  if (source.includes('href="#"')) {
    failures.push(`${rel}: contains placeholder href="#"`);
  }

  if (source.includes('src="/')) {
    failures.push(`${rel}: contains root-absolute public asset src`);
  }

  if (/onClick=\{\(e\)\s*=>\s*e\.preventDefault\(\)\}/.test(source)) {
    failures.push(`${rel}: contains inert preventDefault-only click handler`);
  }
}

if (failures.length > 0) {
  console.error('Wikirepo link verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Wikirepo link verification passed.');
