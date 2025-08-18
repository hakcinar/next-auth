'use client';
import { signOut, useSession } from 'next-auth/react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  if (status === 'loading') {
    return <Card>Yükleniyor...</Card>;
  }
  return (
    <div className="w-full h-screen flex items-center justify-center px-6">
      <Card className="w-[600px] h-[300px] relative">
        <h1>Burası Bütün Kullanıcılar İçin Dashboard Sayfası</h1>
        <p>Hoş geldin, {user.name}!</p>
        <p className='mb-4'>Kişisel Bilgilerine Alt Taraftan Ulaşabilirsin</p>
        <img
          src={user.image}
          alt="Profile"
          className=" absolute top-2 right-2 w-[40px] h-[40px] rounded-2xl"
        />
        <h2>Kullanıcı Adın: {user.name}</h2>
        <p>Mail Adresin: {user.email}</p>

        <Button
          className=" absolute right-2 bottom-2"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Çıkış Yap
        </Button>
      </Card>
    </div>
  );
}
