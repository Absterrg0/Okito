export {}
import {useSearchParams} from 'react-router-dom'
import { useFetchSession } from '../hooks/useFetchSession'


export async function CheckoutPage(){
   
    const [params] = useSearchParams();
    const sessionId = params.get('sessionId');

    if (!sessionId){
        throw new Error("No session Id provided")
    }

    const {data,isLoading,error} = await useFetchSession(sessionId);

   
   return <div>

    </div>
}