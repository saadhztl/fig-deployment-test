import { IComponents } from '@/lib/generated';
import { JobType } from '@/lib/types';
import { Jobs } from '../ui/job/Jobs';

const API_URL =
  'https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/85ec0b7f-7ce3-4bb6-9b90-fc31026871bb';

export const JobList = async ({ list_title, jobs_per_page }: IComponents['job_list']) => {
  const res = await fetch(API_URL);

  const jobs: JobType[] = (await res.json()).jobs ?? [];

  return <Jobs jobs_per_page={jobs_per_page} jobs={jobs} list_title={list_title} />;
};
