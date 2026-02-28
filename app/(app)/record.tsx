import { View, Text, StyleSheet } from 'react-native';

// Phase 3: Camera, recording controls, save/discard modal goes here.
export default function RecordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Camera coming in Phase 3</Text>
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
