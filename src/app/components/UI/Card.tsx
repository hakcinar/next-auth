'use client';
import React from 'react';

type CardProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  children,
  className = '',
}: CardProps) {
  return (
    <div
      className={` bg-white flex flex-col justify-center items-center shadow-md rounded-2xl p-6 transition-transform hover:scale-[1.02] ${className}`}
    >
      <h2 className="text-xl text-black font-semibold mb-4 text-center">
        {title}
      </h2>
      {children}
    </div>
  );
}
