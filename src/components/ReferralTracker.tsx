'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const REFERRAL_KEY = 'pl_referral';

export function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    
    if (ref) {
      // Store referral with 30-day expiry
      const data = {
        ref,
        timestamp: Date.now(),
        page: window.location.pathname,
      };
      localStorage.setItem(REFERRAL_KEY, JSON.stringify(data));
      
      // Log visit (fire and forget)
      fetch('/api/track-referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref, event: 'visit' }),
      }).catch(() => {});
    }
  }, [searchParams]);

  return null;
}
