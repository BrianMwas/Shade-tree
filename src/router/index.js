import Vue from 'vue'
import VueRouter from 'vue-router'
import paths from './paths'
import PageNotFound from "@/views/PageNotFound.vue"


Vue.use(VueRouter)


function route(path, view, name, meta, beforeEnter) {
  return {
    name: name,
    path,
    meta,
    beforeEnter,
    
    component: (resolve) => import(
      `@/views/${view}.vue`
    ).then(resolve)
  }
}


const router = new VueRouter({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.meta, path.beforeEnter)).concat([
    { path: '*', name: "404", component: PageNotFound }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})


// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
    
//     if(!window.$cookies.isKey('user')) {
//       // Prevent continuous redirection if the user is in the
//       if (to.path !== '/login')  { 
//         next({
//           path: '/login',
//           params: { nextUrl: to.fullPath }
//         })
//       }
//     } else {
//       let user = $cookies.get('user').data;
//       if(to.matched.some(record => record.meta.is_admin)) {
//         if(user.isAdmin) {
//           next()
//         } else {
//           next({
//             name: 'dashboard'
//           })
//         }
//       } else {
//         next()
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if(window.$cookies.get('user')) {
//       next()
//     } else {
//       next({
//         name: 'dashboard'
//       })
//     }
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
//   const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)


//   if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

//   Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))


//   if(!nearestWithMeta) return next();

//   nearestWithMeta.meta.metaTags.map(tagRef => {
//     const tag = document.createElement('meta');

//     Object.keys(tagRef).forEach(key => {
//       tag.setAttribute(key, tagRef[key]);
//     })

//     tag.setAttribute('data-vue-router-controlled', '');

//     return tag;
//   }).forEach(tag => {
//     document.head.appendChild(tag);

//     next();
//   })


// })

export default router
