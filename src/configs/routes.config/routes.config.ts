import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: `${APP_PREFIX_PATH}`,
        component: lazy(() => import('@/views/Dashboard')),
        authority: [],
    },
    {
        key: 'CreateCampaign',
        path: `${APP_PREFIX_PATH}/campaigns/create`,
        component: lazy(() => import('@/views/Campaigns/CampaignCreate')),
        authority: [],
    },
    {
        key: 'ViewCampaign',
        path: `${APP_PREFIX_PATH}/campaigns/:id`,
        component: lazy(() => import('@/views/Campaigns/CampaignView')),
        authority: [],
    },
    {
        key: 'EditCampaign',
        path: `${APP_PREFIX_PATH}/campaigns/:id/edit`,
        component: lazy(() => import('@/views/Campaigns/CampaignEdit')),
        authority: [],
    },
    {
        key: 'CampaignsList',
        path: `${APP_PREFIX_PATH}/campaigns`,
        component: lazy(() => import('@/views/Campaigns')),
        authority: [],
    },
    {
        key: 'CampaignsListExpired',
        path: `${APP_PREFIX_PATH}/campaigns/:expired`,
        component: lazy(() => import('@/views/Campaigns')),
        authority: [],
    },
    {
        key: 'PublishersList',
        path: `${APP_PREFIX_PATH}/publishers`,
        component: lazy(() => import('@/views/Publishers/Publishers')),
        authority: ['admin'],
    },
    {
        key: 'CreatePublisher',
        path: `${APP_PREFIX_PATH}/publishers/create`,
        component: lazy(() => import('@/views/Publishers/PublisherCreate')),
        authority: ['admin'],
    },
    {
        key: 'EditPublisher',
        path: `${APP_PREFIX_PATH}/publishers/:id/edit`,
        component: lazy(() => import('@/views/Publishers/PublisherEdit')),
        authority: ['admin'],
    },
    {
        key: 'VideosList',
        path: `${APP_PREFIX_PATH}/videos`,
        component: lazy(() => import('@/views/Videos/Videos')),
        authority: [],
    },
    {
        key: 'CreateVideo',
        path: `${APP_PREFIX_PATH}/videos/create`,
        component: lazy(() => import('@/views/Videos/ContentCreate')),
        authority: [],
    },
    {
        key: 'UsersPage',
        path: `${APP_PREFIX_PATH}/users`,
        component: lazy(() => import('@/views/Users/Users')),
        authority: ['admin'],
    },
    {
        key: 'NewUserPage',
        path: `${APP_PREFIX_PATH}/users/create`,
        component: lazy(() => import('@/views/Users/UserCreate')),
        authority: ['admin'],
    },
    {
        key: 'EditUserPage',
        path: `${APP_PREFIX_PATH}/users/:id`,
        component: lazy(() => import('@/views/Users/UserEdit')),
        authority: ['admin'],
    },
    {
        key: 'ProfilePage',
        path: `${APP_PREFIX_PATH}/profile`,
        component: lazy(() => import('@/views/Profile/')),
        authority: [],
    },
    {
        key: 'InvoicesPage',
        path: `${APP_PREFIX_PATH}/invoices`,
        component: lazy(() => import('@/views/Wallet/')),
        authority: [],
    },
    {
        key: 'InvoicePreviewPage',
        path: `${APP_PREFIX_PATH}/invoices/preview/:id`,
        component: lazy(() => import('@/views/Wallet/InvoicePreview')),
        authority: [],
    },
    {
        key: 'SuccessfulPaymentPage',
        path: `${APP_PREFIX_PATH}/payment/successful/:slug`,
        component: lazy(() => import('@/views/Payment/Successful')),
        authority: [],
    },
    {
        key: 'FailedPaymentPage',
        path: `${APP_PREFIX_PATH}/payment/failed`,
        component: lazy(() => import('@/views/Payment/Failed')),
        authority: [],
    },
    {
        key: 'WithdrawRequestsPage',
        path: `${APP_PREFIX_PATH}/withdraws`,
        component: lazy(
            () => import('@/views/WithdrawRequests/WithdrawRequests')
        ),
        authority: ['admin'],
    },
]
