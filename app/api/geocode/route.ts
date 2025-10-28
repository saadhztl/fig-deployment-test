import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get('place_id') || searchParams.get('address');

  if (!placeId) {
    return NextResponse.json({ results: [] });
  }

  // Use place_id if available, otherwise use address string
  const url = placeId.startsWith('Ch') // place_id usually starts with "Ch"
    ? `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_KEY}`
    : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      placeId
    )}&key=${process.env.GOOGLE_MAPS_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
