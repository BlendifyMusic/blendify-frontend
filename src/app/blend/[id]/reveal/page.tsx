'use client';

import { useEffect, useState, use } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { RevealExperience } from '@/components/reveal/RevealExperience';

export default function RevealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [blend, setBlend] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/blend/${id}`);
    }
  }, [user, authLoading, router, id]);

  useEffect(() => {
    if (!user) return;
    api.getBlend(id).then(setBlend);
  }, [id, user]);

  if (authLoading || !blend?.result) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
      </main>
    );
  }

  return <RevealExperience blend={blend} blendId={id} />;
}
