import assert from 'node:assert/strict';
import { POOL, puzzleFor, montevideoDay, default as worker } from './worker.js';

assert.equal(POOL.length, 30, 'el pool tiene 30 acertijos');
const TERM = /^[A-ZÑÁÉÍÓÚÜ0-9. ]+$/;
for (const [i, groups] of POOL.entries()) {
  assert.equal(groups.length, 4, `acertijo ${i + 1}: cuatro categorías`);
  const terms = groups.flatMap(([, t]) => t);
  assert.equal(terms.length, 16, `acertijo ${i + 1}: 16 términos`);
  assert.equal(new Set(terms).size, 16, `acertijo ${i + 1}: términos sin repetir dentro del día`);
  assert.equal(new Set(groups.map(([n]) => n)).size, 4, `acertijo ${i + 1}: categorías sin repetir`);
  for (const [, list] of groups) assert.equal(list.length, 4, `acertijo ${i + 1}: 4 términos por categoría`);
  for (const t of terms) assert.match(t, TERM, `acertijo ${i + 1}: término válido: ${t}`);
}
assert.equal(puzzleFor(Date.parse('2026-09-29T02:59:59Z')).n, 0, 'antes de medianoche UY sigue el día 1');
assert.equal(puzzleFor(Date.parse('2026-09-29T03:00:00Z')).n, 1, 'a medianoche UY cambia el acertijo');
const ciclo = Date.parse('2026-09-28T03:00:00Z') + POOL.length * 86400000;
assert.equal(puzzleFor(ciclo).groups, POOL[0], 'el pool rota completo al día 31');
assert.equal(montevideoDay(Date.parse('2026-09-29T02:59:59Z')), Math.floor(Date.UTC(2026, 8, 28) / 86400000));

const env = { ASSETS: { fetch() { throw Error('asset'); } } };
const hoy = await worker.fetch(new Request('https://test.invalid/conexiones/api/today'), env);
assert.equal(hoy.status, 200);
const datos = await hoy.json();
assert.match(datos.id, /^\d{3}$/);
assert.match(datos.date, /^\d{4}-\d{2}-\d{2}$/);
assert.equal(datos.groups.length, 4);
assert.deepEqual(datos.groups.map(g => g.difficulty), [0, 1, 2, 3], 'dificultad ordenada');
assert.equal(datos.groups.flatMap(g => g.terms).length, 16);
const desconocida = await worker.fetch(new Request('https://test.invalid/conexiones/api/otra'), env);
assert.equal(desconocida.status, 404);
const redirect = await worker.fetch(new Request('https://test.invalid/conexiones'), env);
assert.equal(redirect.status, 308);
console.log('Todo OK');
