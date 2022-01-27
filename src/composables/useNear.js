import { ref, onMounted, computed, provide, unref, watch, toRef, toRefs, readonly, inject, reactive } from 'vue';

import { getProposals, BountyClaim, getBounties, getBountyNumberOfClaims, getBounty, addBounty } from '../services/near';

import { fromUnixTime, getUnixTime, formatDistanceToNow, format } from 'date-fns';

import { NEAR } from 'near-units';

const bountyDoneProposals = ref(null);
const bounties = ref(null);
const proposals = ref(null);
const addBountyProposals = ref(null);
const bounty = reactive({
  info: {},
  claimNum: 0,
  amount: 0,
  duration: 0,
  bountyDone: {}
});

export const useNear = () => {
  // onMounted(async () => {
  //   proposals.value = await getProposals();
  // });

  const clean = description => {
    const urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    description = description.replace(/[$]/g, ' ');

    function getFirstGroup(regexp, str) {
      const array = [...str.matchAll(regexp)];
      return array.map(m => m[0]);
    }

    const urls = getFirstGroup(urlExpression, description);

    urls.map(url => {
      if (url.startsWith('http')) {
        description = description.replace(url, '<a href="$&" rel="nofollow noreferrer noopener" target="_blank" >$&</a>');
      } else if (url.startsWith('www')) {
        description = description.replace(url, '<a href=https://$& rel="nofollow noreferrer noopener" target="_blank" >$&</a>');
      }
    });

    let shortDescription = description.slice(0, 250) + ' ... Read more';
    shortDescription = shortDescription.replace(/<[^>]*$/g, ' ');

    return shortDescription;
  };

  const handleGetProposals = async () => {
    proposals.value = await getProposals();
  };

  const handleGetAddBounty = async () => {
    function recursive(arr) {
      arr.map(proposal => {
        const amount = proposal.kind.AddBounty.bounty.amount;

        proposal.kind.AddBounty.bounty.amount = NEAR.parse(`${amount} yN`).toHuman();
        proposal.kind.AddBounty.bounty.max_deadline = formatDistanceToNow(new Date(fromUnixTime(parseInt(getUnixTime(Date.now()) + proposal.kind.AddBounty.bounty.max_deadline / 1000000000))));
        // console.log(format(new Date(fromUnixTime(parseInt( obj.submission_time / 1000000000))), 'HH:mm, dd MMMM yyyy'))
        proposal.submission_time = format(new Date(fromUnixTime(parseInt(proposal.submission_time / 1000000000))), 'HH:mm, dd MMMM yyyy');
        proposal.kind.AddBounty.bounty.description = clean(proposal.kind.AddBounty.bounty.description);
        // console.log(proposal.kind.AddBounty.bounty.description)
      });
      return arr;
    }

    try {
      await handleGetProposals();
      const arr = await proposals.value.filter(proposal => proposal.kind.AddBounty);
      addBountyProposals.value = await recursive(arr);
      // const arr = await proposals.value.filter(proposal => proposal.kind.AddBounty);

      //  proposal.kind.AddBounty.bounty.amount = await NEAR.parse(`${ proposal.kind.AddBounty.bounty.amount.amount} yN`).toHuman();
      // proposal.kind.AddBounty.bounty.max_deadline =formatDistanceToNow(new Date(fromUnixTime(parseInt(getUnixTime(Date.now()) +  proposal.kind.AddBounty.bounty.max_deadline  / 1000000000))));
      // proposal.kind.AddBounty.bounty.submission_time =formatDistanceToNow(new Date(fromUnixTime(parseInt(getUnixTime(Date.now()) +   proposal.kind.AddBounty.bounty.submission_time / 1000000000))))
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  const handleGetBounties = async () => {
    try {
      // const proposals = await getProposals();
      await handleGetProposals();
      bountyDoneProposals.value = await proposals.value.filter(proposal => proposal.kind.BountyDone);
      // console.log("bountyDoneProposals.value", bountyDoneProposals.value)

      const bountiesList = await getBounties();
      // bounties.value = getFakeBounties()
      // console.log("bountiesInfo", bountiesInfo)
      bounties.value = await Promise.all(
        bountiesList.map(async bounty => {
          const claimNum = await getBountyNumberOfClaims(bounty.id);
          // console.log(typeof bounty.max_deadline);
          // console.log(bounty.max_deadline / 1000000000);
          console.log(bounty.amount);
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
  };

  const handleGetBounty = async id => {
    try {
      await handleGetProposals();
      bountyDoneProposals.value = await proposals.value.filter(proposal => proposal.kind.BountyDone);

      bounty.info = await getBounty(id);
      bounty.claimNum = await getBountyNumberOfClaims(id);
      bounty.amount = NEAR.parse(`${bounty.info.amount} yN`).toHuman();
      bounty.duration = formatDistanceToNow(new Date(fromUnixTime(parseInt(getUnixTime(Date.now()) + bounty.info.max_deadline / 1000000000))));
      bounty.bountyDone = bountyDoneProposals.value.find(proposal => proposal.kind.BountyDone.bounty_id === id);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // const handleGetBounty = async id => {
  //   try {
  //     // bounty.info = await getBounty(id);

  //     // bounty.claimNum = await getBountyNumberOfClaims(id);

  //     // bounty.amount = NEAR.parse(`${bounty.amount} yN`).toHuman();
  //     // bounty.duration = formatDistanceToNow(new Date(fromUnixTime(parseInt(getUnixTime(Date.now()) + bounty.max_deadline / 1000000000))));
  //     // bounty.bountyDone = bountyDoneProposals.value.find(proposal => proposal.kind.BountyDone.bounty_id === bounty.id);
  //   } catch (error) {
  //     console.error(error);
  //     alert(error);
  //   }
  // };

  // create a function that allows adding a bounty to the blockchain
  const handleClaimBounty = (id, deadline) => {
    BountyClaim(id, deadline);
  };

  // create a function that allows adding a bounty to the blockchain
  const handleAddBounty = async ({ title, description, amount, maxDeadline }) => {
    // console.log( );
    // console.log('maxDeadline', parseInt(maxDeadline.value.replace(/[Week]/g, '') * 86400) * 1000000000);

    addBounty({
      description: 'This user is requesting a bounty for NEAR in Minutes',
      bountyDescription: `# ${title.value} ${description.value}`,
      amount: NEAR.parse(amount.value.replace(/[NEAR]/g, '')),
      // times: parseInt(times.value),
      maxDeadline: (parseInt(maxDeadline.value.replace(/[Week]/g, '')) * 86400000000000).toString()
    });
  };

  //   const getFakeBounties = () => {
  //   return [{ info: { id: 0, description: " # Building projects  \n #### this is description of the project I want to submit and it's related to a and b and c \n\n [Click here for more details](https://www.example.com)", token: "", amount: "20", times: 1, max_deadline: "500000000" }, claimNum: 0, amount: "20 yN", duration: "less than a minute" }]

  // }

  // " # Building projects  \n #### this is description of the project I want to submit and it's related to a and b and c \n\n [Click here for more details](https://www.example.com)"

  return {
    handleClaimBounty,
    bounties,
    bounty,
    handleGetBounties,
    handleGetBounty,
    handleAddBounty,
    handleGetAddBounty,
    addBountyProposals
  };
};
