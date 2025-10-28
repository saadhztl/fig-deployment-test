// helpers/SvgIcon/iconMap.ts
import dynamic from 'next/dynamic';

export const iconMap = {
  hamburger: dynamic(() => import('./icons/icon--hamburger')),
  'arrow-up': dynamic(() => import('./icons/icon--arrow-up')),
  'arrow-down': dynamic(() => import('./icons/icon--arrow-down')),
  'close-button': dynamic(() => import('./icons/icon--close-button')),
  'graph-angle-lottie': dynamic(() => import('./icons/icon--graph-angle-lottie')),
  'graph-velocity-lottie': dynamic(() => import('./icons/icon--graph-velocity-lottie')),
  information: dynamic(() => import('./icons/icon--information')),
  instagram: dynamic(() => import('./icons/icon--instagram')),
  twitter: dynamic(() => import('./icons/icon--twitter')),
  youtube: dynamic(() => import('./icons/icon--youtube')),
  email: dynamic(() => import('./icons/icon--email')),
  call: dynamic(() => import('./icons/icon--call')),
  location: dynamic(() => import('./icons/icon--location')),
  minus: dynamic(() => import('./icons/icon--minus')),
  parking: dynamic(() => import('./icons/icon--parking')),
  plans: dynamic(() => import('./icons/icon--plans')),
  plus: dynamic(() => import('./icons/icon--plus')),
  'arrow-right': dynamic(() => import('./icons/icon--arrow-right')),
  'golf-stick': dynamic(() => import('./icons/icon--golf-stick')),
  lesson: dynamic(() => import('./icons/icon--lesson')),
  party: dynamic(() => import('./icons/icon--party')),
  cross: dynamic(() => import('./icons/icon--cross')),
  'loading-spinner': dynamic(() => import('./icons/icon--loading-spinner')),
  'bowling-pins': dynamic(() => import('./icons/icon--bowling-pins')),
};
