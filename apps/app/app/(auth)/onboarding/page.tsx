import { userHasProjects } from "@/app/actions/project";
import { redirect } from "next/navigation";
import OnboardingPage from "@/components/onboarding-client-component";




export default async function Onboarding(){
  
  try{

    const projects = await userHasProjects();
    if(projects){
      redirect('/dashboard/home')
    }
  }
  catch{
    redirect('/signin')
  }

  return <OnboardingPage></OnboardingPage>


  
}