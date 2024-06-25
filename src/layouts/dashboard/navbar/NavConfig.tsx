// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// import Label from '../../../components/Label';
// import Label from '../../../Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Label from '../../../components/Label';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // // GENERAL
  // // ----------------------------------------------------------------------
  {
    subheader: 'analysis',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Order Dashboard', path: PATH_DASHBOARD.general.orderdashboard, icon: ICONS.ecommerce },
    ]
  },
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'category', path: PATH_DASHBOARD.general.category, icon: ICONS.ecommerce },
      { title: 'Foods', path: PATH_DASHBOARD.general.foods, icon: ICONS.ecommerce },
      { title: 'Orders', path: PATH_DASHBOARD.general.orders, icon: ICONS.ecommerce ,  info: (
                <Label variant="outlined" color="error">
                  +32
                </Label>
              ),},
      { title: 'Payments', path: PATH_DASHBOARD.general.payments, icon: ICONS.ecommerce },
      { title: 'Users', path: PATH_DASHBOARD.general.users, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics }, //todo uncommitted when ready
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // CATEGORY
  // ----------------------------------------------------------------------
  // {
  //   subheader: '',
    
  //   items: [
  //     // CATEGORY : Fruits
  //     {
  //       title: 'Fruits & Vegetables',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.ecommerce,
  //       // children: [
  //       //   { title: 'Dates (Khejur)', path: PATH_DASHBOARD.shop.datesKhejur },
  //       //   { title: 'Fresh Fruits', path: PATH_DASHBOARD.shop.freshFruit },
  //       // ],
  //     },

  //     // CATEGORY : Meat
  //     {
  //       title: 'Meat & Fish',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'Meat', path: PATH_DASHBOARD.shop.meat },
  //         { title: 'Frozen Fish', path: PATH_DASHBOARD.shop.frozenFish },
  //       ],
  //     },

  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         // { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         // { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         // { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         // { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         // { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         // { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
  //       ],
  //     },

  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         // { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
  //       ],
  //     },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {  //todo uncommitted when ready
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },
];

export default navConfig;
