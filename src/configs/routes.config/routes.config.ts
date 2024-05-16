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
        key: 'EditCampaign',
        path: `${APP_PREFIX_PATH}/campaigns/:id/edit`,
        component: lazy(() => import('@/views/Campaigns/CampaignEdit')),
        authority: [],
    },
    {
        key: 'PublishersList',
        path: `${APP_PREFIX_PATH}/publishers`,
        component: lazy(() => import('@/views/Publishers')),
        authority: [],
    },
]
