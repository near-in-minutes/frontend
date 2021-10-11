<template>
  <Dialog as="template" class="fixed z-10 inset-0 overflow-y-auto" :open="isOpen" @close="setBountyDoneModal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 p-10">
        <div class="">
          <DialogTitle as="h3" class="text-lg font-medium text-gray-900">
            <p class="">You are about to claim this bounty are you sure ?</p>
            <!-- <p class="text-sm text-gray-700">Proposed by: {{ bountyDone.proposer }}</p> -->
          </DialogTitle>

          <div class="flex justify-between"></div>

          <p class="text-sm text-gray-500 px-10 pt-2"></p>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm" @click="handleClaimBounty(id, claimDeadline)">Claim</button>
          <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm" @click="setBountyClaimModal(false, id, maxDeadline)">Cancel</button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';

export default {
  components: { Dialog, DialogOverlay, DialogTitle },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    setBountyClaimModal: {
      type: Function,
      required: true
    },
    id: { type: Number, required: true },
    handleClaimBounty: { type: Function, required: true },
    claimDeadline: { type: Number, required: true }
  },
  setup() {
    return {};
  }
};
</script>
