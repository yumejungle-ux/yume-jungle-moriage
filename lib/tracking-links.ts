export const TRACKING_CAMPAIGN = "yume_jungle";

export const trackingLinks = {
  "yt-profile": { source: "youtube", medium: "video", content: "yt_profile" },
  "yt-description": {
    source: "youtube",
    medium: "video",
    content: "yt_description",
  },
  "yt-pinned-comment": {
    source: "youtube",
    medium: "video",
    content: "yt_pinned_comment",
  },
  "line-message": { source: "line", medium: "social", content: "line_message" },
  "line-richmenu": {
    source: "line",
    medium: "social",
    content: "line_richmenu",
  },
  "line-profile": { source: "line", medium: "social", content: "line_profile" },
  "ig-profile": {
    source: "instagram",
    medium: "social",
    content: "ig_profile",
  },
  "ig-story": { source: "instagram", medium: "social", content: "ig_story" },
  "x-profile": { source: "x", medium: "social", content: "x_profile" },
  "x-post": { source: "x", medium: "social", content: "x_post" },
  "fb-profile": {
    source: "facebook",
    medium: "social",
    content: "fb_profile",
  },
  "fb-post": { source: "facebook", medium: "social", content: "fb_post" },
  "sales-email-body": {
    source: "sales",
    medium: "email",
    content: "sales_email_body",
  },
  "email-signature": {
    source: "email",
    medium: "email",
    content: "email_signature",
  },
  newsletter: {
    source: "newsletter",
    medium: "email",
    content: "newsletter",
  },
  "business-card": {
    source: "business_card",
    medium: "qr",
    content: "business_card",
  },
  flyer: { source: "flyer", medium: "qr", content: "flyer" },
  proposal: { source: "proposal", medium: "qr", content: "proposal" },
} as const;

export type TrackingSlug = keyof typeof trackingLinks;

export function isTrackingSlug(value: string): value is TrackingSlug {
  return value in trackingLinks;
}

export function createTrackedDestination(origin: string, slug: TrackingSlug) {
  const definition = trackingLinks[slug];
  const destination = new URL("/", origin);

  destination.search = new URLSearchParams({
    utm_source: definition.source,
    utm_medium: definition.medium,
    utm_campaign: TRACKING_CAMPAIGN,
    utm_content: definition.content,
  }).toString();

  return destination;
}
