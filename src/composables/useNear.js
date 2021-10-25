import { ref, onMounted ,computed} from 'vue';

import { getProposals, BountyClaim, getBounties, getBountyNumberOfClaims } from '../services/near';

import { fromUnixTime, getUnixTime, formatDistanceToNow } from 'date-fns';

import { NEAR } from 'near-units';

export const useNear = () => {
  const bountyDoneProposals = ref(null);
  const bounties = ref(null);

  onMounted(async () => {
    // when the component first mounts it get the memes from the blockchain
    try {
      const proposals = await getProposals();
      bountyDoneProposals.value = await proposals.filter(proposal => proposal.kind.BountyDone);
      // console.log("result", proposals.value)

      const bountiesList = await getBounties();
      // bounties.value = getFakeBounties()
      // console.log("bountiesInfo", bountiesInfo)
      bounties.value = await Promise.all(
        bountiesList.map(async bounty => {
          const claimNum = await getBountyNumberOfClaims(bounty.id);

          return {
            info: bounty,
            claimNum,
            amount: NEAR.parse(`${bounty.amount} yN`).toHuman(),
            duration: formatDistanceToNow(new Date(fromUnixTime(parseInt(getUnixTime(Date.now()) + bounty.max_deadline / 1000000000)))),
            bountyDone: bountyDoneProposals.value.find(proposal => proposal.kind.BountyDone.bounty_id === bounty.id)
          };
        })
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  });

  // create a function that allows adding a bounty to the blockchain
  const handleClaimBounty = (id, deadline) => {
    BountyClaim(id, deadline);
  };

//   const getFakeBounties = () => {
//   return [{ info: { id: 0, description: " # Building projects  \n #### this is description of the project I want to submit and it's related to a and b and c \n\n [Click here for more details](https://www.example.com)", token: "", amount: "20", times: 1, max_deadline: "500000000" }, claimNum: 0, amount: "20 yN", duration: "less than a minute" }]
  
// }

// " # Building projects  \n #### this is description of the project I want to submit and it's related to a and b and c \n\n [Click here for more details](https://www.example.com)"

  return {
    handleClaimBounty,
    bounties
  };
};

