import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 750;

export default function BorrowellSection() {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/index/borrowell.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Platform Engineering</Text>
          <Text style={styles.feature}>Borrowell</Text>
          <Text style={styles.print}>
            We're a fintech scale-up based in Toronto, Canada that's trusted by over 2 million Canadians with the mission of making financial prosperity possible.
          </Text>
          <View style={styles.divider} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginHorizontal: isSmallScreen ? 0 : spacing.xl,
    marginVertical: spacing.lg,
  },
  content: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    alignItems: isSmallScreen ? 'center' : 'flex-start',
  },
  imageContainer: {
    width: isSmallScreen ? '100%' : '33%',
    marginBottom: isSmallScreen ? spacing.lg : 0,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  textContainer: {
    flex: 1,
    paddingLeft: isSmallScreen ? 0 : spacing.lg,
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  feature: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  print: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '300',
    lineHeight: 28,
  },
  divider: {
    width: 48,
    height: 6,
    backgroundColor: colors.white,
    marginTop: spacing.xl,
  },
});
