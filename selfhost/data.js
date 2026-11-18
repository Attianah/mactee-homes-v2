// Replaces src/lib/server-fns.js when the site runs outside Base44.
// Talks to Postgres through Supabase's REST endpoint using the public anon key.
import { BUDGET_RANGES } from "@/lib/siteOptions";

const BASE = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function rest(path, init = {}) {
  if (!BASE || !KEY) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env and rebuild."
    );
  }

  const response = await fetch(`${BASE.replace(/\/+$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Database request failed (${response.status}): ${detail}`);
  }

  return response.status === 204 ? null : response.json();
}

function normalize(row) {
  return {
    ...row,
    price: row.price == null ? row.price : Number(row.price),
    beds: row.beds == null ? row.beds : Number(row.beds),
    baths: row.baths == null ? row.baths : Number(row.baths),
    sqm: row.sqm == null ? row.sqm : Number(row.sqm),
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    images: Array.isArray(row.images) ? row.images : [],
  };
}

export async function listProperties({ data = {} } = {}) {
  // Built by hand so spaces encode as %20 rather than "+", which PostgREST would
  // read literally in values such as "For Sale".
  const params = ["select=*", "order=sort_order.asc", "limit=24"];
  const add = (key, value) => params.push(`${key}=${encodeURIComponent(value)}`);

  if (data.listing_type) add("listing_type", `eq.${data.listing_type}`);
  if (data.area) add("area", `eq.${data.area}`);
  if (data.property_type) add("property_type", `eq.${data.property_type}`);

  const range = BUDGET_RANGES.find((item) => item.value === data.budget);
  if (range) {
    if (range.listing) add("listing_type", `eq.${range.listing}`);
    if (range.min != null) add("price", `gte.${range.min}`);
    if (range.max != null) add("price", `lte.${range.max}`);
  }

  const rows = await rest(`properties?${params.join("&")}`);
  return (rows || []).map(normalize);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getProperty({ data }) {
  if (!UUID.test(data.id)) return null;
  const rows = await rest(`properties?select=*&id=eq.${data.id}&limit=1`);
  return rows && rows[0] ? normalize(rows[0]) : null;
}

export async function submitEnquiry({ data }) {
  const rows = await rest("enquiries", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      full_name: data.full_name,
      phone: data.phone,
      preferred_date: data.preferred_date || null,
      service_interest: data.service_interest,
      property_title: data.property_title || null,
      message: data.message || null,
    }),
  });

  return { id: rows?.[0]?.id ?? null };
}