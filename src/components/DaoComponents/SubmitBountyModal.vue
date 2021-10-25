<template>
  <Dialog as="template" class="fixed z-10 inset-0 overflow-y-auto" :open="isOpen" @close="setBountyDoneModal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div class="">
          <DialogTitle as="h3" class="text-lg font-medium text-gray-900 bg-red-200 pl-10 pr-40 py-20"> Fill in the following information to submit your work </DialogTitle>
          <form>
            <!-- {{result}} -->
              <div v-html="marked(result)" id="description"></div>
            <input v-model="title" placeholder="Title" class="border rounded p-1 px-3 w-72" />
            <input v-model="description" placeholder="Description" />
            <input v-model="link" placeholder="Link" />
          </form>

          <button @click="setBountyDoneModal(false)">Ok</button>
          <button @click="handleSubmit()">submirr</button>
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
import marked from 'marked';

export default {
  components: { Dialog, DialogOverlay, DialogTitle },
  props: ['isOpen', 'setBountyDoneModal', 'handleBountyDone', 'accountId', 'bountyId'],

  setup(props) {
    const title = ref('');
    const description = ref('');
    const link = ref('');
    const result = ref('')
    //  " # Building projects  \n #### this is description of the project I want to submit and it's related to a and b and c \n\n [Click here for more details](https://www.example.com)"
    // bounty.bounty.bounty_id, accountId, 'I am done with this bounty'
    const handleSubmit = () => {
      const data = `# ${title.value} \n #### ${description.value} \n\n  Submission link: [Click here](https://${link.value}) target="_blank"} `;
      console.log(props.bountyId);
      console.log(props.accountId);
      console.log(data);
      result.value = data
    };
    return { fromUnixTime, format, handleSubmit, title,description,link,result ,marked};
  }
};
</script>
