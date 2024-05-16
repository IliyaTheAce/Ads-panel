import { HiOutlineHome } from 'react-icons/hi'
import { MdOutlineCampaign, MdOutlinePodcasts } from 'react-icons/all'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    campaign: <MdOutlineCampaign />,
    publisher: <MdOutlinePodcasts />,
}

export default navigationIcon
