<template>
  <div class="mt-10">
    <dl class="grid grid-cols-2">
      <h2 class="text-3xl text-near-green font-extrabold tracking-tight sm:text-4xl">
        {{ video.title }}
      </h2>
      <div class="flex justify-end">
        <div class="flex-shrink-0">
          <span class="sr-only">{{ video.author.name }}</span>
          <img class="h-10 w-10 rounded-full" :src="video.author.githubAvatar" alt="" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            {{ video.author.name }}
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <time :datetime="video.create_at">
              {{ formatDate(video.created) }}
            </time>
            <span aria-hidden="true"> &middot; </span>
            <span> {{ formatDuration(video.duration) }} </span>
          </div>
        </div>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(d) {
      const date = new Date(d);
      return date.toLocaleDateString();
    },

    // formats duration in seconds into mins:secs
    formatDuration(d) {
      const mins = Math.floor(d / 60);
      const secs = d % 60;
      return `${mins}:${secs.toString().length === 1 ? `0${secs}` : secs}`;
    }
  }
};
</script>
