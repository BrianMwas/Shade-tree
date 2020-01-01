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
        path: '/dashboard',
        name: 'dashboard',
        view : 'DashBoard',
        beforeEnter: (to, from, next) => {
            if(!window.$cookies.isKey('user')) {
                store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor()),
                    message: "Please log in first",
                    type: "error",
                    duration: 45000
                })
                next({
                    name: 'LogIn'
                })
            } else {
                next()
            }
        },
        meta: {
            requiresAuth: true
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
