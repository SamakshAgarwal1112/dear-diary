import { Pressable } from 'react-native';
import { Tabs } from 'expo-router';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/auth-context';

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerRight: () => (
          <Pressable
            onPress={signOut}
            style={{ marginRight: 16 }}
            hitSlop={8}>
            <IconSymbol size={22} name="rectangle.portrait.and.arrow.right" color={Colors[colorScheme ?? 'light'].icon} />
          </Pressable>
        ),
      }}>
      <Tabs.Screen
        name="record"
        options={{
          title: 'Record',
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
      />
    </Tabs>
  );
}
