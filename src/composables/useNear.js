import {
  ref,
  onMounted
} from "vue";

import {
  getProposals,
  BountyClaim,
  getBounties,
  getBountyNumberOfClaims,
} from "../services/near";

import {
  fromUnixTime,
  getUnixTime,
  formatDistanceToNow,
} from "date-fns";

import {
  NEAR
} from "near-units";

export const useNear = () => {
  const bountyDoneProposals = ref(null);
  const bounties = ref(null);

  onMounted(async () => {
    // when the component first mounts it get the memes from the blockchain
    try {
      const proposals = await getProposals();
      bountyDoneProposals.value = await proposals.filter((proposal) => proposal.kind.BountyDone)
      // console.log("result", proposals.value)

      const bountiesList = await getBounties();
      // bounties.value = getFakeBounties()
      // console.log("bountiesInfo", bountiesInfo)
      bounties.value = await Promise.all(
        bountiesList.map(async (bounty) => {

          const claimNum = await getBountyNumberOfClaims(bounty.id);

          return {
            info: bounty,
            claimNum,
            amount: NEAR.parse(`${bounty.amount} yN`).toHuman(),
            duration: formatDistanceToNow(
              new Date(
                fromUnixTime(
                  parseInt(
                    getUnixTime(Date.now()) +
                    bounty.max_deadline / 1000000000
                  )
                )
              )
            ),
            bountyDone: bountyDoneProposals.value.find((proposal) => proposal.kind.BountyDone.bounty_id === bounty.id)
          };
        })
      );
    } catch (error) {
      console.error(error);
      alert(error)

    }
  });


  // create a function that allows adding a bounty to the blockchain
  const handleClaimBounty = (id, deadline) => {
    BountyClaim(id, deadline);
  };

  return {
    handleClaimBounty,
    bounties,
  };
};


// function getFakeBounties() {
//   return (
    
//   )
// }