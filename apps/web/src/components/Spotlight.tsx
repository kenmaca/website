import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Icon,
  Reveal,
  Text,
  linkProps,
  responsive,
  radii,
  space,
  transition,
  useInteractionState,
  webStyle,
} from '@kenma/ui';

export interface SpotlightStat {
  value: string;
  label: string;
}

export interface SpotlightProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Brand gradient, top-left → bottom-right. */
  gradient: readonly [string, string, ...string[]];
  stats?: SpotlightStat[];
  image?: { source: ImageSourcePropType; alt: string; fit?: 'cover' | 'contain'; aspectRatio?: number; maxWidth?: number };
  /** Brand logo shown in place of the text title (the title stays as its accessible name). */
  logo?: SpotlightLogo;
  /** Oversized, faded logo in the card background (used when there's no image). */
  watermark?: Omit<SpotlightLogo, 'height' | 'plate'>;
  link?: { label: string; href: string };
  /** Hold the entrance until this is true (e.g. the conversation above has finished). */
  ready?: boolean;
}

export interface SpotlightLogo {
  source: ImageSourcePropType;
  /** width / height of the artwork. */
  aspectRatio: number;
  /** Rendered height in px. */
  height?: number;
  /** Sit the logo on a white plate — for full-colour logos that need a light background. */
  plate?: boolean;
}

const ON_DARK = '#FFFFFF';
const ON_DARK_MUTED = 'rgba(255, 255, 255, 0.78)';

/** A bold, brand-coloured feature card for a company or project. The whole card is the link. */
export function Spotlight({ eyebrow, title, description, gradient, stats, image, logo, watermark, link, ready = true }: SpotlightProps) {
  const { state, handlers } = useInteractionState();

  return (
    <Reveal from="scale" duration={1000} delay={150} when={ready}>
      <Pressable
        {...handlers}
        {...(link ? linkProps(link.href) : { focusable: false })}
        disabled={!link}
        style={[
          styles.card,
          { transform: [{ translateY: state.hovered ? -4 : 0 }] },
          state.hovered ? styles.cardHover : styles.cardRest,
          clipWeb,
          transition(['transform', 'box-shadow'], 400),
        ]}
      >
        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, sheenWeb]} pointerEvents="none" />
        {watermark && !image ? (
          <View style={styles.watermark} pointerEvents="none" aria-hidden {...responsive({ hideBelow: 'md' })}>
            <Image
              source={watermark.source}
              resizeMode="contain"
              style={[
                styles.watermarkImage,
                { aspectRatio: watermark.aspectRatio },
                { transform: [{ translateX: state.hovered ? -12 : 0 }, { rotate: '-6deg' }] },
                transition(['transform'], 700),
              ]}
            />
          </View>
        ) : null}

        <View style={styles.body}>
          <View style={styles.copy}>
            <Text variant="eyebrow" style={styles.eyebrow}>
              {eyebrow}
            </Text>
            {logo ? (
              <View role="heading" aria-level={3} aria-label={title} style={[styles.logoRow, logo.plate && styles.logoPlate]}>
                <Image
                  source={logo.source}
                  alt={title}
                  accessibilityLabel={title}
                  resizeMode="contain"
                  style={{ height: logo.height ?? 44, width: (logo.height ?? 44) * logo.aspectRatio }}
                />
              </View>
            ) : (
              <Text variant="title" level={3} style={styles.title}>
                {title}
              </Text>
            )}
            <Text variant="lead" style={styles.description}>
              {description}
            </Text>

            {stats?.length ? (
              <View style={styles.stats}>
                {stats.map((stat) => (
                  <View key={stat.label} style={styles.stat}>
                    <Text variant="heading" style={styles.statValue}>
                      {stat.value}
                    </Text>
                    <Text variant="caption" style={styles.statLabel}>
                      {stat.label}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            {link ? (
              <View style={styles.link}>
                <Text variant="label" style={styles.linkLabel}>
                  {link.label}
                </Text>
                <View style={[{ transform: [{ translateX: state.hovered ? 3 : 0 }, { translateY: state.hovered ? -3 : 0 }] }, transition(['transform'])]}>
                  <Icon name="arrowUpRight" color={ON_DARK} size={18} />
                </View>
              </View>
            ) : null}
          </View>

          {image ? (
            <View style={styles.media}>
              <Image
                source={image.source}
                alt={image.alt}
                accessibilityLabel={image.alt}
                resizeMode={image.fit ?? 'cover'}
                style={[
                  styles.image,
                  { aspectRatio: image.aspectRatio ?? 4 / 3, maxWidth: image.maxWidth ?? 440 },
                  image.fit !== 'contain' && styles.imageFramed,
                  { transform: [{ scale: state.hovered ? 1.03 : 1 }] },
                  transition(['transform'], 600),
                ]}
              />
            </View>
          ) : null}
        </View>
      </Pressable>
    </Reveal>
  );
}

const sheenWeb = webStyle({
  backgroundImage:
    'radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(0,0,0,0.25), transparent 60%)',
});

const clipWeb = webStyle({ overflow: 'clip' });

const styles = StyleSheet.create({
  watermark: {
    position: 'absolute',
    right: '-4%',
    bottom: '-12%',
    width: '58%',
    maxWidth: 620,
    opacity: 0.12,
  },
  watermarkImage: {
    width: '100%',
    height: 'auto',
  },
  logoRow: {
    alignSelf: 'flex-start',
    marginVertical: space[1],
  },
  logoPlate: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    boxShadow: '0 12px 30px -16px rgba(0, 0, 0, 0.45)',
  },
  card: {
    borderRadius: radii.xl + 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cardRest: {
    boxShadow: '0 30px 60px -40px rgba(0, 0, 0, 0.6)',
  },
  cardHover: {
    boxShadow: '0 40px 80px -36px rgba(0, 0, 0, 0.7)',
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space[10],
    padding: space[10],
  },
  copy: {
    flexGrow: 1.3,
    flexShrink: 1,
    flexBasis: 320,
    gap: space[4],
  },
  eyebrow: {
    color: ON_DARK_MUTED,
  },
  title: {
    color: ON_DARK,
  },
  description: {
    color: ON_DARK_MUTED,
    maxWidth: 560,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[6],
    marginTop: space[2],
    paddingTop: space[5],
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.18)',
  },
  stat: {
    minWidth: 120,
    flexShrink: 1,
    gap: 2,
  },
  statValue: {
    color: ON_DARK,
  },
  statLabel: {
    color: ON_DARK_MUTED,
    maxWidth: 180,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: space[1],
    marginTop: space[2],
    paddingVertical: space[1],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
  },
  linkLabel: {
    color: ON_DARK,
  },
  media: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 280,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  imageFramed: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
