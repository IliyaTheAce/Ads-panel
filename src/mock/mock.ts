import { createServer, Model } from 'miragejs'
import appConfig from '@/configs/app.config'

import { signInUserData } from './data/authData'
import {  StatisticsData } from "./data/StatisticsData";

import { authFakeApi } from './fakeApi'
import dashboardFakeApi from '@/mock/fakeApi/dashboardFakeApi'
import { ViewReportData } from "@/mock/data/ViewReportData";

const { apiPrefix } = appConfig

export function mockServer({ environment = 'test' }) {
    return createServer({
        models: {
            StatisticsData: Model,
            ViewReportData: Model,
        },
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                StatisticsData,
                ViewReportData
            })
        },
        routes() {
            this.urlPrefix = 'https://famadsapi.fam.ir'
            this.namespace = ''
            // this.passthrough((request) => {
            //     const isExternal = request.url.startsWith('http')
            //     return isExternal
            // })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            dashboardFakeApi(this, apiPrefix)
        },
    })
}
