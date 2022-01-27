<template>
  <div class="relative py-16 bg-near-gray">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:content-center lg:justify-between">
      <h2 class="font-extrabold tracking-tight text-gray-900">
        <span class="block text-4xl">You can't find a suitable bounty? </span>
        <span class="block text-near-green text-2xl">Check proposals and propose your own bounty.</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex pt-14">
          <BaseButton btn-text="Check proposals" link="/nim-dao/proposals" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    BaseButton
  },
  setup() {
    return {};
  }
};
</script>
