import { SignIn } from "@clerk/nextjs";
 


export const metadata={
  title:"SignIn",
  description:"SignIn to contentHub to unlock great advantages"
}
export default function Page() {
  return <SignIn />;
}