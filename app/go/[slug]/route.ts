import { NextResponse, type NextRequest } from "next/server";
import { createTrackedDestination, isTrackingSlug } from "@/lib/tracking-links";

export function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return params.then(({ slug }) => {
    if (!isTrackingSlug(slug)) {
      return NextResponse.redirect(new URL("/", request.url), 307);
    }

    return NextResponse.redirect(
      createTrackedDestination(new URL(request.url).origin, slug),
      307,
    );
  });
}
