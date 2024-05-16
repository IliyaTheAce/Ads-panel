import type { ThemeConfiguratorProps } from '@/components/template/ThemeConfigurator'
import ModeSwitcher from '@/components/template/ThemeConfigurator/ModeSwitcher'
import NavModeSwitcher from '@/components/template/ThemeConfigurator/NavModeSwitcher'

export type SidePanelContentProps = ThemeConfiguratorProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SidePanelContent = (props: SidePanelContentProps) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-y-10 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h6>حالت تاریک</h6>
                    </div>
                    <ModeSwitcher />
                </div>
                <div>
                    <h6 className="mb-3">حالت پنجره</h6>
                    <NavModeSwitcher />
                </div>
            </div>
        </div>
    )
}

export default SidePanelContent
