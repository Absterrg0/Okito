import VerifyWalletPage from "@/components/verify-client-component";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";





export default async function VerifyWallet(){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session?.user.walletAddress){
        redirect('/onboarding')
    }

    return <VerifyWalletPage></VerifyWalletPage>
}