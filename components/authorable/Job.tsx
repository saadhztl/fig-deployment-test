import { JobType } from '@/lib/types';
import { JobDetail } from '@/components/ui/job/JobDetail';
interface JobDetailProps {
  jobId: number;
}

const API_URL =
  'https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/85ec0b7f-7ce3-4bb6-9b90-fc31026871bb';

export const Job = async ({ jobId }: JobDetailProps) => {
  const res = await fetch(API_URL);

  const currentJob: JobType =
    (await res.json()).jobs.find((job: JobType) => job.jobId === Number(jobId)) ?? undefined;

  return <JobDetail currentJob={currentJob} />;
};
