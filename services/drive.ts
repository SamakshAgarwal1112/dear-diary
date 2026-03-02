import AsyncStorage from '@react-native-async-storage/async-storage';

const DRIVE_API = process.env.EXPO_PUBLIC_DRIVE_API;

const FOLDER_ID_CACHE_KEY = process.env.EXPO_PUBLIC_DRIVE_FOLDER_ID_CACHE_KEY;

export interface DriveVideoFile {
  id: string;
  name: string;
  createdTime: string;
  thumbnailLink?: string;
  webContentLink?: string;
}

export async function ensureDiaryFolder(accessToken: string): Promise<string> {
  const cached = await AsyncStorage.getItem(FOLDER_ID_CACHE_KEY as string);
  if (cached) return cached;

  const headers = { Authorization: `Bearer ${accessToken}` };

  const q = encodeURIComponent(
    `name='Dear Diary' and mimeType='application/vnd.google-apps.folder' and trashed=false`
  );
  const searchRes = await fetch(`${DRIVE_API}/files?q=${q}&fields=files(id)`, { headers });

  if (!searchRes.ok) throw new Error(`Drive folder search failed: ${searchRes.status}`);

  const { files } = await searchRes.json();

  if (files?.length > 0) {
    await AsyncStorage.setItem(FOLDER_ID_CACHE_KEY as string, files[0].id);
    return files[0].id;
  }

  const createRes = await fetch(`${DRIVE_API}/files`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dear Diary',
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });

  if (!createRes.ok) throw new Error(`Drive folder creation failed: ${createRes.status}`);

  const folder = await createRes.json();
  await AsyncStorage.setItem(FOLDER_ID_CACHE_KEY as string, folder.id);
  return folder.id;
}

export async function clearFolderCache() {
  await AsyncStorage.removeItem(FOLDER_ID_CACHE_KEY as string);
}