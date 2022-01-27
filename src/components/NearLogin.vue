<template>
  <div class="">
    <div v-if="accountId" class="flex justify-between">
      <Popover class="relative" v-slot="{ open }">
        <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-600 hover:bg-near-gray hover:text-black', 'text-gray-600 hover:bg-near-gray hover:text-black rounded-md my-4 px-3 inline-flex items-center font-medium h-10']">
          {{ accountId }}
          <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
        </PopoverButton>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
          <PopoverPanel class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
            <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                <router-link to="/nim-dao/user-bounties" class="text-center hover:bg-near-gray hover:text-gray-900 -m-3 p-3 block rounded-md'"> My bounties </router-link>
                <button @click="signOut" class="hover:bg-near-gray hover:text-gray-900 -m-3 p-3 block rounded-md'">
                  {{ 'Log out' }}
                </button>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </div>

    <button v-else @click="signIn" class="mr-5 text-near-green">
      {{ 'Connect NEAR Wallet' }}
    </button>
  </div>
</template>

<script>
import { wallet, CONTRACT_ID } from '@/services/near';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    ChevronDownIcon
  },
  setup() {
    const accountId = wallet.getAccountId();
    return {
      accountId,
      signIn: () => wallet.requestSignIn(CONTRACT_ID),
      signOut: () => {
        wallet.signOut();
        window.location.reload();
      }
    };
  }
};
</script>

<style></style>
