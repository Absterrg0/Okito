




export interface ProviderConfig {
    id: string;
    name: string;
    reqEnvVars: string[]
  }
  



export const AuthProviders: ProviderConfig[] = [
    {
        id:'google',
        name:'Google',
        reqEnvVars:['GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET']
    },
    {
        id:'github',
        name:'Github',
        reqEnvVars:['GITHUB_CLIENT_ID','GITHUB_CLIENT_SECRET']
    }
]