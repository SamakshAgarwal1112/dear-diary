import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    errorContainer: {
      alignItems: 'center',
      padding: 32,
    },
    errorText: {
      color: '#ff6b6b',
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 20,
    },
    retryButton: {
      backgroundColor: '#0a7ea4',
      paddingHorizontal: 28,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 15,
    },
  });
