import { Image, StyleSheet } from 'react-native';

/** Native: the hero photo as a dimmed, full-bleed image. */
export function HeroPhoto() {
  return (
    <Image
      source={require('@/assets/images/hero.jpg')}
      resizeMode="cover"
      style={[StyleSheet.absoluteFill, styles.photo]}
    />
  );
}

const styles = StyleSheet.create({
  photo: {
    opacity: 0.35,
    filter: 'grayscale(1) contrast(1.1)',
  },
});
