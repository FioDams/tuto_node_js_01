import dotenv from 'dotenv';
dotenv.config(); // { path: './.env' });

export function config(name: string, def = '' as string): string {
  const value = process.env[name] ?? def;
  console.log('name: ' + name + ', value: ' + value)
  return value;
}
