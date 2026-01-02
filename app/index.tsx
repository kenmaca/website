import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroSection from '@/components/HeroSection';
import BorrowellSection from '@/components/BorrowellSection';
import { IntroConversation, DetailConversation } from '@/components/ConversationSection';
import { colors } from '@/constants/theme';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        <View style={styles.chatSection}>
          <IntroConversation />
        </View>
        <BorrowellSection />
        <View style={styles.chatSection}>
          <DetailConversation />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
  },
  chatSection: {
    backgroundColor: colors.white,
  },
});
