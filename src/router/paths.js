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
        path: '/units/search',
        name: 'Categories',
        view: 'UnitSearch',
        meta: {
            guest: true
        }
    },
    {
        path: '/units/:id',
        name: 'single-unit',
        view: 'SingleUnit',
        meta: {
            guest: true
        }
    },
    {
        path: '/dashboard/company-profile',
        name: 'companyProfile',
        view: 'companyProfile',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/change-password-request',
        name: 'change-password-request',
        view: 'ChangePasswordRequest',
        meta: {
            guest: true
        }
    },
    {
        path: '/auth/change-password/:token',
        name: 'ChangePassword',
        view: 'PasswordChange',
        meta: {
            guest: true
        }
    },
    {
        path: "/auth/after-login",
        name: "AfterLogin",
        view: "AfterLogin",
        meta : {
            requiresAuth: true
        },
        beforeEnter(to, from, next) {
            if (window.$cookies.isKey('user')) {
                next();
            } else {
                store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    message: "Please login first",
                    type: "error"
                }, { root: true });
                next('/login')
            }
        }
    },
    {
        path: '/auth/user-activation/:userId',
        name: "ActivateAccount",
        view: "Activation"
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        view: 'DashBoard',
        meta: {
            requiresAuth: true
        },
        beforeEnter (to, from, next) {
            if(window.$cookies.isKey('user')) {
                next();
            } else {
                store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    message:"Please login first",
                    type: "error"
                }, { root: true });
                next('/login')
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
            let user = window.$cookies.get('user')
            if(!user) {
                store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    message:"Please login first",
                    type: "error"
                }, { root: true })
                next('/login')

            } else {
                if(!user.isAdmin) {
                     if (!window.$cookies.isKey('userProfile')) {
                    store.dispatch('alert/errorAlert', 
                    {
                        mKey: Math.floor(Math.random() * Math.floor(20)),
                        message:"You don't have a profile yet. Please set up one",
                        type: "error",
                        stage: "within"
                    }, 
                    { 
                        root: true 
                    })

                    next()
                    }
                } else {
                    next('/admin')
    
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
        path: '/blog/:slug',
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
        beforeEnter(to, from, next) {
            if(!window.$cookies.isKey('user')) {
                store.dispatch('alert/errorAlert', {
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    message:"Log in first Please",
                    type: "error",
                  
                }, { root: true })
                next('/login')
            } else {
                if(!window.$cookies.get('user').isAdmin) {
                    store.dispatch('alert/errorAlert', {
                        mKey: Math.floor(Math.random() * Math.floor(20)),
                        message:"You are not authorized",
                        type: "warning",
                        stage: "within"
                    }, { root: true })
                    next('/dashboard')
                } else {
                    next()
                }
            }
            
        },
        meta: {
            requiresAuth: true,
            is_admin: true
        }
    },
    {
        path: '/about-us',
        name: 'AboutUs',
        view: 'About',
        meta: {
            guest: true
        }
    }
]
