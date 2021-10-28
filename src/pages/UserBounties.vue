<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">
          {{ t('about.title') }}
        </h2>
      </div>
    </div>

    <div v-if="userBounties.length > 0" class="mt-20 max-w-6xl mx-auto space-y-6">
      <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">Active Bounties</p>
      <UserBounties :activeBounties="activeBounties" />
      <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">Under Evaluation bounties</p>
      <UserBounties :awaitingEvaluationBounties="awaitingEvaluationBounties" />
      <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">Done bounties</p>
      <UserBounties :doneBounties="doneBounties" />
    </div>

    <div v-else-if="error">
      <div v-html="marked(bounty.info.description)" id="description"></div>
    </div>

    <div v-else class="mt-3 max-w-6xl mx-auto text-xl sm:mt-4 text-gray-500 text-center">You have no claimed bounties yet</div>
  </div>
</template>

<script>
import { ref, watch, toRaw } from 'vue';
import { wallet } from '@/services/near';
import { useBounties } from '@/composables/useBounties';
import { useI18n } from 'vue-i18n';
import UserBounties from '@/components/DaoComponents/UserBounties';

export default {
  components: {
    UserBounties
    // SubmitBountyModal
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const accountId = wallet.getAccountId();
    const { userBounties, error } = useBounties(accountId);

    const activeBounties = ref([]);
    const awaitingEvaluationBounties = ref([]);
    const doneBounties = ref([]);

    watch(userBounties, () => {
      console.log(userBounties.value);
      activeBounties.value = toRaw(userBounties.value).filter(bounty => bounty.status == 'active');
      awaitingEvaluationBounties.value = toRaw(userBounties.value).filter(bounty => bounty.status == 'InProgress');
      doneBounties.value = toRaw(userBounties.value).filter(bounty => bounty.status == 'Approved');
    });

    watch(error, () => {
      console.log('error', error.value);
    });

    return {
      t,
      userBounties,
      activeBounties,
      awaitingEvaluationBounties,
      doneBounties,
      error
    };
  }
};
</script>

<style></style>


                <!-- <button @click="handleBountyDone(bounty.bounty.bounty_id, accountId, 'I am done with this bounty')" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">Submit</button> -->
