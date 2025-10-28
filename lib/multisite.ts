// No need to use multisite related methods in branch approach

// // Multisite functionality for Contentstack
// import {
//   QueryOperation,
//   TaxonomyQueryOperation,
// } from "@contentstack/delivery-sdk";
// import { stack } from "./contentstack";
// import { GetEntries, GetEntryByUid } from "./types";

// // Helper function to get the current site name from environment
// export function getSiteName(): string | undefined {
//   return process.env.NEXT_PUBLIC_SITE_NAME;
// }

// // Helper function to apply site filtering to a query
// export function applySiteFilter(query: any, siteName?: string): any {
//   const currentSiteName = siteName || getSiteName();

//   if (currentSiteName) {
//     // Apply site filtering using taxonomy
//     query.where(
//       "taxonomies.sites",
//       TaxonomyQueryOperation.EQ_BELOW,
//       currentSiteName
//     );
//   }

//   return query;
// }

// // Function to get entries by specific site
// export const getEntriesBySite = ({
//   contentTypeUid,
//   siteName,
//   referencesToInclude = "",
// }: {
//   contentTypeUid: string;
//   siteName?: string;
//   referencesToInclude?: string | Array<string>;
// }) => {
//   if (!contentTypeUid) return;

//   return new Promise((resolve, reject) => {
//     let entryQuery = stack.contentType(contentTypeUid).entry();

//     // Include references if specified
//     if (referencesToInclude) {
//       entryQuery.includeReference(referencesToInclude);
//     }

//     let query = entryQuery.query();

//     // Apply site filtering
//     // query = applySiteFilter(query, siteName);

//     query.find().then(
//       (entries) => resolve(entries),
//       (err) => reject(err)
//     );
//   });
// };

// // Function to get single entry with multisite validation
// export const getEntryBySite = ({
//   contentTypeUid,
//   entryUid,
//   referencesToInclude = "",
//   siteName,
// }: GetEntryByUid) => {
//   if (!entryUid || !contentTypeUid) return;

//   return new Promise((resolve, reject) => {
//     let entryQuery = stack.contentType(contentTypeUid).entry(entryUid);

//     // Include references if specified
//     if (referencesToInclude) {
//       entryQuery.includeReference(referencesToInclude);
//     }

//     entryQuery.fetch().then(
//       (entry: any) => {
//         // For single entries, we'll check if the entry belongs to the current site
//         // This is a post-fetch filter since we can't apply query filters to single entry fetch
//         const currentSiteName = siteName || getSiteName();

//         const belongsToSite = entryBelongsToSite(entry, currentSiteName);

//         if (!belongsToSite) {
//           reject(
//             new Error(
//               `Entry ${entryUid} does not belong to site ${currentSiteName}`
//             )
//           );
//           return;
//         }

//         resolve(entry);
//       },
//       (err) => {
//         console.error(
//           `Error while fetching entry for ${entryUid} in ${contentTypeUid}`
//         );
//         reject(err);
//       }
//     );
//   });
// };

// // Function to get all sites
// export const getSites = () => {
//   return getTaxonomyByUid("sites");
// };

// // Function to get specific taxonomy by UID
// export const getTaxonomyByUid = (taxonomyUid: string) => {
//   return new Promise((resolve, reject) => {
//     stack
//       .contentType("taxonomy")
//       .entry()
//       .query()
//       .where("uid", QueryOperation.EQUALS, taxonomyUid)
//       .find()
//       .then(
//         (taxonomy: any) => resolve(taxonomy),
//         (err: any) => {
//           console.error(
//             `Error while fetching taxonomy with UID: ${taxonomyUid}`
//           );
//           reject(err);
//         }
//       );
//   });
// };

// // Utility function to check if an entry belongs to a specific site
// export const entryBelongsToSite = (entry: any, siteName?: string): boolean => {
//   const currentSiteName = siteName || getSiteName();

//   if (!currentSiteName || !entry.taxonomies?.sites) {
//     return true; // If no site filtering is configured, allow all entries
//   }

//   const siteTaxonomies = Array.isArray(entry.taxonomies.sites)
//     ? entry.taxonomies.sites
//     : [entry.taxonomies.sites];

//   return siteTaxonomies.some(
//     (site: any) => site.uid === currentSiteName || site.name === currentSiteName
//   );
// };
