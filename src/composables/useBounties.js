import {
  ref,
  onMounted
} from 'vue';
import {
  getBountyClaims,
  getBounty,
  BountyDone,
  BountyGiveUp,
  getProposal,
  getProposals
} from '../services/near';
import {
  fromUnixTime,
  format
} from 'date-fns';

import {
  NEAR
} from 'near-units';

export const useBounties = accountId => {
  const userBounties = ref([]);
  const error = ref(false)

  onMounted(async () => {

    try {
      const bountyClaims = await getBountyClaims(accountId);
      const proposals = await getProposals();

      userBounties.value = await Promise.all(
        bountyClaims.map(async bounty => {
          const info = await getBounty(bounty.bounty_id);

          return {
            bounty,
            info,
            bountyDone: proposals.filter(proposal => proposal.kind.BountyDone).find(proposal => proposal.kind.BountyDone.bounty_id === bounty.bounty_id),
            status: proposals.filter(proposal => proposal.kind.BountyDone).find(proposal => proposal.kind.BountyDone.bounty_id === bounty.bounty_id) ? proposals.filter(proposal => proposal.kind.BountyDone).find(proposal => proposal.kind.BountyDone.bounty_id === bounty.bounty_id).status : 'active',
            amount: NEAR.parse(`${info.amount} yN`).toHuman(),
            deadline: format(new Date(fromUnixTime(parseInt(bounty.start_time / 1000000000 + bounty.deadline / 1000000000))), 'HH:mm, dd MMMM yyyy')
          };
        })
      );
    } catch (error) {
      console.error(error);
      alert(error)
      error.value === true
      return error
    }
  });

  // create a function that allows adding a bounty to the blockchain
  const handleBountyDone = (id, account_id, description) => {
    BountyDone(id, account_id, description);
  };

  const handleBountyGiveUp = id => {
    BountyGiveUp(id);
  };

  return {
    userBounties,
    handleBountyDone,
    handleBountyGiveUp,
    error
  };
};
