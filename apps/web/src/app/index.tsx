import Head from 'expo-router/head';
import { Container } from '@kenma/ui';

import { ContactCard } from '@/components/Contact';
import { Chapter } from '@/components/Chapter';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { NavBar } from '@/components/NavBar';
import { Page } from '@/components/Page';
import { Section } from '@/components/Section';
import { Spotlight } from '@/components/Spotlight';
import {
  acvIntroConversation,
  acvWorkConversation,
  borrowellIntroConversation,
  borrowellWorkConversation,
  contactConversation,
  earlyDaysConversation,
} from '@/content/conversations';
import { profile } from '@/content/profile';

// The site's original <title>, kept for continuity (bookmarks, search results).
const title = "Hi, I'm Kenneth.";
const description = profile.about;

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  worksFor: { '@type': 'Organization', name: profile.company, url: 'https://www.acvauctions.com' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Toronto' },
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  sameAs: [profile.links.linkedin, profile.links.github],
};

export default function Home() {
  return (
    <Page>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={profile.name} />
        <link rel="canonical" href={`${profile.siteUrl}/`} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${profile.siteUrl}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${profile.siteUrl}/og.jpg`} />
        <meta property="profile:first_name" content="Kenneth" />
        <meta property="profile:last_name" content="Ma" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${profile.siteUrl}/og.jpg`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>

      <NavBar />
      <Hero />

      <Chapter
        id="story"
        index="01"
        eyebrow="Currently"
        title={`${profile.role} at ${profile.company}`}
        messages={acvIntroConversation}
        after={acvWorkConversation}
      >
        {(ready) => (
          <Container>
            <Spotlight
              ready={ready}
              eyebrow="Oct 2023 – Present · Toronto"
              title="ACV Auctions"
              description="ACV is transforming how dealers buy and sell vehicles wholesale, with digital auctions backed by data and vehicle-inspection technology. I'm on the R&D team."
              gradient={['#FF7A45', '#E0344F', '#5A1334']}
              stats={[
                { value: '3 yrs', label: 'and counting' },
                { value: 'Staff', label: 'Engineer, R&D since March 2026' },
                { value: 'Lead', label: 'Engineering Lead, R&D from 2023' },
              ]}
              logo={{ source: require('@/assets/images/acv-logo.svg'), aspectRatio: 72 / 32, height: 52 }}
              watermark={{ source: require('@/assets/images/acv-logo.svg'), aspectRatio: 72 / 32 }}
              link={{ label: 'acvauctions.com', href: 'https://www.acvauctions.com' }}
            />
          </Container>
        )}
      </Chapter>

      <Chapter
        index="02"
        eyebrow="Previously"
        title="Five years at Borrowell"
        messages={borrowellIntroConversation}
        after={borrowellWorkConversation}
      >
        {(ready) => (
          <Container>
            <Spotlight
              ready={ready}
              eyebrow="Dec 2018 – Oct 2023 · Platform & Mobile"
              title="Borrowell"
              description="A Toronto fintech trusted by over 2 million Canadians, on a mission to make financial prosperity possible."
              gradient={['#A24BD1', '#6A36C8', '#2E1B7A']}
              logo={{
                source: require('@/assets/images/borrowell-logo.png'),
                aspectRatio: 1157 / 263,
                height: 34,
                plate: true,
              }}
              stats={[
                { value: '#1', label: 'First mobile engineer hired' },
                { value: '3 teams', label: 'Led across the Platform organization' },
                { value: '11', label: 'Reports, including 1 manager' },
              ]}
              image={{
                source: require('@/assets/images/borrowell.png'),
                alt: 'Illustration of a person holding a credit report beside a laptop showing a credit score of 738',
                fit: 'contain',
                aspectRatio: 1000 / 752,
              }}
              link={{ label: 'borrowell.com', href: 'https://borrowell.com' }}
            />
          </Container>
        )}
      </Chapter>

      <Chapter index="03" eyebrow="Early days" title="Startups, and one of my own" messages={earlyDaysConversation}>
        {(ready) => (
          <Container>
            <Spotlight
              ready={ready}
              eyebrow="Dec 2015 – Dec 2017 · CEO"
              title="Frrand"
              description="A peer-to-peer delivery app: anyone could post an errand and have someone nearby run it for them. I started it while studying Computer Science at UofT."
              gradient={['#7CC444', '#3C8F2F', '#12351A']}
              stats={[
                { value: 'The Hub', label: 'Funded through The Hub @ UTSC startup accelerator' },
                { value: 'React Native', label: 'One codebase for the iOS & Android apps' },
                { value: 'MongoDB', label: 'Sharded cluster on AWS EC2' },
                { value: 'Python', label: 'Custom REST API in Flask & Python Eve' },
              ]}
              image={{
                source: require('@/assets/images/frrand.jpg'),
                alt: 'The Frrand team working at a table under a green Frrand banner',
                aspectRatio: 3 / 4,
                maxWidth: 340,
              }}
            />
          </Container>
        )}
      </Chapter>

      <Section id="experience">
        <Experience />
      </Section>

      <Chapter id="contact" index="05" eyebrow="Contact" title="Let's chat" messages={contactConversation}>
        {(ready) => <ContactCard ready={ready} />}
      </Chapter>

      <Footer />
    </Page>
  );
}
