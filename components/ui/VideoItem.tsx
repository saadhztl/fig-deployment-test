import { IVideoItem } from '@/lib/generated';
import { RichText } from '../primitives/RichText';

export const VideoItem = ({ iframe_content, $ }: IVideoItem) => {
  return (
    <div className="w-full h-full">
      {iframe_content && (
        <RichText content={iframe_content} className="w-full h-full" $={$?.iframe_content} />
      )}
    </div>
  );
};
