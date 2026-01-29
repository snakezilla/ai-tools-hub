import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { ref, event } = await request.json();
    if (!ref || !event) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }
    console.log(`[Referral] ${event} from ref=${ref}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
