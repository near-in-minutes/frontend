<template>
  <div class="relative pt-10 sm:px-6 lg:pb-28">
    <!-- <div class="mt-20 pb-20 bg-white">hello</div> -->
    <!-- {{ JSON.parse(info).description }} -->
    {{ bounty }}
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useNear } from '@/composables/useNear';
import { format, fromUnixTime } from 'date-fns';
// import { CalendarIcon } from '@heroicons/vue/solid';
import { ref, reactive, watch, onMounted, inject } from 'vue';
// import BountyModal from '@/components/DaoComponents/BountyModal';
// import ClaimBountyModal from '@/components/DaoComponents/ClaimBountyModal';
// import DaoHeroSection from '@/components/DaoComponents/DaoHeroSection';
// import DaoInfo from '@/components//DaoComponents/DaoInfo';
// import DaoFAQ from '@/components/DaoComponents/DaoFAQ';
import marked from 'marked';
// import ProposalsSection from '@/components/DaoComponents/ProposalsSection'

export default {
  props: ['id'],
  components: {
    // CalendarIcon,
    // BountyModal,
    // ClaimBountyModal,
    // DaoHeroSection,
    // DaoInfo,
    // DaoFAQ,
    // ProposalsSection
  },

  setup(props) {
    const { t } = useI18n({ useScope: 'global' });

    const { handleClaimBounty, bounty, handleGetBounty } = useNear();

    onMounted(() => {
      handleGetBounty(parseInt(props.id));
    });

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

    // watch(bounties, () => {
    //   filteredBounties.value = bounties.value;
    //   console.log(bounties.value);
    // });

    const clean = description => {
      return description.replace(/[$]/g, ' ');
    };

    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return {
      t,
      handleClaimBounty,
      format,
      fromUnixTime,
      // bounties,
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
      clean,
      randomIntFromInterval,
      handleGetBounty,
      bounty
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
