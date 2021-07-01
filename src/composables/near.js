import { ref, onMounted, watch } from "vue";
import { getWallet } from "../services/near";

const wallet = ref();
const accountId = ref();

export const useWallet = () => {
  onMounted(async () => {
    wallet.value = await getWallet();
  });

  const signIn = () => {
    wallet.value.requestSignIn("hiba.testnet");
  };

  const signOut = () => {
    wallet.value.signOut();
    window.location.reload();
  };
  return { wallet, signIn, signOut };
};

export const useNearAuth = () => {
  onMounted(() => {
    if (wallet.value?.isSignedIn())
      accountId.value = wallet.value.getAccountId();
  });

  watch(wallet, () => {
    accountId.value = wallet.value.getAccountId();
  });

  return {
    accountId,
  };
};
