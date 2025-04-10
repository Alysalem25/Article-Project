import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import who_are_we from '../views/who_are_we.vue'
import send_to_us from '../views/send_to_us.vue'
import aricle_page from '../views/aricle_page.vue'
import review from '../views/review.vue'
import not_found from '../views/not_found.vue'
import search_resalt from '../views/search_resalt.vue'
import login from '../views/login.vue'
import tv from '../views/tv.vue'
import gallere from '../views/gallere.vue'
import about_us from '../views/about_us.vue'
import gallare2 from '../views/gallare2.vue'
import profile from '../views/profile.vue'
import user_profile from '../views/user_profile.vue'
// import dashbord from '../components/side_bar/dashbord.vue'
import my_articles from '../views/my_articles.vue'
import text_editor from '../views/text_editor.vue'
import announcement from '../views/announcement.vue'
import all_users from '../views/all_users.vue'
import all_articles from '../views/all_articles.vue'
import all_articles2 from '../views/all_articles2.vue'
import coming_soon from '../views/coming_soon.vue'
import sing_up from '../views/sing_up.vue'
const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    // props : true
  },
  {
    path: '/who_are_we',
    name: 'who_are_we',
    component : who_are_we
  },
  {
    path: '/send_to_us',
    name: 'send_to_us',
    component : send_to_us
  },
  {
    path: '/main/:id',
    name: 'aricle_page',
    component: aricle_page,
    props: true
  },
  {
    path: '/review/:id',
    name: 'review',
    component: review,
    props: true
  },
  {
    path: '/search_resalt/:topic',
    name: 'search_resalt',
    component: search_resalt,
    props :true
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/tv/:id',
    name: 'tv',
    component: tv,
  },
  {
    path: '/gallere',
    name: 'gallere',
    component: gallere,
  },    
  {
    path: '/about_us',
    name: 'about_us',
    component: about_us,
  },    
  {
    path: '/gallare2',
    name: 'gallare2',
    component: gallare2,
  },    
  {
    path: '/profile/:id',
    name: 'profile',
    component: profile,
  },    
  {
    path: '/user_profile/:id',
    name: 'user_profile',
    component: user_profile,
  },    
  // {
  //   path: '/dashbord',
  //   name: 'dashbord',
  //   component: dashbord,
  // },    
  {
    path: '/my_articles',
    name: 'my_articles',
    component: my_articles,
  },    
  {
    path: '/text_editor',
    name: 'text_editor',
    component: text_editor,
  },    
  {
    path: '/announcement',
    name: 'announcement',
    component: announcement,
  },    
  {
    path: '/all_users',
    name: 'all_users',
    component: all_users,
  },    
  {
    path: '/all_articles',
    name: 'all_articles',
    component: all_articles,
  },    
  {
    path: '/all_articles2',
    name: 'all_articles2',
    component: all_articles2,
  },    
  {
    path: '/coming_soon',
    name: 'coming_soon',
    component: coming_soon,
  },    
  {
    path: '/sing_up',
    name: 'sing_up',
    component: sing_up,
  },    
  {
    path: '/:CatchAll(.*)',
    name: 'not_found',
    component : not_found
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
