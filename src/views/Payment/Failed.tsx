import { MdClose } from 'react-icons/all'
import { AdaptableCard } from '@/components/shared'

export default function Failed() {
    return (
        <AdaptableCard
            className={'mt-5 flex items-center justify-center w-full'}
            bodyClass="w-full"
        >
            <MdClose className={'text-rose-500 text-[10rem] mx-auto'} />
            <h3 className={'w-full text-center'}>پرداخت ناموفق</h3>
        </AdaptableCard>
    )
}
