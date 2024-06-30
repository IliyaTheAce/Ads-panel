import { HiOutlineHome } from 'react-icons/hi'
import {
    AiOutlineUser,
    BiCoin,
    BiReceipt,
    BiVideo,
    FiUsers,
    MdOutlineCampaign,
    MdOutlinePodcasts,
} from 'react-icons/all'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    campaign: <MdOutlineCampaign />,
    publisher: <MdOutlinePodcasts />,
    video: <BiVideo />,
    users: <FiUsers />,
    profile: <AiOutlineUser />,
    invoices: <BiCoin />,
    withdraw: <BiReceipt />,
}

export default navigationIcon
