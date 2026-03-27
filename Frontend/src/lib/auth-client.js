import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: import.meta.env.VITE_BASEURL,
    fetchOptions :{Credential :'include'} // because we have created our backend useing the express
})
export const { signIn, signUp, useSession } = authClient;