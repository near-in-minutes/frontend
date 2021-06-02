<template>
  <div class="relative bg-white py-16 sm:py-24 mx-auto px-4 max-w-6xl">
    <div
      class="
        lg:mx-auto
        lg:max-w-7xl
        lg:px-8
        lg:grid lg:grid-cols-1
        lg:gap-24
        lg:items-start
      "
    >
      <div class="relative sm:py-16 lg:py-0">
        <div
          aria-hidden="true"
          class="
            hidden
            sm:block
            lg:absolute
            lg:inset-y-0
            lg:right-0
            lg:w-screen
          "
        >
          <div
            class="
              absolute
              inset-y-0
              right-1/2
              w-full
              bg-gray-50
              rounded-r-3xl
              lg:right-72
            "
          />
          <svg
            class="
              absolute
              top-8
              left-1/2
              -ml-3
              lg:-right-8
              lg:left-auto
              lg:top-12
            "
            width="404"
            height="392"
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="392"
              fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
            />
          </svg>
        </div>
        <div
          class="
            relative
            mx-auto
            max-w-md
            px-4
            sm:max-w-3xl
            sm:px-6
            lg:px-0
            lg:max-w-none
            lg:py-20
          "
        >
          <div
            class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden"
          >
            <div class="h-60">
              <iframe
                :src="`https://www.loom.com/embed/${video.link}`"
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                "
              />
            </div>
          </div>
        </div>
      </div>

      <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
        <!-- Content area -->
        <div class="pt-12 sm:pt-16 lg:pt-20">
          <div class="mt-10">
            <dl class="grid grid-cols-2">
              <h2
                class="
                  text-3xl text-green
                  font-extrabold
                  tracking-tight
                  sm:text-4xl
                "
              >
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
          <div class="mt-6 space-y-6 border-t-2 border-gray pt-6">
            <p class="text-lg">
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
              urna sed consectetur neque tristique pellentesque. Blandit amet,
              sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi
              vel porttitor vitae ut. Amet vitae fames senectus vitae.
            </p>
            <p class="text-base leading-7">
              Sollicitudin tristique eros erat odio sed vitae, consequat turpis
              elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu
              viverra donec ut volutpat donec laoreet quam urna. Sollicitudin
              tristique eros erat odio sed vitae, consequat turpis elementum.
              Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut
              volutpat donec laoreet quam urna.
            </p>
            <p class="text-base leading-7">
              Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt
              vel ultricies. Vulputate aliquet velit faucibus semper.
              Pellentesque in venenatis vestibulum consectetur nibh id. In id ut
              tempus egestas. Enim sit aliquam nec, a. Morbi enim fermentum
              lacus in. Viverra.
            </p>
          </div>
          <div class="mt-10 border-t-2 border-gray pt-6">
            <a href="#" class="text-base font-medium">
              Learn more about
              <span aria-hidden="true">{{ video.title }} &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVideo } from "@/composables/videos";
import { useI18n } from "vue-i18n";

export default {
  name: "Video",
  props: ["id"],
  setup(props) {
    const { locale } = useI18n();
    const video = useVideo(locale, parseInt(props.id));

    return { video };
  },
};
</script>
