<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="background relative max-w-6xl m-auto rounded-3xl h-96">
      
    </div>

    <div class="mt-20 max-w-6xl mx-auto space-y-6">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <li v-for="bounty in bounties" :key="bounty.info.id" class="bg-white shadow overflow-hidden py-4 sm:rounded-md">
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
              <button @click="handleClaimBounty(bounty.info.id, bounty.info.max_deadline)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">Claim</button>
            </div>
            <div v-else-if="bounty.bountyDone" class="w-0 flex-1 flex">
              <button @click="setBountyDoneModal(true, bounty.bountyDone)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg">View bounty done proposal</button>
            </div>
            <div v-else class="w-0 flex-1 flex">
              <p class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg">Already claimed</p>
            </div>
          </div>
        </li>
        <BountyModal :isOpen="isOpen" :setBountyDoneModal="setBountyDoneModal" :bountyDone="bountyDone" />
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

export default {
  components: {
    CalendarIcon,
    BountyModal
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    let isOpen = ref(false);
    let bountyDone = reactive({ data: {} });

    const { bounties, handleClaimBounty } = useNear();

    const setBountyDoneModal = (value, BountyDone) => {
      isOpen.value = value;
      bountyDone.data = BountyDone;
    };

    return {
      t,
      handleClaimBounty,
      format,
      fromUnixTime,
      bounties,
      bountyDone,
      isOpen,
      setBountyDoneModal
    };
  }
};
</script>


<style lang="postcss" scoped>
.background {
  animation: colorchange 5s ease-in-out infinite ;
  -webkit-animation: colorchange ease-in-out 5s infinite ;
}

@keyframes colorchange {
  0% {
    @apply bg-near-red-light;
  }

  50% {
    @apply bg-near-gray;
  }
  100% {
    @apply bg-near-red-light;
  }
}
@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */ {
  0% {
    @apply bg-near-red-light;
  }

  50% {
    @apply bg-near-gray;
  }
  100% {
    @apply bg-near-red-light;
  }
}
</style>
