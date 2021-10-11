import { ref, onMounted } from 'vue';
import { getBountyClaims, getBounty, BountyDone, BountyGiveUp } from '../services/near';
import { fromUnixTime, format } from 'date-fns';

import { NEAR } from 'near-units';

export const useBounties = accountId => {
  const userBounties = ref([]);

  onMounted(async () => {
    // when the component first mounts it get the memes from the blockchain
    try {
      const bountyClaims = await getBountyClaims(accountId);

      userBounties.value = await Promise.all(
        bountyClaims.map(async bounty => {
          const info = await getBounty(bounty.bounty_id);
          //  console.log('bounty info' , bounty,info)
          return {
            bounty,
            info,
            amount: NEAR.parse(`${info.amount} yN`).toHuman(),
            deadline: format(new Date(fromUnixTime(parseInt(bounty.start_time / 1000000000 + bounty.deadline / 1000000000))), 'HH:mm, dd MMMM yyyy')
          };
        })
      );
    } catch (error) {
      console.error(error);
      alert(error);
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
    handleBountyGiveUp
  };
};
