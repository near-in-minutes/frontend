import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '@/pages/HomePage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/videos',
    name: 'videos',
    component: () => import(/* webpackChunkName: "videos" */ '@/pages/ListVideosPage')
  },
  {
    path: '/videos/:id',
    name: 'video',
    props: true,
    component: () => import(/* webpackChunkName: "videos" */ '@/pages/SingleVideoPage')
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import(/* webpackChunkName: "collections" */ '@/pages/ListCollectionsPage')
  },
  {
    path: '/collections/:id',
    name: 'collection',
    props: true,
    component: () => import(/* webpackChunkName: "collections" */ '@/pages/SingleCollectionPage')
  },
  {
    path: '/authors',
    name: 'authors',
    component: () => import(/* webpackChunkName: "authors" */ '@/pages/ListAuthorsPage')
  },
  {
    path: '/authors/:id',
    name: 'author',
    props: true,
    component: () => import(/* webpackChunkName: "authors" */ '@/pages/SingleAuthorPage')
  },
  {
    path: '/contribute',
    name: 'contribute',
    component: () => import('@/pages/ContributePage')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  }
});

export default router;
