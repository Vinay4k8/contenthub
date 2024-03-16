import { SignUp } from "@clerk/nextjs";
 

export const metadata={
  title:"SignUp",
  description:"Signup to contentHub to unlock great advantages"
}

export default function Page() {
  return <SignUp />;
}