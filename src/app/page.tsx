'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from './components/UI/Button';
import Card from './components/UI/Card';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) return;
    if (session.user?.roles?.includes('Admin')) {
      router.replace('/admin');
    } else {
      router.replace('/dashboard');
    }
  }, [status, session, router]);
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 sm:w-full h-screen px-6">
      <Card title=" Hoşgeldiniz Buradan Uygulamayı Kullanmaya Başlayabilirsiniz.">
        <Button onClick={() => signIn('auth0')}>Başla</Button>
      </Card>
    </div>
  );
}
