import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#e5e5e5',
    },
    headingText: {
      fontSize: 22,
      fontWeight: '700',
      color: '#11181C',
    },
    flatList: {
      flex: 1,
    },
    listContent: {
      padding: 16,
      gap: 12,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#f0f0f0',
      backgroundColor: '#fff',
      overflow: 'hidden',
    },
    itemPressed: {
      opacity: 0.65,
    },
    thumbnail: {
      width: 120,
      height: 68,
    },
    thumbnailPlaceholder: {
      backgroundColor: '#1c1c1e',
      justifyContent: 'center',
      alignItems: 'center',
    },
    thumbnailIcon: {
      color: '#555',
      fontSize: 18,
    },
    itemMeta: {
      flex: 1,
      paddingHorizontal: 14,
      gap: 4,
    },
    itemName: {
      fontSize: 15,
      fontWeight: '600',
      color: '#11181C',
    },
    itemDate: {
      fontSize: 13,
      color: '#687076',
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#11181C',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: '#687076',
      textAlign: 'center',
    },
    errorText: {
      fontSize: 15,
      color: '#c0392b',
      textAlign: 'center',
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: '#0a7ea4',
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 8,
    },
    retryText: {
      color: '#fff',
      fontWeight: '600',
    },
});  