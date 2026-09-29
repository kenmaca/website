import Head from 'expo-router/head';
import { StyleSheet, View } from 'react-native';
import { Button, ChatThread, Container, Text, space } from '@kenma/ui';

import { Page } from '@/components/Page';
import { participants } from '@/content/conversations';

export default function NotFound() {
  return (
    <Page>
      <Head>
        <title>{"Page not found — Hi, I'm Kenneth."}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Container width="readable" style={styles.container}>
        <Text variant="display" level={1}>
          404
        </Text>
        <ChatThread
          participants={participants}
          messages={[
            { direction: 'outgoing', text: 'Uh… where am I?' },
            { direction: 'incoming', text: "Hmm, that page doesn't exist 🤔" },
            { direction: 'incoming', text: 'Let me take you back home' },
          ]}
        />
        <View>
          <Button label="Back to ken.ma" href="/" icon="arrowRight" variant="primary" size="lg" />
        </View>
      </Container>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: space[10],
    paddingVertical: space[24],
  },
});
