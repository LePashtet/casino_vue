import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../components/Pages/OurServices')
  },
  {
    path: '/site-owner',
    name: 'SiteOwner',
    component: () => import('../components/Pages/SiteOwner')
  },
  {
    path: '/site-list',
    name: 'SiteList',
    component: () => import('../components/Faucets/SiteList')
  },
  {
    path: '/site-list/:hash',
    name: 'SiteDetail',
    component: () => import('../components/Faucets/SiteDetail'),
    props: true,
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('../components/Pages/Stats')
  },
  {
    path: '/user/:hash',
    name: 'UserPage',
    component: () => import('../components/User/UserPage'),
    props: true,
  },
  {
    path: '/news',
    component: () => import('../components/News/NewsLayout'),
    children: [
      {
        path: '',
        name: 'News',
        component: () => import('../components/News/News'),
      },
      {
        path: ':page',
        name: 'NewsPage',
        props: true,
        component: () => import('../components/News/News'),
      },
      {
        path: 'open/:id',
        name: 'NewsOpen',
        props: true,
        component: () => import('../components/News/NewsOpen'),
      }
    ]
  },
  {
    path: '/exchange',
    name: 'Exchange',
    component: () => import('../components/Exchange/Exchange'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cabinet',
    component: () => import('../components/LayoutDefault'),
    props: { title: 'Dashboard' },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'LobbyMain',
        component: () => import('../components/Lobby/LobbyMain'),
      },

    ]
  },
  {
    path: '/cabinet/premium',
    component: () => import('../components/LayoutDefault'),
    props: { title: 'Premium' },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'PremiumMain',
        component: () => import('../components/Premium/PremiumMain'),
      },

    ]
  },
  {
    path: '/games',
    component: () => import('../components/Games/GamesLayout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'GameLobby',
        component: () => import('../components/Games/GamesLobby'),
        meta: { title: 'Games' },
      },
      {
        path: 'coinflip',
        name: 'GameCoinflip',
        component: () => import('../components/GameCoinflip/CoinflipLobby'),
        meta: { title: 'Coinflip!' },
      },
      {
        path: 'rock-paper-scissors',
        name: 'GameRps',
        component: () => import('../components/GameRps/RpsLobby'),
        meta: { title: 'Rock-Paper-Scissors!' },
      }
    ]
  },
  {
    path: '/cabinet/settings',
    component: () => import('../components/Settings/SettingsLayout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: { name: "SettingsMain" },
      },
      {
        path: 'main',
        name: 'SettingsMain',
        component: () => import('../components/Settings/Settings'),
      },
      {
        path: 'sessions',
        name: 'SettingsSessions',
        component: () => import('../components/Settings/SettingsSessions'),
      }
    ]
  },
  {
    path: '/cabinet/statistics',
    name: 'StatisticsIndex',
    component: () => import('../components/Statistics/StatisticsLayout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: { name: "StatisticsPayout" },
      },
      {
        path: 'payin',
        name: 'StatisticsPayin',
        component: () => import('../components/Statistics/StatisticsPayin'),
      },
      {
        path: 'payout',
        name: 'StatisticsPayout',
        component: () => import('../components/Statistics/StatisticsPayout'),
      },
      {
        path: 'premium',
        name: 'StatisticsPremium',
        component: () => import('../components/Statistics/StatisticsPremium'),
      },
      {
        path: 'paidads',
        name: 'StatisticsPaidAds',
        component: () => import('../components/Statistics/StatisticsPaidAds'),
      }
    ]
  },
  {
    path: '/cabinet/earning',
    component: () => import('../components/Earning/EarningLayout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: { name: 'EarningAds' }
      },
      {
        path: 'ads',
        component: () => import('../components/Earning/EarningAds'),
        children: [
          {
            path: '',
            redirect: { name: 'EarningAds' }
          },
          {
            path: 'manual',
            name: 'EarningAds',
            component: () => import('../components/Earning/EarningAdsManual'),
          },
          {
            path: 'manage',
            //name: 'ManageAds',
            component: () => import('../components/Earning/ManageAds/ManageLayout'),
            children: [
              {
                path: '',
                name: 'EarningAdsManageList',
                props: true,
                component: () => import('../components/Earning/ManageAds/AdsList'),
              },
              {
                path: 'campaigns',
                name: 'EarningAdsManageCampaigns',
                props: true,
                component: () => import('../components/Earning/ManageAds/Campaigns'),
              },
            ]
          },
          {
            path: 'manage/new',
            name: 'EarningAdsManageAdsNew',
            component: () => import('../components/Earning/ManageAds/AdsForm'),
          },
          {
            path: 'manage/:hash',
            name: 'EarningAdsManageAdsDetail',
            props: true,
            component: () => import('../components/Earning/ManageAds/AdsDetail'),
          },
          {
            path: 'manage/campaigns/new',
            name: 'EarningAdsManageCampaignsNew',
            component: () => import('../components/Earning/ManageAds/CampaignForm'),
          },
          {
            path: 'manage/campaigns/edit/:hash',
            name: 'EarningAdsManageCampaignsEdit',
            props: true,
            component: () => import('../components/Earning/ManageAds/CampaignForm'),
          },
          {
            path: 'faq',
            name: 'EarningAdsFaq',
            component: () => import('../components/Earning/EarningAdsFaq'),
          },
        ]
      },
      {
        path: 'offerwalls',
        name: 'EarningOfferwalls',
        component: () => import('../components/Statistics/StatisticsPayout'),
      },
      {
        path: 'faucets',
        name: 'EarningFaucets',
        component: () => import('../components/Statistics/StatisticsPremium'),
      }
    ]
  },
  {
    path: '/cabinet/sites',
    component: () => import('../components/LayoutDefault'),
    props: { title: 'Site owner' },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'SiteOwnerList',
        component: () => import('../components/SiteOwner/SiteOwnerList'),
      },
      {
        path: 'create',
        name: 'SiteOwnerCreate',
        component: () => import('../components/SiteOwner/SiteOwnerCreate'),
      },
      {
        path: 'new',
        name: 'SiteOwnerCreateForm',
        props: true,
        component: () => import('../components/SiteOwner/SiteOwnerCreateForm'),
      },
      {
        path: ':hash/edit',
        name: 'SiteOwnerEditForm',
        props: true,
        component: () => import('../components/SiteOwner/SiteOwnerCreateForm'),
      },
      {
        path: ':hash/detail',
        name: 'SiteOwnerDetail',
        props: true,
        component: () => import('../components/SiteOwner/SiteOwnerDetail'),
      },
      {
        path: ':hash/balance',
        name: 'SiteOwnerBalance',
        props: true,
        component: () => import('../components/SiteOwner/SiteOwnerBalance'),
      }
    ]
  },
  {
    path: '/cabinet/affiliate',
    component: () => import('../components/Affiliate/AffiliateLayout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: { name: 'AffiliateDashboard' }
      },
      {
        path: 'dashboard',
        name: 'AffiliateDashboard',
        props: true,
        component: () => import('../components/Affiliate/AffiliateDashboard'),
      },
      {
        path: 'balances',
        name: 'AffiliateBalances',
        component: () => import('../components/Affiliate/AffiliateBalances'),
      },
      {
        path: 'campaigns',
        name: 'AffiliateCampaigns',
        component: () => import('../components/Affiliate/AffiliateCampaigns'),
      },
      {
        path: 'banners',
        name: 'AffiliateBanners',
        props: true,
        component: () => import('../components/Affiliate/AffiliateBanners'),
      },
      {
        path: 'logs',
        name: 'AffiliateLogs',
        component: () => import('../components/Affiliate/AffiliateLogs'),
      },
      {
        path: 'users',
        name: 'AffiliateUsers',
        component: () => import('../components/Affiliate/AffiliateUsers'),
      },
      {
        path: 'hits',
        name: 'AffiliateHits',
        component: () => import('../components/Affiliate/AffiliateHits'),
      },
    ]
  },
  {
    path: '/help',
    component: () => import('../components/LayoutDefault'),
    props: { title: 'Help desk' },
    children: [
      {
        path: '',
        name: 'HelpList',
        component: () => import('../components/Help/HelpList'),
      },
      {
        path: 'ticket/:hash',
        name: 'HelpTicket',
        props: true,
        component: () => import('../components/Help/HelpTicket'),
      },
      {
        path: 'ticket/:email/:token',
        name: 'HelpTicketToken',
        props: true,
        component: () => import('../components/Help/HelpTicket'),
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
