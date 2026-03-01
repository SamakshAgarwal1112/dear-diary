import CameraRecorder from '@/components/cameraRecorder';
import PermissionPrompt from '@/components/permissionPrompt';
import { styles } from '@/styles/recordStyles';
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import {
  View,
} from 'react-native';

export default function RecordScreen() {
  const [cameraPermission, requestCamera] = useCameraPermissions();
  const [micPermission, requestMic] = useMicrophonePermissions();

  if (!cameraPermission || !micPermission) {
    return <View style={styles.container} />;
  }

  if (!cameraPermission.granted || !micPermission.granted) {
    return (
      <PermissionPrompt
        onRequest={async () => {
          await requestCamera();
          await requestMic();
        }}
      />
    );
  }

  return <CameraRecorder />;
}