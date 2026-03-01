export function todayISO() {
    return new Date().toISOString().split('T')[0];
}
  
export function buildFilename(name: string) {
   const date = todayISO();
   const trimmed = name.trim();
   return trimmed ? `${date}_${trimmed}` : date;
}
  
export function formatElapsed(secs: number) {
   const m = Math.floor(secs / 60).toString().padStart(2, '0');
   const s = (secs % 60).toString().padStart(2, '0');
   return `${m}:${s}`;
}