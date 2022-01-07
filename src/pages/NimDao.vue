<template>
  <div class="relative pt-10 sm:px-6 lg:pb-28">
    <DaoHeroSection />
    <DaoInfo />

    <div class="mt-20 pb-20 bg-near-gray">
      <div class="text-center bg-near-red py-3 animate-pulse">
        <p>NimDAO is still underdevelopment and is running on testnet, all the bounties below are just for testing.</p>
        <p>Nim is a community project, if you can help please reach out. we appreciate your help.</p>
      </div>
      <div class="pt-5 my-20 text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green" id="bounties-div">Bounties</h2>
        <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">Explore all the availble bounties</p>
      </div>
      <div>
        <div>
          <div class="sm:block max-w-6xl mx-auto my-10">
            <div class="border-b border-gray-200">
              <div class="-mb-px flex" aria-label="Tabs">
                <button v-for="filter in filters" :key="filter.id" @click="selectedProposals = filter.id" :disabled="selectedProposals === filter.id" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm disabled:border-near-green disabled:text-near-green">{{ filter.name }}</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <button v-for="filter in filters" :key="filter.id" @click="selectedProposals = filter.id" :disabled="selectedProposals === filter.id"> {{filter.name}}</button> -->
      </div>
      <ul role="list" class="max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <li v-for="bounty in filteredBounties" :key="bounty.info.id" class="bg-white shadow overflow-hidden py-4 sm:rounded-2xl flex flex-col justify-between">
          <div class="flex justify-between my-6 text-gray-500 sm:px-6 px-4">
            <p class="truncate text-xl text-near-green">Reward: {{ bounty.amount }}</p>
            <div class="flex-shrink-0 flex">
              <p v-if="bounty.info.times > bounty.claimNum" class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">active</p>
              <p v-else-if="bounty.bountyDone" class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Done</p>
              <p v-else class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">in Progress</p>
            </div>
          </div>
          <div class="flex flex-col justify-between sm:px-6 px-4">
            <div v-html="clean(marked(bounty.info.description))" id="description"></div>

            <div class="flex items-center text-gray-400 text-sm sm:mt-0 pt-3">
              <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <p>{{ bounty.duration }}</p>
            </div>
          </div>
          <div class="mt-6 pt-4 flex border-t border-gray-200">
            <div v-if="bounty.info.times > bounty.claimNum" class="w-0 flex-1 flex">
              <button @click="setBountyClaimModal(true, bounty.info.id, bounty.info.max_deadline)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-near-green">Claim</button>
            </div>
            <div v-else-if="bounty.bountyDone" class="w-0 flex-1 flex">
              <button @click="setBountyDoneModal(true, bounty.bountyDone)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-near-green">View bounty done proposal</button>
            </div>
            <div v-else class="w-0 flex-1 flex">
              <p class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg">Already claimed</p>
            </div>
          </div>
        </li>
        <BountyModal :isOpen="isOpen" :setBountyDoneModal="setBountyDoneModal" :bountyDone="bountyDone.data" />
        <ClaimBountyModal :isOpen="isClaimOpen" :setBountyClaimModal="setBountyClaimModal" :id="claimId" :claimDeadline="claimDeadline" :handleClaimBounty="handleClaimBounty" />
      </ul>
    </div>
    <DaoFAQ />
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useNear } from '@/composables/useNear';
import { format, fromUnixTime } from 'date-fns';
import { CalendarIcon } from '@heroicons/vue/solid';
import { ref, reactive, watch } from 'vue';
import BountyModal from '@/components/DaoComponents/BountyModal';
import ClaimBountyModal from '@/components/DaoComponents/ClaimBountyModal';
import DaoHeroSection from '@/components/DaoComponents/DaoHeroSection';
import DaoInfo from '@/components//DaoComponents/DaoInfo';
import DaoFAQ from '@/components/DaoComponents/DaoFAQ';
import marked from 'marked';

export default {
  components: {
    CalendarIcon,
    BountyModal,
    ClaimBountyModal,
    DaoHeroSection,
    DaoInfo,
    DaoFAQ
  },

  setup() {
    const { t } = useI18n({ useScope: 'global' });

    const { bounties, handleClaimBounty } = useNear();

    // This set of functions is related to opening a view proposal bounty modal
    let isOpen = ref(false);
    let bountyDone = reactive({ data: {} });

    const setBountyDoneModal = (value, BountyDone) => {
      isOpen.value = value;
      bountyDone.data = BountyDone;
    };

    // This set of functions is related to opening a claim bounty modal
    let isClaimOpen = ref(false);
    let claimId = ref();
    let claimDeadline = ref();

    const setBountyClaimModal = (value, id, deadline) => {
      isClaimOpen.value = value;
      claimId.value = id;
      claimDeadline.value = deadline;
    };

    // This set of functions is related to filtering bounties
    const selectedProposals = ref('all');
    const filteredBounties = ref(null);

    const filters = [
      { name: 'All', id: 'all', current: true },
      { name: 'Available', id: 'available', current: false },
      { name: 'Claimed', id: 'claimed', current: false },
      { name: 'Done', id: 'done', current: false }
    ];

    watch(bounties, () => {
      filteredBounties.value = bounties.value;
      console.log(bounties.value);
    });

    watch(selectedProposals, () => {
      if (selectedProposals.value === 'all') {
        filteredBounties.value = bounties.value;
      } else if (selectedProposals.value === 'available') {
        const filterdArr = bounties.value.filter(bounty => bounty.info.times > bounty.claimNum);
        filteredBounties.value = filterdArr;
      } else if (selectedProposals.value === 'done') {
        const filterdArr = bounties.value.filter(bounty => bounty.bountyDone && bounty.info.times === bounty.claimNum);
        filteredBounties.value = filterdArr;
      } else if (selectedProposals.value === 'claimed') {
        const filterdArr = bounties.value.filter(bounty => !bounty.bountyDone && bounty.claimNum > 0);
        filteredBounties.value = filterdArr;
      }
    });

    const clean = description => {
      return description.replace(/[$]/g, ' ');
    };

    return {
      t,
      handleClaimBounty,
      format,
      fromUnixTime,
      bounties,
      bountyDone,
      isOpen,
      setBountyDoneModal,
      isClaimOpen,
      setBountyClaimModal,
      claimId,
      claimDeadline,
      marked,
      selectedProposals,
      filteredBounties,
      filters,
      clean
    };
  }
};
</script>

<style lang="postcss">
#description h1 {
  @apply text-xl font-bold text-near-green;
}

/* #description h4 {
  @apply pb-6;
} */

#description a {
  @apply underline text-near-green;
}
</style>
