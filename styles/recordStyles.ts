import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
  
    // Permissions
    permissionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 12,
      textAlign: 'center',
    },
    permissionBody: {
      fontSize: 15,
      color: '#687076',
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 22,
    },
  
    // HUD
    hud: {
      position: 'absolute',
      top: 56,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
    },
    recordingDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#ff3b30',
    },
    timerText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
  
    // Record button
    controls: {
      position: 'absolute',
      bottom: 60,
      alignSelf: 'center',
    },
    recordButtonRing: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordButtonCore: {
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: '#ff3b30',
    },
    recordButtonStop: {
      width: 32,
      height: 32,
      borderRadius: 6,
    },
  
    // Modal
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.45)',
    },
    sheet: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 28,
      paddingBottom: 48,
      gap: 4,
    },
    sheetTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 16,
    },
    fieldLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: '#687076',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: 12,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 16,
      color: '#11181C',
    },
    folderRow: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    folderName: {
      fontSize: 16,
      color: '#11181C',
    },
  
    // Shared buttons
    primaryButton: {
      backgroundColor: '#0a7ea4',
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    discardButton: {
      alignItems: 'center',
      paddingVertical: 14,
    },
    discardText: {
      color: '#687076',
      fontSize: 15,
    },
  
    // Upload progress
    progressTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: '#e0e0e0',
      overflow: 'hidden',
      marginTop: 12,
    },
    progressFill: {
      height: '100%',
      borderRadius: 3,
      backgroundColor: '#0a7ea4',
    },
    progressText: {
      fontSize: 13,
      color: '#687076',
      textAlign: 'right',
      marginTop: 4,
    },
    errorText: {
      fontSize: 13,
      color: '#c0392b',
      marginTop: 8,
      textAlign: 'center',
    },
  });
  