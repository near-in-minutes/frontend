<template>
  <div as="nav" class="max-w-full mx-auto m-4 px-10 sm:px-12">
    <div class="relative flex items-center justify-between">
      <div
        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
      >
        <router-link to="/">
          <div class="flex-shrink-0 flex items-center">
            <img class="w-44" src="@/assets/logo.png" alt="Workflow" />
          </div>
        </router-link>
      </div>

      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      >
        <select v-model="$i18n.locale" class="text-2xl">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
