import { HiOutlineHome } from 'react-icons/hi'
import {
    AiOutlineUser,
    BiVideo,
    MdOutlineCampaign,
    MdOutlinePodcasts,
} from 'react-icons/all'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    campaign: <MdOutlineCampaign />,
    publisher: <MdOutlinePodcasts />,
    video: <BiVideo />,
    users: <AiOutlineUser />,
}

export default navigationIcon
