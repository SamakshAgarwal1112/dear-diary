import { useAuth } from '@/contexts/auth-context';
import { clearFolderCache, ensureDiaryFolder, uploadVideo } from '@/services/drive';
import { styles } from '@/styles/recordStyles';
import { buildFilename, todayISO } from '@/utils/record';
import * as FileSystem from 'expo-file-system/legacy';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

interface SaveSheetProps {
  uri: string;
  onSaved: () => void;
  onDiscard: () => void;
}

export default function SaveSheet({ uri, onSaved, onDiscard }: SaveSheetProps) {
  const { getAccessToken } = useAuth();
  const [name, setName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      const accessToken = await getAccessToken();
      const folderId = await ensureDiaryFolder(accessToken).catch(async (e) => {
        await clearFolderCache();
        const freshToken = await getAccessToken();
        return ensureDiaryFolder(freshToken);
      });

      await uploadVideo({
        accessToken,
        uri,
        filename: buildFilename(name),
        folderId,
        onProgress: setProgress,
      });

      await FileSystem.deleteAsync(uri, { idempotent: true });
      onSaved();
    } catch (e: any) {
      const isOffline =
        e.message?.toLowerCase().includes('network') ||
        e.message?.toLowerCase().includes('failed to fetch') ||
        e.message?.toLowerCase().includes('connection');
      setError(isOffline ? 'No internet connection. Tap Upload to retry.' : (e.message ?? 'Upload failed. Tap to retry.'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal transparent animationType="slide" statusBarTranslucent>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Save entry</Text>

          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder={todayISO()}
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            autoFocus
            returnKeyType="done"
            editable={!uploading}
          />

          <Text style={styles.fieldLabel}>Save to</Text>
          <View style={styles.folderRow}>
            <Text style={styles.folderName}>/Dear Diary</Text>
          </View>

          {uploading && (
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
            </View>
          )}
          {uploading && (
            <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            style={[styles.primaryButton, { marginTop: 16 }, uploading && styles.buttonDisabled]}
            onPress={handleUpload}
            disabled={uploading}>
            <Text style={styles.primaryButtonText}>{uploading ? 'Uploading…' : 'Upload'}</Text>
          </Pressable>

          <Pressable style={styles.discardButton} onPress={onDiscard} disabled={uploading}>
            <Text style={styles.discardText}>Discard</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}