import * as FileSystem from 'expo-file-system/legacy';
import { DriveVideoFile } from './drive';

const DRIVE_UPLOAD_API = process.env.EXPO_PUBLIC_DRIVE_UPLOAD_API;

export interface UploadVideoParams {
  accessToken: string;
  uri: string;
  filename: string;
  folderId: string;
  onProgress: (fraction: number) => void;
}
  
export async function uploadVideo({
  accessToken,
  uri,
  filename,
  folderId,
  onProgress,
}: UploadVideoParams): Promise<DriveVideoFile> {
  const fullName = `${filename}.mp4`;
  
  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) throw new Error('Video file not found on device.');
  const fileSize = info.size;
  
  const initRes = await fetch(
    `${DRIVE_UPLOAD_API}/files?uploadType=resumable&fields=id,name,createdTime,thumbnailLink,webContentLink`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': 'video/mp4',
        'X-Upload-Content-Length': String(fileSize),
      },
      body: JSON.stringify({
        name: fullName,
        parents: [folderId],
      }),
    }
  );
  
  if (!initRes.ok) throw new Error(`Upload initiation failed: ${initRes.status}`);
  
  const uploadUrl = initRes.headers.get('Location');
  if (!uploadUrl) throw new Error('Drive API returned no upload URL.');
  
  const task = FileSystem.createUploadTask(
    uploadUrl,
    uri,
    {
      httpMethod: 'PUT',
      headers: { 'Content-Type': 'video/mp4' },
    },
    ({ totalBytesSent, totalBytesExpectedToSend }) => {
      if (totalBytesExpectedToSend > 0) {
        onProgress(totalBytesSent / totalBytesExpectedToSend);
      }
    }
  );
  
  const result = await task.uploadAsync();

  if (!result || result.status < 200 || result.status > 299) {
    throw new Error(`Upload failed with status ${result?.status ?? 'unknown'}`);
  }
  
  return JSON.parse(result.body) as DriveVideoFile;
}