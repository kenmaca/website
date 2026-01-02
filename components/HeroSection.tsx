import { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function HeroSection() {
  const heroOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(0);
  const featureOpacity = useSharedValue(0);
  const featureTranslateY = useSharedValue(0);
  const printOpacity = useSharedValue(0);
  const printTranslateY = useSharedValue(0);
  const dividerOpacity = useSharedValue(0);
  const dividerTranslateY = useSharedValue(0);
  const signatureOpacity = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(0.1, { duration: 500 });

    subtitleOpacity.value = withDelay(0, withTiming(1, { duration: 500 }));
    subtitleTranslateY.value = withDelay(0, withTiming(-30, { duration: 500, easing: Easing.out(Easing.exp) }));

    featureOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
    featureTranslateY.value = withDelay(300, withTiming(-30, { duration: 500, easing: Easing.out(Easing.exp) }));

    printOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    printTranslateY.value = withDelay(600, withTiming(-30, { duration: 500, easing: Easing.out(Easing.exp) }));

    dividerOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    dividerTranslateY.value = withDelay(600, withTiming(-30, { duration: 500, easing: Easing.out(Easing.exp) }));

    signatureOpacity.value = withDelay(1000, withTiming(0.9, { duration: 500 }));
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const featureStyle = useAnimatedStyle(() => ({
    opacity: featureOpacity.value,
    transform: [{ translateY: featureTranslateY.value }],
  }));

  const printStyle = useAnimatedStyle(() => ({
    opacity: printOpacity.value,
    transform: [{ translateY: printTranslateY.value }],
  }));

  const dividerStyle = useAnimatedStyle(() => ({
    opacity: dividerOpacity.value,
    transform: [{ translateY: dividerTranslateY.value }],
  }));

  const signatureStyle = useAnimatedStyle(() => ({
    opacity: signatureOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.hero, heroStyle]}>
        <Image
          source={require('@/assets/index/hero.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </Animated.View>

      <View style={styles.content}>
        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          Heya! I'm
        </Animated.Text>
        <Animated.Text style={[styles.feature, featureStyle]}>
          Kenneth Ma
        </Animated.Text>
        <Animated.Text style={[styles.print, printStyle]}>
          Sr. Engineering Manager @ Borrowell, leading the both the Platform and Mobile Engineering group
        </Animated.Text>
        <Animated.View style={[styles.divider, dividerStyle]} />
      </View>

      <Animated.View style={[styles.signatureBox, signatureStyle]}>
        <Svg viewBox="0 0 232.72 97.47" style={styles.signature}>
          <Path
            d="M1,41.74l-.51.93"
            fill="none"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M232.62,20.66C181,11,126.55,11,76.64,28.69A275.25,275.25,0,0,0,38.58,45.64C28.07,51.27,2,63.64,2,78.43,2,101.6,43.39,99.19,56,91.86c16-9.31,23.85-27.61,22.17-45.7C76.9,33,71.61,20.24,60.87,14.69c-4.7-2.42-9.15-2.66-12.7-2.88C34.38,11,24.09,17.35,20,20A54.3,54.3,0,0,0,4.42,35.14"
            fill="none"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M78.94,44.26c-1.44,1.85,13.8-21,3.39-13.29-2.81,2.07.22,12.14,2.74,11.33,1.4-.45,3.26-12.77,6.29-13,2.38-.22.24,10.09.17,11.52h0Q94.91,34.25,98,27.67c2.16-.36-1.18,11.16,2,11,3.54-.22,7.86-12.74,5.15-12.65-4.05.12-5.09,14,1.5,11.4,4.38-1.72,2.32-16.77,3.5-17.08,2.28-.59,0,15.32,2.67,14.71,1.71-.4,2.18-16.64,3.21-16.87s.2,20.44.29,15.84q-1.21-3.68,2.65-7.19c4.77-1.14,3.09,2.73,3.73,5.75"
            fill="none"
            stroke={colors.white}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M114.49,40.81c-.05.12,8-41.42,12-40.29,4.8,1.34-5,40.44-2.37,40.94,3,.58,8.67-40.53,13-40.25,6.66.42-1.37,42.93-.92,47.66"
            fill="none"
            stroke={colors.white}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M136.3,19.75c-1.38-.23-13.71,5.31-7.33,9.33,4.75,3,7.41-7.48,11.57-7.92,13.62-1.42,27.17,0,40.76,1.58"
            fill="none"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M83.05,26.9c-32,4.78,27.38,20.33,35.67,20.33"
            fill="none"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: SCREEN_HEIGHT * 0.85,
    backgroundColor: colors.dark,
    position: 'relative',
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: 0,
    bottom: '20%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  content: {
    paddingTop: 120,
    paddingHorizontal: spacing.lg,
    paddingLeft: spacing.xl,
  },
  subtitle: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  feature: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  print: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '300',
    lineHeight: 28,
    maxWidth: 400,
  },
  divider: {
    width: 48,
    height: 6,
    backgroundColor: colors.white,
    marginTop: spacing.xl,
  },
  signatureBox: {
    position: 'absolute',
    bottom: '8%',
    right: '5%',
    width: 200,
    height: 80,
  },
  signature: {
    width: '100%',
    height: '100%',
  },
});
