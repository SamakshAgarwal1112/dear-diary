import SaveSheet from '@/components/saveSheet';
import { styles } from '@/styles/recordStyles';
import { formatElapsed } from '@/utils/record';
import { recordingState } from '@/utils/recording-state';
import { CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useRef, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function CameraRecorder() {
  const cameraRef = useRef<CameraView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRecordingRef = useRef(false);

  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const setRecording = (val: boolean) => {
    isRecordingRef.current = val;
    recordingState.isActive = val;
    setIsRecording(val);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (isRecordingRef.current) {
        cameraRef.current?.stopRecording();
        recordingState.isActive = false;
      }
    };
  }, []);

  const startTimer = () => {
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const handleRecordButton = () => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current) return;
    setRecording(true);
    startTimer();
    try {
      const video = await cameraRef.current.recordAsync();
      stopTimer();
      setRecording(false);
      if (video?.uri) {
        setRecordedUri(video.uri);
        setShowSaveModal(true);
      }
    } catch {
      stopTimer();
      setRecording(false);
    }
  };

  const handleDiscard = async () => {
    setShowSaveModal(false);
    if (recordedUri) {
      await FileSystem.deleteAsync(recordedUri, { idempotent: true });
    }
    setRecordedUri(null);
  };

  const handleSaved = () => {
    setShowSaveModal(false);
    setRecordedUri(null);
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="front"
        mode="video"
      />

      {isRecording && (
        <View style={styles.hud}>
          <View style={styles.recordingDot} />
          <Text style={styles.timerText}>{formatElapsed(elapsed)}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <Pressable style={styles.recordButtonRing} onPress={handleRecordButton}>
          <View style={[styles.recordButtonCore, isRecording && styles.recordButtonStop]} />
        </Pressable>
      </View>

      {showSaveModal && recordedUri && (
        <SaveSheet
          uri={recordedUri}
          onSaved={handleSaved}
          onDiscard={handleDiscard}
        />
      )}
    </View>
  );
}