import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>Erişim Reddedildi</h1>
        <a href="/api/auth/signin">Giriş Yap</a>
      </div>
    );
  }

  return <h1>Hoş geldin {session.user.name}</h1>;
}
