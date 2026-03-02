import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EntryRow } from '@/components/entryRow';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/auth-context';
import type { DriveVideoFile } from '@/services/drive';
import { ensureDiaryFolder } from '@/services/drive';
import { listVideos } from '@/services/list';
import { styles } from '@/styles/viewStyles';

export default function ViewScreen() {
  const { getAccessToken, signOut } = useAuth();
  const router = useRouter();

  const [videos, setVideos] = useState<DriveVideoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState('');

  const fetchVideos = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const accessToken = await getAccessToken();
      setToken(accessToken);
      const folderId = await ensureDiaryFolder(accessToken);
      setVideos(await listVideos(accessToken, folderId));
    } catch (e: any) {
      const isOffline =
        e.message?.toLowerCase().includes('network') ||
        e.message?.toLowerCase().includes('failed to fetch') ||
        e.message?.toLowerCase().includes('connection');
      setError(isOffline ? 'No internet connection. Pull down to retry.' : (e.message ?? 'Failed to load entries.'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getAccessToken]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => fetchVideos()}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.heading}>
      <Text style={styles.headingText}>My Entries</Text>
      <Pressable onPress={signOut} hitSlop={8}>
        <IconSymbol size={22} name="rectangle.portrait.and.arrow.right" color="#687076" />
      </Pressable>
    </View>
    <FlatList
      style={styles.flatList}
      contentContainerStyle={[styles.listContent, videos.length === 0 && styles.centered]}
      data={videos}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => fetchVideos(true)} />
      }
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptySubtitle}>Switch to Record to create your first entry.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <EntryRow
          item={item}
          token={token}
          onPress={() =>
            router.push({
              pathname: '/(app)/view/[videoId]',
              params: { videoId: item.id, name: item.name },
            })
          }
        />
      )}
    />
    </SafeAreaView>
  );
}