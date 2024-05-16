export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'https://testfamadsapi.fam.ir/api/',
    authenticatedEntryPath: '/app',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'fa',
    enableMock: false,
}

export default appConfig
