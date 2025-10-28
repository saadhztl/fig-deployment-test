'use client';
import React, { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import ModalWrapper from '@/helpers/ModalWrapper';
import { FAIcons } from '@/helpers/FAIcons';
import { ICallToAction } from '@/lib/generated';
import { RichText } from '@/components/primitives/RichText';
import { StylingOptions } from '@/lib/types';

export type HeroBannerVideoModalProps = {
  video_call_to_action: {
    call_to_action?: ICallToAction;
    video_iframe_embed?: string;
  }[];
};

export const HeroBannerVideoModal = ({ video_call_to_action }: HeroBannerVideoModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex gap-5 w-fit">
      {video_call_to_action?.map((call_to_action, index) => (
        <React.Fragment key={index}>
          <Button
            href={call_to_action.call_to_action?.link?.href}
            className="border-2 border-white elementHover-transition hover:!bg-transparent flex gap-2.5 justify-center items-center"
            styling_options={call_to_action.call_to_action?.styling_options as StylingOptions}
            onClick={() => setOpen(true)}
          >
            {call_to_action.call_to_action?.link?.title}
            {call_to_action.call_to_action?.font_awesome_icon_code && (
              <FAIcons iconCode={call_to_action.call_to_action?.font_awesome_icon_code} />
            )}
          </Button>
          <ModalWrapper
            state={open}
            onClose={() => setOpen(false)}
            containerClasses="w-full lg:w-1/2 h-fit p-2.5 overflow-auto border bg-dark rounded-none"
            outSideClick={false}
          >
            <RichText content={call_to_action.video_iframe_embed} parseType="html" />
          </ModalWrapper>
        </React.Fragment>
      ))}
    </div>
  );
};
