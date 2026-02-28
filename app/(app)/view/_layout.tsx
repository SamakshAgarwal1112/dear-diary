import { Stack } from 'expo-router';

export default function ViewLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'My Entries', headerShown: true }} />
      <Stack.Screen name="[videoId]" options={{ title: '', headerShown: true }} />
    </Stack>
  );
}
