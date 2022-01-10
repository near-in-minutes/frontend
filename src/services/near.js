import { keyStores, Near, WalletConnection, utils } from 'near-api-js';
import BN from 'bn.js';
export const CONTRACT_ID = 'nimdao.sputnikv2.testnet';

const gas = new BN('70000000000000');
// use new NEAR here to avoid needing async/await
export const near = new Near({
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org'
});

// can now create a new WalletConnection with the created Near object
export const wallet = new WalletConnection(near, 'nimdao');

export const getLastProposalId = () => {
  return wallet.account().viewFunction(CONTRACT_ID, 'get_last_proposal_id', {});
};

export const getProposals = async () => {
  const lastId = await getLastProposalId();
  return wallet.account().viewFunction(CONTRACT_ID, 'get_proposals', {
    from_index: 0,
    limit: lastId
  });
};

export const getProposal = () => {
  return wallet.account().viewFunction(CONTRACT_ID, 'get_proposal', {
    id: 12
  });
};

export const getLastBountyId = () => {
  return wallet.account().viewFunction(CONTRACT_ID, 'get_last_bounty_id', {});
};

export const getBounties = async () => {
  const lastId = await getLastBountyId();
  return wallet.account().viewFunction(CONTRACT_ID, 'get_bounties', {
    from_index: 1,
    limit: lastId
  });
};

export const getBountyNumberOfClaims = id => {
  return wallet.account().viewFunction(CONTRACT_ID, 'get_bounty_number_of_claims', {
    id: id
  });
};

export const BountyClaim = (id, deadline) => {
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'bounty_claim',
    gas,
    args: {
      id: id,
      deadline: deadline
    },
    attachedDeposit: utils.format.parseNearAmount('1')
  });
};

export const getBountyClaims = accountId => {
  return wallet.account().viewFunction(CONTRACT_ID, 'get_bounty_claims', {
    account_id: accountId
  });
};

export const getBounty = id => {
  return wallet.account().viewFunction(CONTRACT_ID, 'get_bounty', {
    id: id
  });
};

export const BountyDone = (id, account_id, description) => {
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'add_proposal',
    gas,
    args: {
      proposal: {
        description: description,
        kind: {
          BountyDone: {
            bounty_id: id,
            receiver_id: account_id
          }
        }
      }
    },
    attachedDeposit: utils.format.parseNearAmount('1')
  });
};

export const BountyGiveUp = id => {
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'bounty_giveup',
    gas,
    args: {
      id: id
    }
  });
};
