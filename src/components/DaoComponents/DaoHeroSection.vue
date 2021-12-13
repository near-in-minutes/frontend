<template>
  <kinesis-container>
    <div class="background relative max-w-6xl m-auto rounded-3xl overflow-hidden flex">
      <div class="flex flex-col my-auto ml-10 w-1/2">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl">Create short video tutorials about NEAR and earn money</h2>
        <p class="mt-3 max-w-6xl mx-auto text-xl sm:mt-4">Share your knowledge and earn money in a boundless system</p>
        <button @click="scrollToElement" class="cursor-pointer py-2 mt-8 w-48 inline-flex items-center justify-center px-5 py-3 font-medium rounded-md text-white bg-near-royal hover:bg-near-royal-dark hover:text-white transform hover:scale-105 sm:w-auto">Pick a bounty</button>
      </div>
      <div class="grid grid-cols-3 grid-row-6">
        <kinesis-element :strength="-60" type="translate" axis="y" class="col-start-0 col-end-1 justify-self-end -mt-6"
          ><kinesis-element :strength="70" type="translate" axis="x">
            <div class="bg-near-red rounded-full w-40 h-40 flex items-center justify-center ml-48"><img class="w-32 h-32 rounded-full my-10 hidden md:block" src="@/assets/nim-dao/video.jpg" alt="Video" /></div></kinesis-element
        ></kinesis-element>
        <kinesis-element :strength="-50" type="translate" axis="y" class="col-start-2 col-end-3 row-start-0 row-end-1 justify-self-start -mt-2"
          ><kinesis-element :strength="-70" type="translate" axis="x">
            <div class="bg-white rounded-full w-24 h-24 flex items-center justify-center"><img class="w-20 my-10 hidden md:block" src="@/assets/nim-dao/near_logo_stack.svg" alt="NEAR Logo" /></div></kinesis-element
        ></kinesis-element>
        <kinesis-element :strength="100" type="translate" axis="y" class="col-start-2 col-end-3 row-start-1 row-end-2 place-self-start mb-10"
          ><kinesis-element :strength="100" type="translate" axis="x">
            <div class="bg-near-green rounded-full w-20 h-20 flex items-center justify-center"><img class="w-16 my-10 hidden md:block" src="@/assets/nim-dao/people.png" alt="People" /></div></kinesis-element
        ></kinesis-element>
        <kinesis-element :strength="-80" type="translate" axis="y" class="col-start-1 col-end-1 row-start-4 row-end-5 z-10"
          ><kinesis-element :strength="-70" type="translate" axis="x">
            <div class="bg-near-royal rounded-full w-16 h-16 flex items-center justify-center"><img class="w-10 my-10 hidden md:block" src="@/assets/nim-dao/languages.png" alt="Languages" /></div></kinesis-element
        ></kinesis-element>
        <kinesis-element :strength="70" type="translate" axis="y" class="col-start-2 col-end-2 row-start-3 row-end-5"
          ><kinesis-element :strength="70" type="translate" axis="x">
            <div class="bg-white rounded-full w-40 h-40 flex items-center justify-center"><img class="w-28 mb-3 hidden md:block" src="@/assets/logo.png" alt="NEAR in Minutes Logo" /></div></kinesis-element
        ></kinesis-element>
        <kinesis-element :strength="70" type="translate" axis="y" class="col-start-1 col-end-2 row-start-5 row-end-6 -mb-5"
          ><kinesis-element :strength="-50" type="translate" axis="x">
            <div class="bg-near-orange rounded-full w-44 h-44 flex items-center justify-center"><img class="w-32 my-10 hidden md:block" src="@/assets/nim-dao/dao.png" alt="Dao" /></div></kinesis-element
        ></kinesis-element>
      </div>
    </div>
  </kinesis-container>
</template>

<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis';

export default {
  components: {
    KinesisContainer,
    KinesisElement
  },

setup() {
  const scrollToElement = () => {
      document.getElementById("bounties-div").scrollIntoView({behavior: "smooth"});
  }
return { scrollToElement };
}
};
</script>

<style lang="postcss" scoped>
.background {
  animation: colorchange 7s ease-in-out infinite;
  -webkit-animation: colorchange ease-in-out 7s infinite;
}

@keyframes colorchange {
  0% {
    @apply bg-near-red-light;
  }

  50% {
    @apply bg-near-green-light;
  }
  100% {
    @apply bg-near-red-light;
  }
}
@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */ {
  0% {
    @apply bg-near-red-light;
  }

  50% {
    @apply bg-near-green-light;
  }
  100% {
    @apply bg-near-red-light;
  }
}
</style>
