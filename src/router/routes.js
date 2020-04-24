export default [
  {
    path: '/',
    name: 'Posts',
    component: () => import('@/views/Posts'),
    meta: {
      title: 'Home',
      page: 'Home',
      display: true,
    },
  },
  {
    path: '/post/:id?',
    name: 'Post',
    component: () => import('@/views/Post'),
    meta: {
      title: 'Post',
      page: 'Post',
      display: false,
    },
  },
  {
    path: '/create',
    name: 'New Post',
    meta: {
      title: 'New post',
      page: 'Create',
      display: true,
    },
    component: () => import('@/views/Create.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404',
      page: '404',
      display: false,
    },
  },
]
