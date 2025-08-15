"use client";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log('Session data:', session);
  return (
    <div>
      {session ? (
        <>
          <p>Hoşgeldin {session.user.name}</p>
          <button onClick={() => signOut()}>Çıkış Yap</button>
        </>
      ) : (
        <button onClick={() => signIn('auth0')}>Giriş Yap</button>
      )}
    </div>
  );
}
