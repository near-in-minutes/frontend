<template>
  <div class="relative pt-10 sm:px-6 lg:pb-28">
    <AddBounty :handleAddBounty="handleAddBounty" />
    <!-- {{addBountyProposals}} -->
    <div class="pt-5 my-20 text-center">
      <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green" id="bounties-div">Bounty Proposals</h2>
      <!-- <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">Bounty proposals</p> -->
    </div>

    <ul v-if="addBountyProposals" role="list" class="max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
      <li v-for="proposal in addBountyProposals" :key="proposal.id" class="h-96 bg-white shadow overflow-hidden sm:rounded-2xl flex flex-col justify-between grid-span-1">
        <div class="relative h-full">
          <div class="px-20 relative z-10">
            <div class="flex justify-between my-6 text-gray-500 sm:px-6">
              <p class="truncate text-xl text-near-green">Reward: {{ proposal.kind.AddBounty.bounty.amount }}</p>

              <div class="flex-shrink-0 flex">
                <!-- {{ proposal.status }} -->
                <p v-if="proposal.status == 'Approved'" class="px-4  inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ proposal.status }}</p>
                <!-- <p v-else-if="bounty.bountyDone" class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Done</p> -->
                <p v-else-if="proposal.status == 'InProgress'" class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</p>
              </div>
            </div>
            <div class="flex py-2 items-center text-gray-400 ">
              <p>Submitted on: {{ proposal.submission_time }}</p>
            </div>
            <div class="flex flex-col justify-between sm:px-6 px-4">
              <div v-html="marked(proposal.kind.AddBounty.bounty.description)" id="description"></div>

              <p class="mt-2 font-bold text-near-green">Days to complete: {{ proposal.kind.AddBounty.bounty.max_deadline }}</p>

              <p class="mt-2 font-bold text-near-green">proposed by :{{ proposal.proposer }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useNear } from '@/composables/useNear';
import { onMounted } from 'vue';

import marked from 'marked';

import AddBounty from '@/components/DaoComponents/AddBounty.vue';

export default {
  components: {
    AddBounty
  },

  setup() {
    const { t } = useI18n({ useScope: 'global' });

    const { handleAddBounty, handleGetAddBounty, addBountyProposals } = useNear();

    onMounted(() => {
      handleGetAddBounty();
    });

    return {
      t,
      handleAddBounty,
      marked,
      addBountyProposals
    };
  }
};
</script>

<style lang="postcss">
#description h1 {
  @apply text-xl font-bold text-black;
}

/* #description h4 {
  @apply pb-6;
} */

#description a {
  @apply underline text-near-green;
}
</style>
