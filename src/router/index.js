import { createRouter, createWebHistory } from 'vue-router';
// 保持你原有的组件引入...
import MainLayout from '../layouts/MainLayout.vue';
import Identity from '../views/Identity/Index.vue';
import Projects from '../views/Projects/Index.vue';
import Blog from '../views/Blog/Index.vue';
import Contact from '../views/Contact/Index.vue';
import Links from '../views/Links/Index.vue';

// Collab
import CollabIndex from '../views/Collab/Index.vue';
import Music from '../views/Collab/Music.vue';
import Dev from '../views/Collab/Dev.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/identity', // 根路径重定向
    children: [
      { path: 'identity', component: Identity },
      { path: 'projects', component: Projects },
      { path: 'blog', component: Blog },
      { path: 'contact', component: Contact }, 
      { path: 'links', component: Links },
      
      {
        path: 'collab',
        component: CollabIndex,
        redirect: '/collab/music',
        children: [
          { path: 'music', component: Music },
          { path: 'dev', component: Dev },
        ],
      },
    ],
  },
  // 🛡️ 捕获所有未知路径，重回起点
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;