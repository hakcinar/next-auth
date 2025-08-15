'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { user, isLoading } = useUser();

  const data = useSession();
  console.log('NextAuth session:', data);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {user && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={user.picture}
            alt="Profile"
            style={{ borderRadius: '50%', width: '80px', height: '80px' }}
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <h3>{data.status}</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
