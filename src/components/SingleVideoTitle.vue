<template>
  <div class="mt-10">
    <dl class="grid grid-cols-2">
      <h2 class="text-3xl text-green font-extrabold tracking-tight sm:text-4xl">
        {{ video.collection }} -
        {{ video.title }}
      </h2>
      <div class="flex justify-end">
        <div class="flex-shrink-0">
          <span class="sr-only">{{ video.creator_name }}</span>
          <img
            class="h-10 w-10 rounded-full"
            :src="video.creator_imageUrl"
            alt=""
          />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            {{ video.creator_name }}
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <time datetime="video.datetime"> {{ video.date }} </time>
            <span aria-hidden="true"> &middot; </span>
            <span> {{ video.time }} </span>
          </div>
        </div>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: "VideoBase",
  props: ["video"],
  setup() {},
};
</script>
