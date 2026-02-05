import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'analytics-data.json');

interface VisitData {
  ref: string;
  event: string;
  timestamp: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page?: string;
  userAgent?: string;
}

async function loadData(): Promise<VisitData[]> {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function saveData(data: VisitData[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ref, event, utm_source, utm_medium, utm_campaign, page } = body;
    
    if (!event) {
      return NextResponse.json({ error: 'Missing event' }, { status: 400 });
    }

    const visit: VisitData = {
      ref: ref || 'direct',
      event,
      timestamp: new Date().toISOString(),
      utm_source,
      utm_medium,
      utm_campaign,
      page,
      userAgent: request.headers.get('user-agent') || undefined,
    };

    // Append to data file
    const data = await loadData();
    data.push(visit);
    await saveData(data);

    console.log(`[Analytics] ${event} | ref=${ref || 'direct'} | src=${utm_source || '-'}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics Error]', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Simple auth - check for secret param
  if (secret !== 'pl2026stats') {
    return NextResponse.json({ status: 'ok' });
  }

  try {
    const data = await loadData();
    
    // Aggregate stats
    const stats = {
      total_visits: data.length,
      by_ref: {} as Record<string, number>,
      by_source: {} as Record<string, number>,
      by_campaign: {} as Record<string, number>,
      last_24h: 0,
      recent: data.slice(-20).reverse(),
    };

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    for (const visit of data) {
      // Count by ref
      stats.by_ref[visit.ref] = (stats.by_ref[visit.ref] || 0) + 1;
      
      // Count by source
      if (visit.utm_source) {
        stats.by_source[visit.utm_source] = (stats.by_source[visit.utm_source] || 0) + 1;
      }
      
      // Count by campaign
      if (visit.utm_campaign) {
        stats.by_campaign[visit.utm_campaign] = (stats.by_campaign[visit.utm_campaign] || 0) + 1;
      }
      
      // Last 24h
      if (new Date(visit.timestamp).getTime() > now - day) {
        stats.last_24h++;
      }
    }

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}
