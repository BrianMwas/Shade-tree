import Vue from 'vue'
import VueRouter from 'vue-router'
import paths from './paths'


Vue.use(VueRouter)


function route(path, view, name, meta, beforeEnter) {
  return {
    name: name || view,
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
    { path: '*', redirect: '/' }
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

export default router
