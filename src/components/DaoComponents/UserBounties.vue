<template>
  <ul v-if="activeBounties" role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <li v-for="bounty in activeBounties" :key="bounty.id" class="col-span-1 flex flex-col text-center bg-white rounded-2xl shadow divide-y divide-bg-20">
      <div class="flex-1 flex flex-col p-8">
        <div v-html="clean(marked(bounty.info.description))" id="description"></div>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Claimed on:</dt>
          <dd class="text-gray-500 text-sm">
            Claimed on: <span class="font-medium">{{ format(new Date(fromUnixTime(parseInt(bounty.bounty.start_time / 1000000000))), 'dd MMMM yyyy') }}</span>
          </dd>
          <dt class="sr-only">Deadline</dt>
          <dd class="text-gray-500 text-sm">
            Deadline: <span class="font-medium">{{ bounty.deadline }}</span>
          </dd>
          <dt class="sr-only">Amount</dt>
          <dd class="mt-3">
            <span class="px-2 py-1 text-near-green truncate text-xl font-medium bg-near-gray rounded-full"> {{ bounty.amount }}</span>
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="w-0 flex-1 flex">
            <button @click="handleBountyGiveUp(bounty.bounty.bounty_id)" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">Giveup</button>
          </div>
          <div class="-ml-px w-0 flex-1 flex">
            <button @click="setSubmitBountyModal(true, bounty.bounty.bounty_id)" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">Submit</button>
          </div>
        </div>
      </div>
    </li>
    <SubmitBountyModal :isOpen="isSubmitBountyOpen" :setBountyDoneModal="setSubmitBountyModal" :handleBountyDone="handleBountyDone" :accountId="accountId" :bountyId="bountyId" />
  </ul>

  <ul v-else-if="awaitingEvaluationBounties" role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <li v-for="bounty in awaitingEvaluationBounties" :key="bounty.id" class="col-span-1 flex flex-col text-center bg-white rounded-2xl shadow divide-y divide-bg-20">
      <div class="flex-1 flex flex-col p-8">
        <div v-html="clean(marked(bounty.info.description))" id="description"></div>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Claimed on:</dt>
          <dd class="text-gray-500 text-sm">
            Claimed on: <span class="font-medium">{{ format(new Date(fromUnixTime(parseInt(bounty.bounty.start_time / 1000000000))), 'dd MMMM yyyy') }}</span>
          </dd>
          <dt class="sr-only">Deadline</dt>
          <dd class="text-gray-500 text-sm">
            Deadline: <span class="font-medium">{{ bounty.deadline }}</span>
          </dd>
          <dt class="sr-only">Amount</dt>
          <dd class="mt-3">
            <span class="px-2 py-1 text-near-green truncate text-xl font-medium bg-near-gray rounded-full"> {{ bounty.amount }}</span>
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="w-0 flex-1 flex my-5">
            <button @click="setBountyDoneModal(true, bounty.bountyDone)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-near-green">View bounty done proposal</button>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <ul v-else-if="doneBounties" role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <li v-for="bounty in doneBounties" :key="bounty.id" class="col-span-1 flex flex-col text-center bg-white rounded-2xl shadow divide-y divide-bg-20">
      <div class="flex-1 flex flex-col p-8">
        <div v-html="clean(marked(bounty.info.description))" id="description"></div>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Claimed on:</dt>
          <dd class="text-gray-500 text-sm">
            Claimed on: <span class="font-medium">{{ format(new Date(fromUnixTime(parseInt(bounty.bounty.start_time / 1000000000))), 'dd MMMM yyyy') }}</span>
          </dd>
          <dt class="sr-only">Deadline</dt>
          <dd class="text-gray-500 text-sm">
            Deadline: <span class="font-medium">{{ bounty.deadline }}</span>
          </dd>
          <dt class="sr-only">Amount</dt>
          <dd class="mt-3">
            <span class="px-2 py-1 text-near-green truncate text-xl font-medium bg-near-gray rounded-full"> {{ bounty.amount }}</span>
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="w-0 flex-1 flex my-5">
            <button @click="setBountyDoneModal(true, bounty.bountyDone)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-near-green">View bounty done proposal</button>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <BountyModal :isOpen="isOpen" :setBountyDoneModal="setBountyDoneModal" :bountyDone="bountyDone.data" />
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { format, fromUnixTime } from 'date-fns';
import { useBounties } from '@/composables/useBounties';
import { wallet } from '@/services/near';
import BountyModal from '@/components/DaoComponents/BountyModal';
import SubmitBountyModal from '@/components/DaoComponents/SubmitBountyModal';
import marked from 'marked';

export default {
  props: ['activeBounties', 'awaitingEvaluationBounties', 'doneBounties'],
  components: {
    BountyModal,
    SubmitBountyModal
  },
  setup() {
    const accountId = wallet.getAccountId();
    const { handleBountyDone, handleBountyGiveUp } = useBounties(accountId);

    // This set of functions is related to opening a view proposal bounty modal
    let isOpen = ref(false);
    let bountyDone = reactive({ data: {} });

    const setBountyDoneModal = (value, BountyDone) => {
      isOpen.value = value;
      bountyDone.data = BountyDone;
    };

    let isSubmitBountyOpen = ref(false);
    let bountyId = ref();

    const setSubmitBountyModal = (value, id) => {
      isSubmitBountyOpen.value = value;
      bountyId.value = id;
    };

         const clean = (description) => {
     return description.replace(/[$]/g, ' ')
    };

    return {
      setBountyDoneModal,
      isOpen,
      bountyDone,
      setSubmitBountyModal,
      isSubmitBountyOpen,
      bountyId,
      handleBountyDone,
      accountId,
      format,
      handleBountyGiveUp,
      fromUnixTime,
      marked,
      clean
    };
  }
};
</script>

<style lang="postcss">
#description h1 {
  @apply text-xl font-bold mb-5;
}

#description h4 {
  @apply pb-6;
}

#description a {
  @apply underline text-near-green;
}
</style>
