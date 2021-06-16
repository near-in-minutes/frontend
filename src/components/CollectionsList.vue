<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative bg-white py-16 sm:py-24 lg:py-32">
    <div
      class="
        mx-auto
        max-w-md
        px-4
        text-center
        sm:max-w-3xl
        sm:px-6
        lg:px-8
        lg:max-w-7xl
      "
    >
      <h2
        class="text-base font-semibold tracking-wider text-cyan-600 uppercase"
      >
        Collections
      </h2>
      <p
        class="
          mt-2
          text-3xl
          font-extrabold
          text-gray-900
          tracking-tight
          sm:text-4xl
        "
      >
        Take a look at our collections
      </p>
      <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
        Start your journey with series of videos in each collection
      </p>
    </div>
  </div>
  <div class="flex justify-center">
    <ul
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="project in projects"
        :key="project.fields.name"
        class="col-span-1 flex shadow-sm rounded-md"
      >
        <div
          :class="[
            project.fields.bgColor,
            'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md',
          ]"
        >
          {{ project.fields.total_posts }}
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-between
            border-t border-r border-b border-gray-200
            bg-white
            rounded-r-md
            truncate
          "
        >
          <div class="flex-1 px-4 py-2 text-sm truncate">
            <router-link
              to="/videos"
              class="text-gray-900 font-medium hover:text-gray-600"
              >{{ project.fields.name }}
            </router-link>

            <p v-if="project.fields.total_posts > 1" class="text-gray-500">
              {{ project.fields.total_posts }} Videos
            </p>
            <p v-else class="text-gray-500">
              {{ project.fields.total_posts }} Video
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const projects = [
  {
    id: "recAjxhCp2Drmwrqq",
    fields: {
      content: [
        "recOHG1qYIrYYS9jv",
        "recy4tBCCTmvDegrO",
        "recXufkVZCEkPWaik",
        "recKDbc2Vs6Y0MP2e",
        "recBHQ3aki9fjqTMt",
        "recxThp5BLjROhkzC",
        "recLRik9hBdxJlsvh",
        "recmgBogDCBLTbE5C",
        "recT9jl7gpdnVnPpG",
        "rece80fdsDRfEJski",
        "recrIJPN33Iv4FZwT",
        "recN4J70CZxvqgimc",
        "recaJJsz1hUqJq5X2",
        "recVPbpQk81DefqRL",
        "recmBRxZR6onMyKsg",
      ],
      translations: ["recGeZaKhvJwUZF3d"],
      name: "NEAR CLI",
      total_posts: 15,
      bgColor: "bg-red",
      authors: [
        "Sherif Abushadi",
        "Anuj Duggal",
        "Ozan İşgör",
        "Çağatay Soyer",
      ],
    },
  },
  {
    id: "rec8yQ3vbGBYDu1Fe",
    fields: {
      content: [
        "recQqTwXEB9gCcZUT",
        "recsSXI2mOYr0gINY",
        "recjdYsPiQWTjAYmR",
        "receoMmJsJ2VwDcF2",
        "recm5wSCF4Z7QkpIk",
        "recg2BpM7VfAFb2YE",
        "reclNeAql6SAA18gB",
        "recnVloUSZ9D6vJeY",
        "recvf9aKhxn7x90Dy",
        "rec5fkTiGREyIt5O8",
      ],
      translations: [
        "recHPln6jOK8KXFnm",
        "recjyQeIBZeR1mxBy",
        "recHAbIIxvOesvg3f",
        "recYnOBLQMRShB6hi",
        "recGOGYGlF7eQgWBK",
        "recUpkjAYlxJ1GEFF",
        "receJi9cS7zWzZEDP",
        "recP52SZTpw6tiuB3",
        "rec5kn5mumh95xoSc",
        "recOygZVz8l45cdoV",
      ],
      name: "NEAR Academy",
      total_posts: 10,
      bgColor: "bg-royal",
      authors: ["Hiba Machfej"],
    },
  },
  {
    id: "recgleGPqz6M4DUd0",
    fields: {
      content: ["recapkZOWlD6q6XlE"],
      name: "near-api-js",
      total_posts: 1,
      bgColor: "bg-orange",
      authors: ["Hiba Machfej"],
    },
  },
];

export default {
  components: {},
  setup() {
    return {
      projects,
    };
  },
};
</script>
