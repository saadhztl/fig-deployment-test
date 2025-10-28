import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const LocationBookingBannerComponent = ({
  reference,
}: IComponents['location_booking_banner_component']) => {
  return <ReferencePlaceholder references={reference as Array<ISystemFields>} />;
};
