import { Tabs } from 'expo-router';
import { Alert } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { recordingState } from '@/utils/recording-state';

export default function AppLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarLabelStyle: { fontSize: 14 },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="record"
        options={{
          title: 'Record',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="video.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="view"
        options={{
          title: 'View',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="play.rectangle.fill" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (recordingState.isActive) {
              e.preventDefault();
              Alert.alert('Recording in progress', 'Stop recording before switching tabs.');
            }
          },
        }}
      />
    </Tabs>
  );
}
