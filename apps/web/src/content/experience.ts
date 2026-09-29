export interface Role {
  title: string;
  start: string;
  end: string;
  location?: string;
  summary?: string;
}

export interface Company {
  id: string;
  name: string;
  url?: string;
  tenure: string;
  location: string;
  /** Brand-ish colour used for the monogram. */
  color: string;
  roles: Role[];
}

export const experience: Company[] = [
  {
    id: 'acv',
    name: 'ACV Auctions',
    url: 'https://www.acvauctions.com',
    tenure: '3 yrs',
    location: 'Toronto · Hybrid',
    color: '#F2542D',
    roles: [
      { title: 'Staff Engineer, R&D', start: 'Mar 2026', end: 'Present' },
      { title: 'Engineering Lead, R&D', start: 'Oct 2023', end: 'Mar 2026' },
    ],
  },
  {
    id: 'borrowell',
    name: 'Borrowell',
    url: 'https://borrowell.com',
    tenure: '4 yrs 11 mos',
    location: 'Toronto',
    color: '#7B3AC2',
    roles: [
      {
        title: 'Sr. Engineering Manager, Platform',
        start: 'Aug 2022',
        end: 'Oct 2023',
        location: 'Remote',
        summary:
          'Reporting into the VP of Engineering, led 3 teams with 11 reports and 1 manager — establishing the new Platform organization during a phase of fast company growth.',
      },
      {
        title: 'Engineering Manager, Mobile & Growth',
        start: 'Jul 2020',
        end: 'Aug 2022',
        location: 'Hybrid',
        summary: 'Reporting into the Director of Engineering, led 2 teams with a total of 9 direct reports.',
      },
      {
        title: 'Lead Developer, Mobile',
        start: 'Dec 2019',
        end: 'Jul 2020',
        summary:
          'Developed our “Effect Architecture” on redux-observables and RxJS, separating presentation and navigation logic from business logic.',
      },
      {
        title: 'Sr. Mobile Developer',
        start: 'Dec 2018',
        end: 'Dec 2019',
        summary:
          'First mobile engineer at Borrowell — built and published our greenfield React Native app within my first four months.',
      },
    ],
  },
  {
    id: 'freckle',
    name: 'Freckle',
    tenure: '5 mos',
    location: 'Toronto',
    color: '#5B8DB8',
    roles: [
      {
        title: 'Lead Software Engineer, Frontend',
        start: 'Nov 2018',
        end: 'Dec 2018',
        summary:
          'Managed an internal team of 3 developers and a QA analyst, orchestrating releases alongside external engineering and design contractors.',
      },
      {
        title: 'Software Engineer, Frontend',
        start: 'Aug 2018',
        end: 'Nov 2018',
        summary:
          'Streamlined our deployment process with multiple build configurations and CI — App Center, Azure DevOps, Fastlane and CodePush.',
      },
    ],
  },
  {
    id: 'localyyz',
    name: 'Localyyz',
    tenure: '8 mos',
    location: 'Toronto',
    color: '#6A3DF0',
    roles: [
      {
        title: 'Sr. Software Developer, Frontend',
        start: 'Jan 2018',
        end: 'Aug 2018',
        summary:
          'Redesigned both the iOS and Android apps in React Native with MobX, backed by a RESTful Go + PostgreSQL service.',
      },
    ],
  },
  {
    id: 'frrand',
    name: 'Frrand Inc.',
    tenure: '2 yrs 1 mo',
    location: 'Toronto',
    color: '#5DAA3A',
    roles: [
      {
        title: 'CEO',
        start: 'Dec 2015',
        end: 'Dec 2017',
        summary:
          'Founded a peer-to-peer delivery app, funded through The Hub @ UTSC startup accelerator. Built it in React Native on a sharded MongoDB cluster, with a Flask / Python Eve API on AWS EC2.',
      },
    ],
  },
];

export const education = {
  school: 'University of Toronto',
  degree: 'Hons. B.Sc, Computer Science',
  years: '2013 – 2017',
};

export interface ToolGroup {
  label: string;
  tools: string[];
}

/** What I reach for today, and what I've shipped with as the React ecosystem evolved. */
export const toolbox: { current: ToolGroup; past: ToolGroup } = {
  current: {
    label: 'Today',
    tools: [
      'TypeScript',
      'React 19',
      'React Native',
      'Expo & EAS',
      'Expo Router',
      'React Native Web',
      'Swift',
      'TanStack Query',
      'Redux',
      'Zustand',
      'Node.js',
      'GraphQL',
      'Jest',
      'Claude Code',
      'MCP',
      'GitHub Actions',
    ],
  },
  past: {
    label: 'Along the way, since 2015',
    tools: [
      'Objective-C',
      'redux-observable',
      'RxJS',
      'MobX',
      'CodePush',
      'App Center',
      'Fastlane',
      'Python',
      'PostgreSQL',
      'MongoDB',
    ],
  },
};
