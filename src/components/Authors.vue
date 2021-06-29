/* eslint-disable */
<template>
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
    <div class="text-center py-16">
      <h3 class="text-3xl font-extrabold sm:text-4xl">Contributors</h3>
      <p class="mt-3 max-w-7xl mx-auto text-xl sm:mt-4">
        Meet our Contributors
      </p>
    </div>
    <ul
      class="
        grid grid-cols-1
        gap-6
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      <li
        v-for="person in profiles"
        :key="person.email"
        class="col-span-1 flex flex-col text-center bg-white rounded-lg"
      >
        <div
          class="
            group
            block
            w-full
            py-3
            aspect-w-10 aspect-h-7
            rounded-lg
            bg-gray-100
          "
        >
          <router-link :to="{ name: 'Author', params: { id: person.id } }">
            <img
              class="
                w-32
                h-32
                flex-shrink-0
                mx-auto
                bg-black
                rounded-full
                object-cover
                pointer-events-none
                group-hover:opacity-75
              "
              :src="person.fields.githubAvatar"
              alt="profileImg"
            />

            <h3 class="mt-6 text-gray-900 text-sm font-medium">
              {{ person.fields.name }}
            </h3>
            <p class="text-sm mt-3 text-gray-500">
              github / {{ person.fields.githubUname }}
            </p>
          </router-link>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    getAvatars() {
      let text = ".com/";
      this.profiles.forEach((element) => {
        element.fields.githubAvatar = element.fields.github + ".png";
      });
      this.profiles.forEach((element) => {
        element.fields.githubUname = element.fields.github.slice(
          element.fields.github.indexOf(text) + text.length
        );
      });
    },
  },
  data() {
    return {
      profiles: [
        {
          id: "recX6z7jkpuzPB6wE",
          fields: {
            near_account: "anuj.near",
            content: [
              "rec5Zxl6T61Wx2BHi",
              "rec5Zqrxy7NLcTrse",
              "recF3qYbHBk2bS8jV",
              "rec26dGfXtl4cAdMp",
              "recsW1pOaMGHQV8WM",
              "rec9c8H1TNrjxmtbj",
              "reca0bdi3cs4M6sLo",
              "rectLiJe0oQVA7BoQ",
              "recppWeX7KIB0Hz5t",
              "recoSrb5F8duXjuCH",
              "reciGtAGsJ1r0BpaX",
              "recsh1yfvYmBFWABY",
              "recDdRgp8K3zEOyNx",
            ],
            languages: ["en", "hi"],
            email: "anujduggal61@gmail.com",
            name: "Anuj Duggal",
            contributions: 13,
            github: "https://github.com/BigDaddy-Zephyr",
          },
        },
        {
          id: "recGPHUiWCx3fIYDz",
          fields: {
            near_account: "hiba.near",
            content: [
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
              "recYldLmHzRZwG3Yw",
            ],
            languages: ["en", "ar"],
            email: "hiba.mashfij@gmail.com",
            name: "Hiba Machfej",
            contributions: 11,
            github: "https://github.com/hiba-machfej",
          },
        },
        {
          id: "recNC2EXld5fK31pR",
          fields: {
            near_account: "ozanisgor.near",
            content: [
              "rec0Jye43xrUeFGev",
              "recYQeNrkZKL4Kqa1",
              "recfPU13M165xgqxP",
              "reck1gA25UhtcBN1P",
              "recP4Wq9Y1kabISv5",
              "reccRqvfAAXrq1ulu",
              "rec7xflGEqWMyCzed",
              "recJy6ZpHFKUNo2lL",
              "rece5lXvlDsteKOPw",
              "recYEqhhPOyWjJ65a",
              "recVHq30MVQ7aRtRq",
            ],
            languages: ["en", "tr"],
            email: "ozanisgor11@gmail.com",
            name: "Ozan İşgör",
            contributions: 11,
            github: "https://github.com/ozanisgor",
          },
        },
        {
          id: "recoFeOaSh7PSwWPT",
          fields: {
            near_account: "cagataysoyer.near",
            content: [
              "recfJ5s8m9fEqm1ov",
              "rec9moWW3M5Habc0o",
              "recS3vE3ZEOD8wIZ1",
              "recMscZX4KbFUjdMg",
              "recSw2nSkVUw1YpVb",
              "recwy0FqyHUfwNLSD",
              "recVmsKGabxBJrCke",
              "recx6XO9ImZ3ZsgmH",
              "recQmNQiOSz5qcEus",
              "recXTOFre5j2SA5Xl",
              "recIVjXwXpZkFpdtr",
            ],
            languages: ["en", "tr"],
            email: "cagataysoyer@gmail.com",
            name: "Çağatay Soyer",
            contributions: 11,
            github: "https://github.com/norrec99",
          },
        },
        {
          id: "recX0zpA6wQiB9k2q",
          fields: {
            near_account: "sherif.near",
            content: [
              "recGeZaKhvJwUZF3d",
              "recHbYZZkF7XYZaC1",
              "recne3cYbRkzejfWj",
            ],
            languages: ["en"],
            email: "sherif@near.org",
            name: "Sherif Abushadi",
            contributions: 3,
            github: "https://github.com/amgando",
          },
        },
      ],
    };
  },
  created() {
    this.getAvatars();
  },
};
</script>
