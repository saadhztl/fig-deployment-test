import { IPromosComponents, IPromosTwoColCard } from '@/lib/generated';
import { getEntriesByUids } from '@/lib/contentstack';
import { PromosTwoColCard } from '../ui/cards/PromosTwoColCard';

export const PromoTwocolCards = async ({ reference }: IPromosComponents['promo_twocol_cards']) => {
  const sortPromos = (promos: IPromosTwoColCard[]) => {
    return promos.sort((a, b) => {
      if (a.highlight_this_promo_item !== b.highlight_this_promo_item) {
        return a.highlight_this_promo_item ? -1 : 1;
      }
      return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
    });
  };
  const contentTypeUid = reference?.[0]?._content_type_uid || '';
  const entryUIDs = reference?.map((item) => item.uid).filter(Boolean) as string[];
  const allPromos = await getEntriesByUids<IPromosTwoColCard>({
    contentTypeUid: contentTypeUid,
    entryUids: entryUIDs,
  });
  const sortedPromos = sortPromos(allPromos?.entries || []);
  return (
    <section className="flex flex-col items-center">
      {sortedPromos?.map((promo, index) => {
        return <PromosTwoColCard key={index} {...promo} />;
      })}
    </section>
  );
};
