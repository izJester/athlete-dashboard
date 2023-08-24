'use client'

import MainLayout from '@/layouts/mainLayout';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Compass } from 'react-feather';
import { db } from '../../../firebase.config';
import { Input } from '@/components/ui/input';

const Scan = () => {
    const [code , setCode] = useState<string>();
    const router = useRouter();

    const searchAthlete = async (toSearch: any) => {
        try {
            const q = query(collection(db, "atletes") , where("carnetId", "==" , toSearch));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                router.push(`/players/${doc.id}`)
            });
            
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        if (code) {
            searchAthlete(code)
        }
    }, [code])
    
    return ( <MainLayout>
        <div className='flex justify-center items-center mt-24'>
            <div className='flex flex-col items-center space-y-4 '>
                <Compass size={130} className='animate-spin text-gray-800 stroke-1'></Compass>
                <span className='lg:text-2xl text-md text-gray-700 uppercase font-bold'> Waiting for bracelet scan... </span>
                <Input className='border-transparent focus:bor text-white' autoFocus onChange={(e) => setCode(e.target.value)}></Input>
            </div>
        </div>
    </MainLayout> );
}
 
export default Scan;