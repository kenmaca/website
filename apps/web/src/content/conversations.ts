import type { ChatMessage } from '@kenma/ui';

import { profile } from './profile';

const me = (text: string): ChatMessage => ({ direction: 'incoming', text });
const you = (text: string): ChatMessage => ({ direction: 'outgoing', text });

export const participants = { incoming: profile.firstName, outgoing: 'You' } as const;

export const acvIntroConversation: ChatMessage[] = [
  me("Heya! How's it going?"),
  you("Hi! I'm interested in your profile and would like to learn more about your career."),
  me('Cool!'),
  me("I'm currently a Staff Engineer on the R&D team at [ACV Auctions](https://www.acvauctions.com) 🚗"),
  me('I joined back in 2023 as an Engineering Lead, and stepped into the Staff role in March 2026'),
];

export const acvWorkConversation: ChatMessage[] = [
  you('Nice! What kind of things do you work on in R&D?'),
  {
    direction: 'incoming',
    images: [
      {
        source: require('@/assets/images/acv-viper.jpg'),
        alt: "A pickup truck between ACV's orange VIPER inspection towers during a photo shoot",
        href: 'https://www.acvmax.com/viper',
      },
      {
        source: require('@/assets/images/acv-apex.jpg'),
        alt: "ACV's APEX device: an orange and black sensor box with a glowing green ring",
        href: 'https://www.acvauctions.com/blog/acv-2023-national-automobile-dealers-association-show',
      },
      {
        source: require('@/assets/images/acv-virtual-lift.jpg'),
        alt: "Inside ACV's R&D lab, with inspection hardware and an ACV-branded Jeep",
        href: 'https://www.acvauctions.com/blog/acv-auctions-unveils-virtual-lift',
      },
    ],
  },
  me(
    "R&D is behind the tech that powers ACV's vehicle inspections, like the [VIPER](https://www.acvmax.com/viper) inspection towers, [APEX](https://www.acvauctions.com/blog/acv-2023-national-automobile-dealers-association-show) engine diagnostics and [Virtual Lift](https://www.acvauctions.com/blog/acv-auctions-unveils-virtual-lift) undercarriage imaging",
  ),
  me('I work on the software side of things, ranging from AI-enabled applications to vendor integrations and customer-facing experiences'),
];

export const borrowellIntroConversation: ChatMessage[] = [
  you('Dope! 🤯 What were you up to before ACV?'),
  me('Five years at [Borrowell](https://borrowell.com) 💜'),
  me('I was the first mobile engineer they hired, and built and published our greenfield React Native app within my first four months'),
  me('From there I grew into Lead Developer, then Engineering Manager for Mobile & Growth, and eventually Sr. Engineering Manager of Platform'),
];

export const borrowellWorkConversation: ChatMessage[] = [
  you('Can you be more specific about some projects or accomplishments?'),
  me('Yeah, absolutely'),
  me('As Lead Developer, I built our “Effect Architecture” on redux-observables and RxJS — separating presentation and navigation logic from business logic'),
  {
    direction: 'incoming',
    image: {
      source: require('@/assets/images/rent-advantage.jpeg'),
      alt: 'The Globe and Mail: “Borrowell to start reporting rent payments to Equifax Canada”',
      aspectRatio: 4 / 3,
    },
    href: 'https://www.theglobeandmail.com/investing/personal-finance/household-finances/article-borrowell-to-start-reporting-rent-payments-to-equifax-canada/',
  },
  me('I also led the engineering effort behind [Rent Advantage](https://borrowell.com/rent-advantage), a first-to-market service helping Canadians build credit history with Equifax by reporting rent payments'),
  me('We went from ideation and forming a new team to members subscribing to the paid service in just 8 weeks'),
  me('Later on Platform, I led 3 teams with 11 reports and a manager — making sure development efforts and best practices were shared across the company'),
];

export const earlyDaysConversation: ChatMessage[] = [
  you('Pretty lit 🔥'),
  you('And before Borrowell?'),
  me('I cut my teeth at startups 🚀'),
  me('At Freckle, I led a small frontend team and streamlined our deployments with CI — App Center, Azure DevOps, Fastlane and CodePush'),
  me('At Localyyz, I redesigned both our iOS and Android apps in React Native with MobX, on a Go + PostgreSQL backend'),
  you('And before all that?'),
  me("While studying Computer Science at UofT, I started Frrand — a peer-to-peer delivery app, where anyone could get an errand run by someone nearby"),
  me('I was CEO, and we were funded as part of The Hub @ UTSC, a startup accelerator program 🌱'),
];

export const contactConversation: ChatMessage[] = [
  you('Impressive 👏 How can I get in touch?'),
  me("Perhaps you'd like to chat IRL?"),
  me(`You can email me at [${profile.email}](${profile.links.email})`),
  me(`.. or find me on [LinkedIn](${profile.links.linkedin})`),
  me(`Some of my (mostly defunct) side projects are on [GitHub](${profile.links.github}) too`),
  you("What if I don't want to chat just yet?"),
  me('Sorry 😢'),
  me(`.. but here's my (less exciting) [resume](${profile.links.resume}) until then`),
  you('👋'),
];
