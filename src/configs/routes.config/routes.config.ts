import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: `${APP_PREFIX_PATH}`,
        component: lazy(() => import('@/views/Dashboard')),
        authority: [],
    },
    {
        key: 'CampaignsList',
        path: `${APP_PREFIX_PATH}/campaigns`,
        component: lazy(() => import('@/views/Campaigns')),
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
        key: 'PublishersList',
        path: `${APP_PREFIX_PATH}/publishers`,
        component: lazy(() => import('@/views/Publishers/Publishers')),
        authority: [],
    },
    {
        key: 'CreatePublisher',
        path: `${APP_PREFIX_PATH}/publishers/create`,
        component: lazy(() => import('@/views/Publishers/PublisherCreate')),
        authority: [],
    },
    {
        key: 'EditPublisher',
        path: `${APP_PREFIX_PATH}/publishers/:id/edit`,
        component: lazy(() => import('@/views/Publishers/PublisherEdit')),
        authority: [],
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
        authority: [],
    },
    {
        key: 'NewUserPage',
        path: `${APP_PREFIX_PATH}/users/create`,
        component: lazy(() => import('@/views/Users/UserCreate')),
        authority: [],
    },
]
