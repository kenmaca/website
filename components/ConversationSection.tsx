import { View, Text, StyleSheet, Linking, Pressable, Image } from 'react-native';
import { ChatBubble, ChatLabel, ChatText, ChatLink, ChatImageBubble } from './ChatBubble';
import { colors, spacing } from '@/constants/theme';

export function IntroConversation() {
  return (
    <View style={styles.container}>
      <ChatLabel name="Kenneth" type="me" />
      <ChatBubble type="from" isEnd>
        <ChatText>Heya! How's it going?</ChatText>
      </ChatBubble>

      <ChatLabel name="You" type="you" />
      <ChatBubble type="to" isEnd>
        <ChatText>Hi! I'm interested in your profile and would like to learn more about your career.</ChatText>
      </ChatBubble>

      <ChatBubble type="from">
        <ChatText>Cool!</ChatText>
      </ChatBubble>
      <ChatBubble type="from" isEnd>
        <Text style={styles.bubbleText}>
          I'm currently a Sr. Engineering Manager @{' '}
          <ChatLink href="https://borrowell.com">Borrowell</ChatLink>
          {' '}and leading the Platform Engineering and Mobile Product group
        </Text>
      </ChatBubble>
    </View>
  );
}

export function DetailConversation() {
  return (
    <View style={styles.container}>
      <ChatLabel name="You" type="you" />
      <ChatBubble type="to" isEnd>
        <ChatText>Dope!</ChatText>
        <ChatText>Can you tell me more about your role at Borrowell?</ChatText>
      </ChatBubble>

      <ChatLabel name="Kenneth" type="me" />
      <ChatBubble type="from">
        <ChatText>I lead 3 separate teams with 11 Engineers and an Engineering Manager and currently report into the VP of Engineering</ChatText>
      </ChatBubble>
      <ChatBubble type="from" isEnd>
        <ChatText>I'm primarily responsible for the establishment of our new Platform Engineering group with the mandate of ensuring that development efforts and best practices are shared across the company</ChatText>
        <View style={styles.textSpacer} />
        <ChatText>I also continue to manage the Mobile Product engineering team, something that has remained with me since I joined Borrowell in 2019</ChatText>
      </ChatBubble>

      <ChatLabel name="You" type="you" />
      <ChatBubble type="to" isEnd>
        <ChatText>Can you be more specific about some projects or accomplishments?</ChatText>
      </ChatBubble>

      <ChatLabel name="Kenneth" type="me" />
      <ChatBubble type="from">
        <ChatText>Yeah, absolutely</ChatText>
      </ChatBubble>
      <ChatBubble type="from" isEnd>
        <ChatText>My personal stack is primarily front-end and hybrid mobile: react-native, redux, redux-observables, and rxjs</ChatText>
      </ChatBubble>

      <ChatLabel name="Kenneth" type="me" />
      <Pressable onPress={() => Linking.openURL('https://www.theglobeandmail.com/investing/personal-finance/household-finances/article-borrowell-to-start-reporting-rent-payments-to-equifax-canada/')}>
        <View style={styles.rentAdvantageImage}>
          <Image
            source={require('@/assets/index/rent-advantage.jpeg')}
            style={styles.fullImage}
            resizeMode="cover"
          />
        </View>
      </Pressable>

      <ChatBubble type="from">
        <Text style={styles.bubbleText}>
          I recently led the engineering effort behind{' '}
          <ChatLink href="https://borrowell.com/rent-advantage">Rent Advantage</ChatLink>
          , a first-to-market service to help Canadians build credit history with Equifax by reporting rent payments
        </Text>
      </ChatBubble>
      <ChatBubble type="from" isEnd>
        <ChatText>Partnering with Equifax Canada, we launched Borrowell's first subscription-based service in 2022</ChatText>
        <View style={styles.textSpacer} />
        <ChatText>We went from ideation and forming a new team to our members subscribing to the paid service in just 8 weeks</ChatText>
      </ChatBubble>

      <ChatLabel name="You" type="you" />
      <ChatBubble type="to" isEnd>
        <ChatText>Pretty lit</ChatText>
        <ChatText>What else have you done?</ChatText>
      </ChatBubble>

      <ChatLabel name="Kenneth" type="me" />
      <ChatBubble type="from">
        <ChatText>Quite a bit more, but I'm not done my site yet</ChatText>
        <ChatText>Perhaps you'd like to chat IRL and learn more?</ChatText>
      </ChatBubble>
      <ChatBubble type="from">
        <Text style={styles.bubbleText}>
          You can email me at{' '}
          <ChatLink href="mailto:ken@kenma.ca">ken@kenma.ca</ChatLink>
        </Text>
      </ChatBubble>
      <ChatBubble type="from" isEnd>
        <Text style={styles.bubbleText}>
          .. or on{' '}
          <ChatLink href="https://linkedin.com/in/kenmaca">LinkedIn</ChatLink>
        </Text>
      </ChatBubble>

      <ChatLabel name="You" type="you" />
      <ChatBubble type="to" isEnd>
        <ChatText>What if I don't want to chat just yet?</ChatText>
      </ChatBubble>

      <ChatLabel name="Kenneth" type="me" />
      <ChatBubble type="from">
        <ChatText>Sorry</ChatText>
      </ChatBubble>
      <ChatBubble type="from" isEnd>
        <Text style={styles.bubbleText}>
          .. but here's my (less exciting){' '}
          <ChatLink href="https://kenma.ca/assets/index/ken.pdf">resume</ChatLink>
          {' '}until then
        </Text>
      </ChatBubble>

      <ChatLabel name="You" type="you" />
      <ChatBubble type="to" isEnd>
        <ChatText>Bye!</ChatText>
      </ChatBubble>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.dark,
  },
  textSpacer: {
    height: spacing.sm,
  },
  rentAdvantageImage: {
    marginLeft: spacing.md,
    marginBottom: 2,
    borderRadius: 20,
    overflow: 'hidden',
    width: 250,
    height: 150,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
