'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const REFERRAL_KEY = 'pl_referral';

export function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');
    
    // Track if we have any tracking params OR it's a fresh visit
    const hasTracking = ref || utm_source || utm_medium || utm_campaign;
    const existingRef = localStorage.getItem(REFERRAL_KEY);
    
    if (hasTracking || !existingRef) {
      // Store referral with 30-day expiry
      const data = {
        ref: ref || 'direct',
        utm_source,
        utm_medium,
        utm_campaign,
        timestamp: Date.now(),
        page: window.location.pathname,
      };
      localStorage.setItem(REFERRAL_KEY, JSON.stringify(data));
      
      // Track visit (fire and forget)
      fetch('/api/track-referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ref: ref || 'direct',
          event: 'visit',
          utm_source,
          utm_medium,
          utm_campaign,
          page: window.location.pathname,
        }),
      }).catch(() => {});
    }
  }, [searchParams]);

  return null;
}
