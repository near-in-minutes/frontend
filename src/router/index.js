import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '@/pages/HomePage';
import ListVideosPage from '@/pages/ListVideosPage';
import SingleVideoPage from '@/pages/SingleVideoPage';
import ListCollectionsPage from '@/pages/ListCollectionsPage';
import SingleCollectionPage from '@/pages/SingleCollectionPage';
import ListAuthorsPage from '@/pages/ListAuthorsPage';
import SingleAuthorPage from '@/pages/SingleAuthorPage';
import ContributePage from '@/pages/ContributePage.vue';
import AboutPage from '@/pages/AboutPage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/videos',
    name: 'videos',
    component: ListVideosPage
  },
  {
    path: '/videos/:id',
    name: 'video',
    component: SingleVideoPage,
    props: true
  },
  {
    path: '/collections',
    name: 'collections',
    component: ListCollectionsPage
  },
  {
    path: '/collections/:id',
    name: 'collection',
    component: SingleCollectionPage,
    props: true
  },
  {
    path: '/authors',
    name: 'authors',
    component: ListAuthorsPage
  },
  {
    path: '/authors/:id',
    name: 'author',
    component: SingleAuthorPage,
    props: true
  },
  {
    path: '/contribute',
    name: 'contribute',
    component: ContributePage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
