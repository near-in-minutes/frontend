<template>
  <div class="relative pt-10 sm:px-6 lg:pb-28">
    <DaoHeroSection />
    <DaoInfo />

    <div class="mt-20 pb-20 bg-near-gray">
      <div class="pt-10 my-20 text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">Bounties</h2>
        <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">Explore all the availble bounties</p>
      </div>

      <ul role="list" class="max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <li v-for="bounty in bounties" :key="bounty.info.id" class="bg-white shadow overflow-hidden py-4 sm:rounded-2xl">
          <div class="flex justify-between my-6 text-gray-500 sm:px-6 px-4">
            <p class="truncate text-xl text-near-green">
              {{ bounty.amount }}
            </p>
            <div class="flex-shrink-0 flex">
              <p v-if="bounty.info.times > bounty.claimNum" class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">active</p>
              <p v-else-if="bounty.bountyDone" class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Done</p>
              <p v-else class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">in Progress</p>
            </div>
          </div>
          <div class="flex flex-col justify-between sm:px-6 px-4">
            <h3 class="text-gray-900 font-medium">{{ bounty.info.description }}</h3>

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
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useNear } from '@/composables/useNear';
import { format, fromUnixTime } from 'date-fns';
import { CalendarIcon } from '@heroicons/vue/solid';
import { ref, reactive } from 'vue';
import BountyModal from '@/components/BountyModal';
import ClaimBountyModal from '@/components/ClaimBountyModal';
import DaoHeroSection from '@/components/DaoHeroSection';
import DaoInfo from '@/components/DaoInfo';

export default {
  components: {
    CalendarIcon,
    BountyModal,
    ClaimBountyModal,
    DaoHeroSection,
    DaoInfo
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    let isOpen = ref(false);

    let bountyDone = reactive({ data: {} });

    const setBountyDoneModal = (value, BountyDone) => {
      isOpen.value = value;
      bountyDone.data = BountyDone;
    };

    const { bounties, handleClaimBounty } = useNear();

    let isClaimOpen = ref(false);
    let claimId = ref();
    let claimDeadline = ref();

    const setBountyClaimModal = (value, id, deadline) => {
      isClaimOpen.value = value;
      claimId.value = id;
      claimDeadline.value = deadline;
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
      claimDeadline
    };
  }
};
</script>
