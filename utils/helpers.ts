export function formatDate(isoString: string): string {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
}
  
export function stripExtension(filename: string): string {
    return filename.replace(/\.mp4$/i, '');
}