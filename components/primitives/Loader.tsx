import { cn } from '@/utils/cn';
import Image from 'next/image';

export const Loader = () => {
  return (
    <div
      className={cn(
        'flex justify-center items-center w-full h-full',
        'text-white font-bold text-2xl',
        'my-5'
      )}
    >
      <Image
        src="https://fiveirongolf.com/wp-content/themes/hello-theme-child-master/img/loader.svg"
        alt="Loading"
        width={100}
        height={100}
        className="w-full h-full"
        quality={100}
      />
    </div>
  );
};
