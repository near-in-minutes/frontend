<template>
  <div class="relative max-w-6xl m-auto mt-20">
    <div class="text-center">
      <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">How It Works</h2>
      <p class="mt-3 text-xl sm:mt-4 text-near-gray-dark">NimDAO funds people to create videos about NEAR.</p>
    </div>
    <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
      <li v-for="item in infos" :key="item.title" class="col-span-1">
        <div class="flex flex-col items-center rounded-lg justify-center px-4 py-2">
          <img :src="item.image" class="w-20 my-10 text-near-orange" />
          <h1 class="text-gray-900 font-medium hover:text-near-green text-md">{{ item.title }}</h1>
          <p class="text-gray-500 text-sm mt-2 text-center">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  setup() {
    const infos = [
      { title: 'Select a bounty', description: 'Browse the list of bounties and select the most suitable bounty for you', image: require('@/assets/nim-dao/icons/select.svg'), color: 'near-orange' },
      { title: 'Claim the bounty', description: 'Check the deadline of each bounty and claim it', image: require('@/assets/nim-dao/icons/verify.svg') },
      { title: 'Do your magic', description: 'Create your work and make sure to submit in the My bounties page before the deadline', image: require('@/assets/nim-dao/icons/shuttle.svg') },
      { title: 'Get paid', description: 'Wait until your work is approved and check the result bounty done proposal to earn your reward', image:  require('@/assets/nim-dao/icons/earn.svg') }
    ];
    return {
      infos
    };
  }
};
</script>
