// app/api/news-automation/route.ts
import { NextResponse } from 'next/server';
import { runPipeline } from '@/scripts/runPipeline'; // adapt import

export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await runPipeline();
  return NextResponse.json({ success: true });
}