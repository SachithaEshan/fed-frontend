import { SignIn } from "@clerk/clerk-react";

export default function SignUpPage() {
 
  return(
  <main className="flex items-center justify-center min-h-screen px-4">
    <SignIn/>
  </main>
  )
}