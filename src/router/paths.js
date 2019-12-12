export default [
    {
        path: '/',
        name: 'home',
        view: 'Home'
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        view : 'DashBoard'
    },
    {
        path: '/newunit',
        name: 'add-unit',
        view: 'AddNewUnit'
    },
    {
        path: '/units',
        name: 'units',
        view: 'Units'
    },
    {
        path: '/single-unit',
        name: 'single-unit',
        view: 'SingleUnit'
    },

    {
        path: '/newproduct',
        name: 'new-product',
        view: 'AddNewProduct'
    },
    {
        path: '/products',
        name: 'Products',
        view: 'Products'
    },
    {
        path: '/products/:id',
        name: 'single-product',
        view: 'Product'
    },
    {
        path: '/blogs',
        name: 'Blog',
        view: 'Blog'
    },
    {
        path: '/blogs/:slug',
        name: 'single-blog',
        view: 'Blog'
    },
    {
        path: '/signup',
        name: 'SignUp',
        view: 'SignUp'
    },
    {
        path: '/login',
        name: 'LogIn',
        view: 'Login'
    },
    {
        path: '/admin',
        name: 'Admin',
        view: 'Admin'
    }
]