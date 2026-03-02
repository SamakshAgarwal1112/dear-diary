import { Stack, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { useAuth } from '@/contexts/auth-context';
import { getStreamUrl } from '@/services/list';
import { styles } from '@/styles/videoStyles';

function Player({
  source,
}: {
  source: { uri: string; headers: Record<string, string> };
}) {
  const player = useVideoPlayer(source, (p) => {
    p.play();
  });

  return (
    <VideoView
      player={player}
      style={styles.video}
      nativeControls
      contentFit="contain"
      allowsFullscreen
      allowsPictureInPicture
    />
  );
}

export default function VideoPlayerScreen() {
  const { videoId, name } = useLocalSearchParams<{ videoId: string; name: string }>();
  const { getAccessToken } = useAuth();

  const [source, setSource] = useState<{ uri: string; headers: Record<string, string> } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadSource = () => {
    setError(null);
    setSource(null);
    getAccessToken()
      .then((token) => {
        setSource({
          uri: getStreamUrl(videoId),
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .catch(() => setError('Failed to load video. Check your connection and try again.'));
  };

  useEffect(() => { loadSource(); }, [videoId]);

  const title = name?.replace(/\.mp4$/i, '') ?? '';

  return (
    <>
      <Stack.Screen options={{ title, headerBackTitle: 'Entries' }} />
      <View style={styles.container}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable style={styles.retryButton} onPress={loadSource}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : source ? (
          <Player source={source} />
        ) : (
          <ActivityIndicator color="#fff" size="large" />
        )}
      </View>
    </>
  );
}