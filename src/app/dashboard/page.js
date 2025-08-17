import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!session) {
    return (
      <div>
        <h1>Erişim Reddedildi</h1>
        <a href="/api/auth/signin">Giriş Yap</a>
      </div>
    );
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p>Hoş geldin, {user.name}!</p>
      {user && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={user.picture}
            alt="Profile"
            style={{ borderRadius: '50%', width: '80px', height: '80px' }}
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <h3>{user.status}</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
