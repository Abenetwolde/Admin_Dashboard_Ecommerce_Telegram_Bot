
import Dashboard from './Page/Dashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import NewCategory from './Page/NewCategory';
import FastfoodIcon from '@mui/icons-material/Fastfood';
// Add other necessary icons from '@mui/icons-material' as needed

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <DashboardIcon />,
    component: Dashboard,
    layout: '/admin',
    appearInSidebar: true,
  },
  {
    path: '/category',
    name: 'Categorys',
    icon: <CategoryIcon />,
    component: NewCategory,
    layout: '/admin',
    appearInSidebar: true,
  },
  {
    path: '/product',
    name: 'Food',
    icon: <FastfoodIcon />,
    component: NewCategory,
    layout: '/admin',
    appearInSidebar: true,
  },
  // Add other routes with corresponding icons
];

export default routes;

// var routes = [
//   {
//     path: '/dashboard',
//     name: 'Dashboard',
//     icon: 'ni ni-tv-2 text-orange',
//     component: Dashboard,
//     layout: '/admin',
//     appearInSidebar: true
//   },
//   {
//     path: '/test',
//     name: 'Test',
//     icon: 'ni ni-tv-2 text-orange',
//     component: Test,
//     layout: '/admin',
//     appearInSidebar: true
//   },
// //   {
// //     path: '/category',
// //     name: 'Category',
// //     icon: 'ni ni-chart-pie-35 text-orange',
// //     component: Category,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/food',
// //     name: 'Food',
// //     icon: 'ni ni-tie-bow text-orange',
// //     component: Food,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/orders',
// //     name: 'Orders',
// //     icon: 'ni ni-delivery-fast text-orange',
// //     component: Orders,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/users',
// //     name: 'Users',
// //     icon: 'ni ni-single-02 text-orange',
// //     component: Users,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/ratings',
// //     name: 'Ratings',
// //     icon: 'fas fa-star text-orange',
// //     component: Ratings,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/riders',
// //     name: 'Riders',
// //     icon: 'ni ni-bus-front-12 text-orange',
// //     component: Riders,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/configuration',
// //     name: 'Configuration',
// //     icon: 'ni ni-settings text-orange',
// //     component: Configuration,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/option',
// //     name: 'Option',
// //     icon: 'ni ni-palette text-orange',
// //     component: Options,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/addons',
// //     name: 'Addons',
// //     icon: 'ni ni-collection text-orange',
// //     component: Addons,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/coupons',
// //     name: 'Coupons',
// //     icon: 'ni ni-single-copy-04 text-orange',
// //     component: Coupons,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/notifications',
// //     name: 'Notifications',
// //     icon: 'ni ni-bell-55 text-orange',
// //     component: Notifications,
// //     layout: '/admin',
// //     appearInSidebar: true
// //   },
// //   {
// //     path: '/login',
// //     name: 'Login',
// //     icon: 'ni ni-key-25 text-info',
// //     component: Login,
// //     layout: '/auth',
// //     appearInSidebar: false
// //   },
// //   {
// //     path: '/reset',
// //     name: 'ResetPassword',
// //     icon: 'ni ni-key-25 text-info',
// //     component: ResetPassword,
// //     layout: '/auth',
// //     appearInSidebar: false
// //   }
// ]
// export default routes
