import { useSession, signIn, signOut } from "next-auth/react";
export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="absolute top-2 right-4 border-solid border-[1px] border-white p-3 rounded-xl text-white">
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="absolute top-2 right-4 border-solid border-[1px] border-white p-3 rounded-xl text-white">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
