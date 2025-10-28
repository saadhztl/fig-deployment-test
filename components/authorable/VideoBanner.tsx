import { LottieAnimation } from '@/helpers/LottieAnimation/LottieAnimation';
import { IComponents } from '@/lib/generated';
import { cn } from '@/utils/cn';

export const VideoBanner = ({
  video_file,
  main_logo_animation_json,
  bottom_logo_animation_json,
  video_player_options,
  fullscreen_banner,
  styling_options,
}: IComponents['video_banner']) => {
  return (
    <>
      {video_file && (
        <div
          style={
            !fullscreen_banner
              ? ({
                  backgroundColor: styling_options?.background_color?.dropdown,
                } as React.CSSProperties)
              : undefined
          }
          className={cn('mb-10 md:mb-20', fullscreen_banner ? 'p-0' : 'p-5 md:p-8 lg:p-14')}
        >
          <div className="w-full mx-auto relative flex items-center justify-center">
            <div
              className={cn(
                'overflow-hidden',
                fullscreen_banner ? 'rounded-none' : 'rounded-3xl md:rounded-[56px]',
                fullscreen_banner ? 'border-0' : 'border-[6px]',
                'flex-1'
              )}
              style={
                {
                  borderColor: styling_options?.border_color?.dropdown,
                } as React.CSSProperties
              }
            >
              <video
                src={video_file?.url}
                autoPlay={video_player_options?.autoplay_video}
                loop={video_player_options?.looped_video}
                controls={video_player_options?.video_controls}
                poster={video_player_options?.video_poster?.image?.url}
                preload={video_player_options?.video_preload || 'auto'}
                muted={video_player_options?.muted_video}
                playsInline
                className="w-full"
              ></video>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-96 lg:h-96 xl:w-[720px] xl:h-[720px]">
              <LottieAnimation src={main_logo_animation_json?.url} speed={1} />
            </div>
            <div className="absolute hidden md:block bottom-3 left-1/2 transform -translate-x-1/2 w-[45px] h-[45px] sm:w-[65px] sm:h-[65px] md:w-[90px] md:h-[90px] lg:w-[150px] lg:h-[150px]">
              <LottieAnimation src={bottom_logo_animation_json?.url} loop speed={0.6} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
