import type { DriveVideoFile } from '@/services/drive';
import { styles } from '@/styles/viewStyles';
import { formatDate, stripExtension } from '@/utils/helpers';
import { Image } from 'expo-image';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

export function EntryRow({
    item,
    token,
    onPress,
  }: {
    item: DriveVideoFile;
    token: string;
    onPress: () => void;
  }) {
    return (
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        onPress={onPress}>
        {item.thumbnailLink ? (
          <Image
            source={{
              uri: `${item.thumbnailLink}=w320-h180`,
              headers: { Authorization: `Bearer ${token}` },
            }}
            style={styles.thumbnail}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
            <Text style={styles.thumbnailIcon}>▶</Text>
          </View>
        )}
  
        <View style={styles.itemMeta}>
          <Text style={styles.itemName} numberOfLines={2}>
            {stripExtension(item.name)}
          </Text>
          <Text style={styles.itemDate}>{formatDate(item.createdTime)}</Text>
        </View>
      </Pressable>
    );
}