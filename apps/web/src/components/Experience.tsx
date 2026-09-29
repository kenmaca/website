import { StyleSheet, View } from 'react-native';
import {
  Anchor,
  Button,
  Card,
  Chip,
  Container,
  Icon,
  Reveal,
  Text,
  radii,
  space,
  useTheme,
} from '@kenma/ui';

import { education, experience, toolbox, type Company } from '@/content/experience';
import { profile } from '@/content/profile';
import { SectionHeader } from './SectionHeader';

export function Experience() {
  const { colors } = useTheme();
  return (
    <Container>
      <View style={styles.columns}>
        {/* Pinned beside the timeline only when the two sit side by side (see
            `[data-km-sticky]` in styles/global.ts); stacked, it scrolls normally. */}
        <View style={styles.aside} {...({ dataSet: { kmSticky: '' } } as object)}>
          <SectionHeader
            index="04"
            eyebrow="Experience"
            title="The full picture"
            description="A decade of shipping with React and React Native — from founding a startup at UofT to leading platform and mobile teams, and now R&D."
          />
          <Reveal delay={100} style={styles.asideBlock}>
            <Text variant="eyebrow" tone="subtle">
              Toolbox
            </Text>
            {[toolbox.current, toolbox.past].map((group, index) => (
              <View key={group.label} style={styles.toolGroup}>
                <Text variant="caption" tone="muted" weight="600">
                  {group.label}
                </Text>
                <View style={styles.chips}>
                  {group.tools.map((tool) => (
                    <Chip key={tool} label={tool} tone={index === 0 ? 'accent' : 'neutral'} />
                  ))}
                </View>
              </View>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <Card style={styles.education}>
              <View style={[styles.educationIcon, { backgroundColor: colors.accentSoft }]}>
                <Icon name="graduationCap" color={colors.accent} size={22} />
              </View>
              <View style={styles.flex}>
                <Text variant="subheading">{education.school}</Text>
                <Text variant="caption" tone="muted">
                  {education.degree} · {education.years}
                </Text>
              </View>
            </Card>
          </Reveal>
          <Reveal delay={300}>
            <Button label="Download resume" href={profile.links.resume} variant="secondary" icon="file" newTab />
          </Reveal>
        </View>

        <View style={styles.timeline} role="list">
          {experience.map((company, index) => (
            <Reveal key={company.id} delay={index * 60} role="listitem">
              <CompanyCard company={company} />
            </Reveal>
          ))}
        </View>
      </View>
    </Container>
  );
}

function CompanyCard({ company }: { company: Company }) {
  const { colors } = useTheme();
  return (
    <Card style={styles.company}>
      <View style={styles.companyHeader}>
        <View style={[styles.monogram, { backgroundColor: company.color }]}>
          <Text style={styles.monogramText}>{company.name.charAt(0)}</Text>
        </View>
        <View style={styles.flex}>
          {company.url ? (
            <Anchor href={company.url} variant="heading" color={colors.text} underline={false}>
              {company.name}
            </Anchor>
          ) : (
            <Text variant="heading">{company.name}</Text>
          )}
          <Text variant="caption" tone="subtle">
            {company.tenure} · {company.location}
          </Text>
        </View>
      </View>

      <View style={styles.roles}>
        <View style={[styles.rail, { backgroundColor: colors.border }]} />
        {company.roles.map((role) => {
          const current = role.end === 'Present';
          return (
            <View key={role.title} style={styles.role}>
              <View
                style={[
                  styles.roleDot,
                  { backgroundColor: current ? '#34D399' : colors.surface, borderColor: current ? '#34D399' : colors.borderStrong },
                ]}
                {...(current ? ({ dataSet: { kmPulse: '' } } as object) : null)}
              />
              <View style={styles.roleBody}>
                <Text variant="subheading">{role.title}</Text>
                <Text variant="caption" tone={current ? 'accent' : 'subtle'} weight={current ? '600' : '400'}>
                  {role.start} – {role.end}
                  {role.location ? ` · ${role.location}` : ''}
                </Text>
                {role.summary ? (
                  <Text tone="muted" style={styles.summary}>
                    {role.summary}
                  </Text>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}


const DOT = 12;

const styles = StyleSheet.create({
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: space[12],
  },
  aside: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 320,
    gap: space[6],
  },
  asideBlock: {
    gap: space[3],
  },
  toolGroup: {
    gap: space[2],
    marginTop: space[1],
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[2],
  },
  education: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[4],
    padding: space[5],
  },
  educationIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    gap: 2,
  },
  timeline: {
    flexGrow: 1.6,
    flexShrink: 1,
    flexBasis: 440,
    gap: space[5],
  },
  company: {
    gap: space[5],
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[4],
  },
  monogram: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  roles: {
    gap: space[5],
    position: 'relative',
  },
  rail: {
    position: 'absolute',
    left: DOT / 2 - 1,
    top: DOT,
    bottom: DOT,
    width: 2,
    borderRadius: 1,
  },
  role: {
    flexDirection: 'row',
    gap: space[4],
  },
  roleDot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    borderWidth: 2,
    marginTop: 6,
  },
  roleBody: {
    flex: 1,
    gap: 2,
  },
  summary: {
    marginTop: space[1],
  },
});
