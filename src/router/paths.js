import store from '@/store';

export default [
    {
        path: '/',
        name: 'home',
        view: 'Home',
        meta: {
            guest: true
        }
    },
    {
        path: '/newunit',
        name: 'add-unit',
        view: 'AddNewUnit',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/units',
        name: 'units',
        view: 'Units',
        meta: {
            guest: true
        }
    },
    {
        path: '/single-unit',
        name: 'single-unit',
        view: 'SingleUnit',
        meta: {
            guest: true
        }
    },
    {
        path: '/change-password-request',
        name: 'change-password-request',
        view: 'ChangePassword',
        meta: {
            guest: true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        view: 'Dashboard',
        meta: {
            requiresAuth: true
        },
        beforeEnter (to, from, next) {
            if(!window.$cookies.isKey('user')) {
                next()
            } else {
                store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    message:"Please login first",
                    type: "error"
                }, { root: true })
                next({
                    name: 'Login'
                })
            }
        }
    },

    {
       path: '/dashboard/userprofile',
        name: 'Profile',
        view: 'Profile',
        meta: {
            requiresAuth: true
        },
        beforeEnter (to, from, next) {
            if(!window.$cookies.isKey('user')) {
                store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    message:"Please login first",
                    type: "error"
                }, { root: true })
                next('/login')

            } else {
                if (!window.$cookies.isKey('userProfile')) {
                    store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    message:"You don't have a profile yet. Please set up one",
                    type: "error"
                    }, { root: true })

                    next({
                        name: 'dashboard'
                    })
                } else {
                    next()
                }
            }
        } 
    },

    {  
        path: '/blogs',
        name: 'Blog',
        view: 'Blog',
        meta: {
            guest: true
        }
    },
    {
        path: '/single-blog',
        name: 'single-blog',
        view: 'SingleBlog',
        meta: {
            guest: true
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        view: 'SignUp',
        meta: {
            guest: true,
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'LogIn',
        view: 'Login',
        meta: {
            guest: true,
            requiresAuth: false
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        view: 'Admin',
        meta: {
            requiresAuth: true,
            is_admin: true
        }
    },{
        path: '/about-us',
        name: 'AboutUs',
        view: 'About',
        meta: {
            guest: true
        }
    }
]
