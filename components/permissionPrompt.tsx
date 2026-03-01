import { styles } from '@/styles/recordStyles';
import { Pressable, Text, View } from 'react-native';

export default function PermissionPrompt({ onRequest }: { onRequest: () => void }) {
  return (
    <View style={[styles.container, styles.centered, { backgroundColor: '#fff' }]}>
      <Text style={styles.permissionTitle}>Camera Access Required</Text>
      <Text style={styles.permissionBody}>
        Dear Diary needs your camera and microphone to record entries.
      </Text>
      <Pressable style={styles.primaryButton} onPress={onRequest}>
        <Text style={styles.primaryButtonText}>Grant Access</Text>
      </Pressable>
    </View>
  );
}