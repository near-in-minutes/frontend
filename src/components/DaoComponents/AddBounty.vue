<template>
  <div class="pt-5 my-20 text-center">
    <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green" id="bounties-div">Add Proposal</h2>
    <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">Fill in the current form to add a new proposal</p>
  </div>
  <div class="flex items-center justify-center my-20">
    <div class="bg-white shadow sm:rounded-lg sm:p-6 max-w-6xl p-10">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Propose a new topic</h3>
          <p class="mt-1 text-sm text-gray-500">If you have a topic that you would like to see on NiM you can create a proposal for it. You or any other member of the community can claim the bounty proposal after it is approved.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form class="space-y-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="title" class="block text-sm font-medium text-gray-700"> Title </label>
                <div class="mt-1">
                  <input id="title" name="title" v-model="title" placeholder="Title" class="p-2 border rounded-md w-full border-gray-300" />
                </div>
              </div>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>

              <div class="mt-1">
                <textarea id="description" name="description" v-model="description" rows="3" class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Description" />
              </div>
              <p class="mt-2 text-sm text-gray-500">Brief description for your proposal. URLs are hyperlinked.</p>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="amount" class="mb-2 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Amount </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <select id="amount" name="amount" v-model="amount" class="p-2 max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border bg-red-900border-gray-300 rounded-md">
                    <option>2 NEAR</option>
                    <option>5 NEAR</option>
                    <option>10 NEAR</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="maxDeadline" class="mb-2 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Deadline </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <select id="maxDeadline" v-model="maxDeadline" name="maxDeadline" class="p-2 max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border bg-red-900border-gray-300 rounded-md">
                    <option>1 Week</option>
                    <option>2 Weeks</option>
                    <option>1 Month</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div class="flex justify-end">
            <button :onClick="handleSubmit" class="cursor-pointer mt-8 w-30 inline-flex items-center justify-center px-5 py-3 font-medium rounded-md text-white bg-near-green hover:bg-green-600 hover:text-white transform hover:scale-105 sm:w-auto">Add bounty</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    handleAddBounty: {
      type: Function,
      required: true
    }
  },
  components: {},
  setup(props) {
    const title = ref('');
    const description = ref('');
    const amount = ref('2 NEAR');
    const maxDeadline = ref('1 Week');
    const handleSubmit = () => {
      props.handleAddBounty({
        title,
        description,
        amount,
        maxDeadline
      });
    };

    return {
      handleSubmit,
      title,
      description,
      amount,
      maxDeadline
    };
  }
};
</script>

<style></style>
