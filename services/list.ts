import { DriveVideoFile } from './drive';

const DRIVE_API = process.env.EXPO_PUBLIC_DRIVE_API;

export async function listVideos(
  accessToken: string,
  folderId: string
): Promise<DriveVideoFile[]> {
  const q = encodeURIComponent(
    `'${folderId}' in parents and mimeType='video/mp4' and trashed=false`
  );
  const res = await fetch(
    `${DRIVE_API}/files?q=${q}&fields=files(id,name,createdTime,thumbnailLink,webContentLink)&orderBy=createdTime%20desc`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  
  if (!res.ok) throw new Error(`Failed to list videos: ${res.status}`);
  
  const data = await res.json();
  return data.files ?? [];
}
  
export function getStreamUrl(fileId: string): string {
  return `${DRIVE_API}/files/${fileId}?alt=media`;
}