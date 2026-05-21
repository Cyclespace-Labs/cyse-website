// app/cron/route.ts (or a separate worker)
import { runPipeline } from '@/scripts/runPipeline';
import cron from 'node-cron';
cron.schedule('0 8 * * *', () => runPipeline()); // every day at 8 AM