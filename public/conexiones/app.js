const $ = id => document.getElementById(id);
const COLORS = ['#e3c15c', '#7ba889', '#7d9bd1', '#a98ac8'];
const EMOJI = ['🟨', '🟩', '🟦', '🟪'];
const MAX_ERRORS = 4;
let puzzle, order = [], selected = new Set(), solved = [], guesses = [], mistakes = 0, done = null;
const key = () => `conexiones:${puzzle.id}`;
function seedShuffle(arr, seed) {
  const a = [...arr]; let s = seed;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 1103515245 + 12345) % 2147483648; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const allTerms = () => puzzle.groups.flatMap(g => g.terms);
const groupOf = term => puzzle.groups.findIndex(g => g.terms.includes(term));
const solvedTerms = () => new Set(solved.flatMap(i => puzzle.groups[i].terms));
function saved() {
  try {
    const d = JSON.parse(localStorage.getItem(key()) || '{}');
    solved = Array.isArray(d.solved) ? d.solved.filter(i => Number.isInteger(i) && i >= 0 && i < 4) : [];
    guesses = Array.isArray(d.guesses) ? d.guesses : [];
    mistakes = Number.isInteger(d.mistakes) ? Math.min(d.mistakes, MAX_ERRORS) : 0;
    done = d.done === 'win' || d.done === 'lose' ? d.done : null;
  } catch { solved = []; guesses = []; mistakes = 0; done = null; }
}
function save() { try { localStorage.setItem(key(), JSON.stringify({ solved, guesses, mistakes, done })); } catch {} }
const utcDay = date => Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000);
function streak() { try { const d = JSON.parse(localStorage.getItem('conexiones:streak') || '{}'); return typeof d.count === 'number' && typeof d.last === 'string' ? d : { count: 0, last: '' }; } catch { return { count: 0, last: '' }; } }
function currentStreak() { if (done === 'lose') return 0; const d = streak(), gap = utcDay(puzzle.date) - utcDay(d.last); return gap === 0 || gap === 1 ? d.count : 0; }
function winStreak() { const d = streak(), gap = utcDay(puzzle.date) - utcDay(d.last); if (gap === 0) return; const count = gap === 1 ? d.count + 1 : 1; try { localStorage.setItem('conexiones:streak', JSON.stringify({ count, last: puzzle.date })); } catch {} }
function shareText() {
  const rows = guesses.filter(g => g.correct).map(g => EMOJI[g.difficulty].repeat(4));
  const head = `Conexiones Nº ${puzzle.id} · ${done === 'win' ? (mistakes ? `${mistakes} ${mistakes === 1 ? 'error' : 'errores'}` : 'sin errores') : 'X'}`;
  return `${head}\n${rows.join('\n')}\nhttps://lucasramos.uy/conexiones/`;
}
async function copyText() {
  const text = shareText();
  try { await navigator.clipboard.writeText(text); $('share-note').textContent = 'Resultado copiado. Pegalo donde quieras.'; }
  catch { const pre = document.createElement('pre'); pre.className = 'share-fallback'; pre.textContent = text; $('share-note').replaceChildren('Seleccioná y copiá este resultado:', pre); }
}
// Lienzo local: nunca se envía el resultado a un servidor.
const STORY_WIDTH = 1080, STORY_HEIGHT = 1920;
let storyBlob, storyUrl;
function fillRound(ctx, x, y, w, h, r, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); }
function fitFont(ctx, text, maxWidth, start, family) {
  let size = start;
  while (size > 14) { ctx.font = `400 ${size}px "DM Mono", monospace`; if (ctx.measureText(text).width <= maxWidth) break; size -= 2; }
  return size;
}
function storyImage() {
  const canvas = document.createElement('canvas'); canvas.width = STORY_WIDTH; canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Este navegador no puede crear la imagen.');
  const ink = '#26221b', paper = '#f7f5ef', muted = '#857d6b', accent = '#7b2d43';
  ctx.fillStyle = paper; ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
  ctx.fillStyle = accent; ctx.fillRect(0, 0, STORY_WIDTH, 18);
  ctx.textBaseline = 'alphabetic'; ctx.fillStyle = ink; ctx.font = '700 68px "Space Grotesk", sans-serif'; ctx.fillText('conexiones', 72, 135);
  const offset = ctx.measureText('conexiones').width; ctx.fillStyle = accent; ctx.fillText('.', 72 + offset, 135);
  ctx.font = '23px "DM Mono", monospace'; ctx.fillStyle = muted; ctx.textAlign = 'right'; ctx.fillText('16 PALABRAS · 4 GRUPOS', 1008, 129); ctx.textAlign = 'left';
  ctx.fillStyle = ink; ctx.fillRect(72, 175, 936, 2);
  ctx.font = '26px "DM Mono", monospace'; ctx.fillStyle = accent; ctx.fillText(`CONEXIONES Nº ${puzzle.id}`, 72, 240);
  ctx.textAlign = 'right'; ctx.fillStyle = muted; ctx.fillText(puzzle.dateLabel, 1008, 240); ctx.textAlign = 'left';
  ctx.font = '400 84px "Source Serif 4", Georgia, serif'; ctx.fillStyle = ink;
  ctx.fillText(done === 'win' ? 'Bien jugado.' : 'Hasta mañana.', 72, 365);
  ctx.textAlign = 'right'; ctx.font = '700 46px "Space Grotesk", sans-serif'; ctx.fillStyle = accent;
  ctx.fillText(done === 'win' ? (mistakes ? `${mistakes} ${mistakes === 1 ? 'ERROR' : 'ERRORES'}` : 'PERFECTO') : 'X / 4', 1008, 360); ctx.textAlign = 'left';
  const barX = 72, barW = 936, barH = 252, gap = 32, top = 440;
  const found = new Set(guesses.filter(g => g.correct).map(g => g.difficulty));
  for (let d = 0; d < 4; d++) {
    const y = top + d * (barH + gap), missing = !found.has(d);
    ctx.globalAlpha = missing ? 0.45 : 1;
    fillRound(ctx, barX, y, barW, barH, 22, COLORS[d]);
    ctx.globalAlpha = 1;
    const group = puzzle.groups[d];
    ctx.fillStyle = ink; ctx.textAlign = 'center';
    ctx.font = '700 40px "Space Grotesk", sans-serif';
    ctx.fillText(group.name.toUpperCase(), STORY_WIDTH / 2, y + 102, barW - 80);
    const terms = group.terms.join(' · ');
    const size = fitFont(ctx, terms, barW - 90, 30);
    ctx.fillText(terms, STORY_WIDTH / 2, y + 168, barW - 80);
    if (missing) { ctx.font = '22px "DM Mono", monospace'; ctx.fillText('SIN RESOLVER', STORY_WIDTH / 2, y + 212); }
    ctx.textAlign = 'left';
  }
  ctx.fillStyle = ink; ctx.fillRect(72, 1660, 936, 2);
  ctx.font = 'italic 400 46px "Source Serif 4", Georgia, serif'; ctx.fillStyle = ink;
  ctx.fillText('Cuatro grupos escondidos.', 72, 1745);
  ctx.font = '21px "DM Mono", monospace'; ctx.fillStyle = muted;
  ctx.fillText('CONEXIONES · JUEGO DIARIO', 72, 1858);
  ctx.textAlign = 'right'; ctx.fillText('LUCASRAMOS.UY/CONEXIONES', 1008, 1858);
  return canvas;
}
async function createStory() {
  await Promise.all([
    document.fonts.load('700 68px "Space Grotesk"'), document.fonts.load('700 40px "Space Grotesk"'),
    document.fonts.load('26px "DM Mono"'), document.fonts.load('400 84px "Source Serif 4"'),
    document.fonts.load('italic 46px "Source Serif 4"'),
  ]);
  await document.fonts.ready;
  const canvas = storyImage();
  return new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('No pudimos crear el archivo.')), 'image/png'));
}
async function openStory() {
  const button = $('share'); button.disabled = true; button.textContent = 'PREPARANDO IMAGEN…'; $('share-note').textContent = '';
  try {
    storyBlob = await createStory(); if (storyUrl) URL.revokeObjectURL(storyUrl);
    storyUrl = URL.createObjectURL(storyBlob); $('story-preview').src = storyUrl;
    const file = new File([storyBlob], `conexiones-${puzzle.id}.png`, { type: 'image/png' });
    $('story-native').hidden = !(navigator.share && navigator.canShare?.({ files: [file] }));
    $('story-dialog').showModal(); $('story-close').focus();
  } catch (error) { $('share-note').textContent = 'No pudimos generar la imagen en este navegador. Podés copiar el resultado como texto.'; console.error('Imagen compartible:', error); }
  finally { button.disabled = false; button.textContent = 'VER IMAGEN PARA COMPARTIR ↗'; }
}
$('story-download').onclick = () => { if (!storyUrl) return; const a = document.createElement('a'); a.href = storyUrl; a.download = `conexiones-${puzzle.id}.png`; a.click(); $('story-note').textContent = 'Imagen descargada. Ya podés subirla a tus historias.'; };
$('story-native').onclick = async () => { if (!storyBlob) return; try { const file = new File([storyBlob], `conexiones-${puzzle.id}.png`, { type: 'image/png' }); await navigator.share({ files: [file], title: `Conexiones Nº ${puzzle.id}` }); } catch (e) { if (e.name !== 'AbortError') $('story-note').textContent = 'No se pudo compartir desde el navegador. Descargá la imagen para subirla.'; } };
function renderSolved() {
  $('solved').replaceChildren(...guesses.filter(g => g.correct).map(g => {
    const group = puzzle.groups[g.difficulty];
    const div = document.createElement('div'); div.className = 'banner'; div.style.background = COLORS[g.difficulty];
    const h = document.createElement('h3'); h.textContent = group.name;
    const p = document.createElement('p'); p.textContent = group.terms.join(' · ');
    div.append(h, p); return div;
  }));
  if (done === 'lose') {
    const found = new Set(guesses.filter(g => g.correct).map(g => g.difficulty));
    for (let d = 0; d < 4; d++) {
      if (found.has(d)) continue;
      const group = puzzle.groups[d];
      const div = document.createElement('div'); div.className = 'banner revealed'; div.style.background = COLORS[d];
      const h = document.createElement('h3'); h.textContent = group.name;
      const p = document.createElement('p'); p.textContent = group.terms.join(' · ');
      div.append(h, p); $('solved').append(div);
    }
  }
}
function renderTiles(shake) {
  const solvedSet = solvedTerms();
  const wrap = $('tiles'); wrap.replaceChildren();
  for (const term of order) {
    if (solvedSet.has(term)) continue;
    const b = document.createElement('button'); b.type = 'button';
    b.className = 'tile' + (selected.has(term) ? ' sel' : '') + (shake && selected.has(term) ? ' shake' : '');
    b.textContent = term; b.disabled = !!done;
    b.onclick = () => toggle(term);
    wrap.append(b);
  }
}
function renderMistakes() {
  $('mistakes').replaceChildren(...Array.from({ length: MAX_ERRORS }, (_, i) => {
    const d = document.createElement('span'); d.className = 'dot' + (i < mistakes ? ' used' : ''); return d;
  }));
}
function render(shake) {
  renderSolved(); renderTiles(shake); renderMistakes();
  document.querySelector('.actions').hidden = !!done;
  $('submit').disabled = selected.size !== 4 || !!done;
  $('shuffle').disabled = !!done; $('deselect').disabled = !!done;
  const finished = !!done;
  $('result').hidden = !finished;
  if (finished) {
    $('result-label').textContent = done === 'win' ? '✳ RESUELTO' : '✳ SIN RESOLVER';
    $('result-score').textContent = done === 'win' ? (mistakes ? `${mistakes} ${mistakes === 1 ? 'ERROR' : 'ERRORES'}` : 'PERFECTO') : 'X / 4';
    $('result-title').textContent = done === 'win' ? 'Bien jugado.' : 'Hasta mañana.';
    $('result-copy').textContent = done === 'win' ? 'Encontraste los cuatro grupos. Volvé mañana por otro.' : 'Se acabaron los errores. Mañana hay revancha.';
    $('feedback').textContent = '';
  }
  const count = currentStreak();
  $('streak-count').textContent = `${count} ${count === 1 ? 'día seguido' : 'días seguidos'}`;
}
function toggle(term) {
  if (done) return;
  if (selected.has(term)) selected.delete(term);
  else if (selected.size < 4) selected.add(term);
  $('feedback').textContent = '';
  render();
}
function submit() {
  if (selected.size !== 4 || done) return;
  const pick = [...selected];
  const g = groupOf(pick[0]);
  const correct = pick.every(t => groupOf(t) === g);
  guesses.push(correct ? { correct: true, difficulty: g } : { correct: false, terms: pick });
  let message = '';
  if (correct) {
    solved.push(g); selected.clear();
    if (solved.length === 4) { done = 'win'; winStreak(); }
  } else {
    mistakes++;
    const counts = {};
    for (const t of pick) counts[groupOf(t)] = (counts[groupOf(t)] || 0) + 1;
    message = Object.values(counts).some(c => c === 3) ? 'Te falta una.' : 'No es un grupo.';
    if (mistakes >= MAX_ERRORS) { done = 'lose'; selected.clear(); }
  }
  save();
  $('feedback').textContent = message;
  render(!correct && !done);
}
$('submit').onclick = submit;
$('shuffle').onclick = () => { order = seedShuffle(order, Date.now() % 2147483647); render(); };
$('deselect').onclick = () => { selected.clear(); $('feedback').textContent = ''; render(); };
$('share').onclick = openStory;
$('copy-text').onclick = copyText;
$('story-close').onclick = () => $('story-dialog').close();
$('story-dialog').addEventListener('click', e => { if (e.target === $('story-dialog')) $('story-dialog').close(); });
const fmtDate = date => new Intl.DateTimeFormat('es-UY', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00Z`)).toUpperCase();
function showPuzzle(data) {
  puzzle = data;
  puzzle.dateLabel = fmtDate(puzzle.date);
  $('date').textContent = puzzle.dateLabel;
  $('puzzle-number').textContent = `CONEXIONES Nº ${puzzle.id}`;
  saved();
  order = seedShuffle(allTerms(), Number.parseInt(puzzle.id, 10));
  render();
  $('status').textContent = ''; $('game').hidden = false;
  const rollover = Date.parse(`${puzzle.date}T03:00:00Z`) + 86400000 - Date.now();
  if (rollover > 0) setTimeout(() => location.reload(), rollover + 1000);
}
async function loadDaily() {
  const res = await fetch('/conexiones/api/today', { headers: { accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error('No pudimos cargar el acertijo. Probá de nuevo en un rato.');
  const data = await res.json();
  if (!Array.isArray(data?.groups) || data.groups.length !== 4 || data.groups.flatMap(g => g.terms || []).length !== 16 || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error('El acertijo no está disponible.');
  showPuzzle(data);
}
loadDaily().catch(e => { $('status').textContent = e.message; });
