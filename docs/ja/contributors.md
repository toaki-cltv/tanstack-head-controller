---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';

const members = [
  {
    avatar: 'https://www.github.com/toakiryu.png',
    name: 'Toa Kiryu',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/toakiryu' },
      { icon: 'twitter', link: 'https://x.com/toakiryu' }
    ]
  },
];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      TanStack Head Controller の貢献者
    </template>
    <template #lead>
      その一部を以下に紹介します。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>
