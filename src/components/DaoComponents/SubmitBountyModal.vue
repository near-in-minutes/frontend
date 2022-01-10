<template>
  <Dialog as="template" class="fixed z-10 inset-0 overflow-y-auto" :open="isOpen" @close="setBountyDoneModal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div class="">
          <DialogTitle as="h3" class="text-lg font-medium text-gray-900 bg-near-gray p-10 py-20"> Fill in the following information to submit your work </DialogTitle>
          <form class="flex flex-col justify-between m-3">
            <input v-model="title" placeholder="Title" class="border rounded p-1 px-3 mt-2" />
            <input v-model="description" placeholder="Description" class="border rounded p-1 px-3 mt-2 h-60" />
            <input v-model="link" placeholder="Link" class="border rounded p-1 px-3 mt-2" />
          </form>
          <div class="-mt-px flex divide-x divide-gray-200 border border-t-1 border-gray-200">
            <div class="w-0 flex-1 flex">
              <button @click="setBountyDoneModal(false)" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">Cancel</button>
            </div>
            <div class="-ml-px w-0 flex-1 flex">
              <button @click="handleSubmit(accountId, bountyId)" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">Submit Bounty</button>
            </div>
          </div>
        </div>
      </div>
      <DialogOverlay />
    </div>
  </Dialog>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';
import { ref, reactive, watch } from 'vue';
import { fromUnixTime, format } from 'date-fns';

export default {
  components: { Dialog, DialogOverlay, DialogTitle },
  props: ['isOpen', 'setBountyDoneModal', 'handleBountyDone', 'accountId', 'bountyId'],

  setup(props) {
    const title = ref('');
    const description = ref('');
    const link = ref('');
    //  " # Building projects  \n #### this is description of the project I want to submit and it's related to a and b and c \n\n [Click here for more details](https://www.example.com)"
    // bounty.bounty.bounty_id, accountId, 'I am done with this bounty'

    const handleSubmit = (accountId, bountyId) => {
      const data = `# ${title.value} \n #### ${description.value} \n\n  Submission link: <a rel="nofollow noreferrer noopener" target="	_blank" href="https://${link.value}">Click here</a>`;

      props.handleBountyDone(bountyId, accountId, data);
      props.setBountyDoneModal(false, bountyId);
    };
    return { fromUnixTime, format, handleSubmit, title, description, link };
  }
};
</script>
