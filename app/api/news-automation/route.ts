// app/api/news-automation/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Dynamically import to prevent side effects during build
  const { runPipeline } = await import('@/scripts/runPipeline');
  await runPipeline();

  return NextResponse.json({ success: true });
}