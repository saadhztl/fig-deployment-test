'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { JobType } from '@/lib/types';
import { cn } from '@/utils/cn';
import { CareerCard } from '../cards/CareerCard';
import { SearchForm } from '../SearchForm';
import { Pagination } from '@/components/primitives/Pagination';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';
import { Container } from '@/components/primitives/Container';

export interface JobsProps {
  jobs: JobType[];
  list_title?: string;
  jobs_per_page?: number | null;
}

const extractCities = (jobData: JobType[]): string[] => {
  const toTitleCase = (str: string): string =>
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const cities = Array.from(
    new Map(
      jobData
        ?.map((job) => job.jobLocation?.city)
        .filter(Boolean)
        .map((city) => [city.toLowerCase(), toTitleCase(city)] as [string, string])
    ).values()
  ).sort();

  return cities;
};

const filterJobs = (
  jobs: JobType[],
  searchText: string,
  location: string,
  defaultLocation: string
): JobType[] => {
  if (!searchText && location === defaultLocation) {
    return jobs;
  }
  return jobs.filter((job) => {
    const matchesSearch =
      !searchText || job.title?.toLowerCase().includes(searchText.toLowerCase());
    const matchesLocation =
      location === defaultLocation ||
      job.jobLocation?.city?.toLowerCase() === location.toLowerCase();

    return matchesSearch && matchesLocation;
  });
};

export const Jobs = ({ jobs_per_page, jobs, list_title }: JobsProps) => {
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>(jobs);
  const [pageJobs, setPageJobs] = useState<JobType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const JOBS_PER_PAGE = jobs_per_page || 9;
  // Memoize cities extraction to avoid recalculation on re-renders
  const filterDropdown = useMemo(() => extractCities(jobs), [jobs]);
  const { globalLabels } = useGlobalLabels();

  useEffect(() => {
    setTotalPages(Math.ceil(jobs.length / JOBS_PER_PAGE));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const endIndex = startIndex + JOBS_PER_PAGE;
    setPageJobs(filteredJobs.slice(startIndex, endIndex));
  }, [currentPage, filteredJobs]);

  const searchCallback = useCallback(
    (text: string, location: string, defaultLocation: string) => {
      const filtered = filterJobs(jobs, text, location, defaultLocation);
      setFilteredJobs(filtered);
      setTotalPages(Math.ceil(filtered.length / JOBS_PER_PAGE));
      setCurrentPage(1);
    },
    [jobs]
  );

  if (!jobs || jobs.length === 0) return <>No jobs found</>;

  const renderContent = () => {
    if (!filteredJobs.length) {
      return (
        <div
          className={cn(
            'flex justify-center items-center w-full',
            'text-white font-bold text-2xl',
            'my-5'
          )}
        >
          {globalLabels.no_jobs_found_label}
        </div>
      );
    }

    return (
      <div
        className={cn(
          'max-w-large-desktop w-full mx-auto my-8',
          'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
          'text-white gap-6'
        )}
      >
        {pageJobs.map((job) => (
          <CareerCard key={job.jobId || `job-${job.title}`} {...job} labels={globalLabels} />
        ))}
      </div>
    );
  };

  return (
    <Container componentName="JobsList">
      {list_title && (
        <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold text-center my-5">
          {list_title}
        </h1>
      )}
      <SearchForm cities={filterDropdown} searchCallback={searchCallback} />
      {renderContent()}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
  );
};
