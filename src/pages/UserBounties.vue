<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">
          {{ t('about.title') }}
        </h2>
      </div>
    </div>
    <!-- {{userBounties}} -->
    <div v-if="userBounties.length > 0" class="mt-20 max-w-6xl mx-auto space-y-6">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <li v-for="bounty in userBounties" :key="bounty.id" class="col-span-1 flex flex-col text-center bg-white rounded-2xl shadow divide-y divide-bg-20">
          <div class="flex-1 flex flex-col p-8">
            <h3 class="mt-6 text-gray-900 font-medium">{{ bounty.info.description }}</h3>
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
                  <button @click="handleBountyDone(bounty.bounty.bounty_id, accountId, 'I am done with this bounty')" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">Submit</button>
      
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="mt-3 max-w-6xl mx-auto text-xl sm:mt-4 text-gray-500 text-center">You have no claimed bounties yet</div>
  </div>
</template>

<script>
import { format, fromUnixTime } from 'date-fns';
import { wallet } from '@/services/near';
import { useBounties } from '@/composables/useBounties';
import { useI18n } from 'vue-i18n';

export default {
  props: {},
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const accountId = wallet.getAccountId();
    const { userBounties, handleBountyDone, handleBountyGiveUp } = useBounties(accountId);
    return {
      t,
      userBounties,
      handleBountyDone,
      handleBountyGiveUp,
      format,
      fromUnixTime,
      accountId
    };
  }
};
</script>

<style></style>
