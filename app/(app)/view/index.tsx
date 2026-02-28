import { View, Text, StyleSheet } from 'react-native';

// Phase 5: Drive video list, thumbnails, pull-to-refresh goes here.
export default function ViewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Your entries will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  placeholder: {
    fontSize: 16,
    color: '#687076',
  },
});
