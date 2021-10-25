<template>
  <Dialog as="template" class="fixed z-10 inset-0 overflow-y-auto" :open="isOpen" @close="setBountyDoneModal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div class="">
          <DialogTitle as="h3" class="text-lg font-medium text-gray-900 bg-red-200 pl-10 pr-40 py-20">
            <p class="">{{ bountyDone.description }}</p>
            <p class="text-sm text-gray-700">Proposed by: {{ bountyDone.proposer }}</p>
          </DialogTitle>

          <div class="flex justify-between px-10 pt-10">
            <p>
              Bounty reciever: <br />
              <span class="font-semibold">{{ bountyDone.kind.BountyDone.receiver_id }}</span>
            </p>
            <p class="px-6 py-3 inline-flex text-xs leading-5 font-semibold rounded-full border border-near-green-light">{{ bountyDone.status }}</p>
          </div>

          <p class="text-sm text-gray-500 px-10 pt-2">Submission date: {{ 
            format(new Date(fromUnixTime(parseInt(bountyDone.submission_time  / 1000000000))), 'HH:mm, dd MMMM yyyy')
            }}</p>
        </div>
        <div class="mt-5 flex justify-center p-5">
          <button type="button" class="w-48 inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-near-green text-xl font-medium text-white hover:bg-green-600 sm:text-sm" @click="setBountyDoneModal(false, bountyDone)">Ok</button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';
import { fromUnixTime, format } from 'date-fns';

export default {
  components: { Dialog, DialogOverlay, DialogTitle },
  props:['isOpen', 'setBountyDoneModal', 'bountyDone'],
  // props: {
  //   isOpen: {
  //     type: Boolean,
  //     required: true
  //   },
  //   setBountyDoneModal: {
  //     type: Function,
  //     required: true
  //   },
  //   bountyDone: {
  //     type: Object,
  //     required: true
  //   }
  // },
  setup() {
    return {fromUnixTime, format};
  }
};
</script>
