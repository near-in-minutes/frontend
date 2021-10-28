<template>
  <div class="relative max-w-6xl m-auto mt-20">
    <div class="pt-10 my-20 text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">Frequently asked Questions</h2>
        <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark"></p>
      </div>
 <Disclosure v-slot="{ open }">
        <DisclosureButton class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-green-900 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
          <span>I want to create a video about a certain topic but it's not available in the proposals list?</span>
          <ChevronUpIcon :class="open ? 'transform rotate-0' : 'transform rotate-180'" class="w-5 h-5 text-green-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div class="mx-auto max-w-6xl px-4 bg-white">
            <div class="px-4">
              <p class="">
               If you have a topic in mind, you can suggest your topic by using github issues.  
              </p>
  
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

     
  </div>
</template>

<script>
import { ChevronUpIcon, InformationCircleIcon } from '@heroicons/vue/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

export default {
  components: {

    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon
  },
  setup() {
 
    return {  };
  }
};
</script>
