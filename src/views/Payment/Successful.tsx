import { BiBadgeCheck } from 'react-icons/all'
import { AdaptableCard } from '@/components/shared'

export default function Successful() {
    return (
        <AdaptableCard className={'mt-5 flex items-center justify-center'}>
            <BiBadgeCheck className={'text-green-700 text-[10rem]'} />
            <h3>پرداخت موفق</h3>
        </AdaptableCard>
    )
}
