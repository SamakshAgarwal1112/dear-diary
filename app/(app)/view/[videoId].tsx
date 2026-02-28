import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Phase 5: expo-video player with Drive streaming URL goes here.
export default function VideoPlayerScreen() {
  const { videoId } = useLocalSearchParams<{ videoId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Player for: {videoId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  placeholder: {
    color: '#fff',
    fontSize: 16,
  },
});
