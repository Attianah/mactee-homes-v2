import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BUDGET_RANGES } from "@/lib/siteOptions";

const propertyFilters = z.object({
  listing_type: z.string().max(20).optional(),
  area: z.string().max(40).optional(),
  property_type: z.string().max(40).optional(),
  budget: z.string().max(20).optional(),
});

export const getProperty = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().min(1).max(64) }))
  .handler(async ({ data, context }) => {
    try {
      return await context.getBase44().entities.Property.get(data.id);
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  });

export const listProperties = createServerFn({ method: "GET" })
  .validator(propertyFilters)
  .handler(async ({ data, context }) => {
    const query = {};

    if (data.listing_type) query.listing_type = data.listing_type;
    if (data.area) query.area = data.area;
    if (data.property_type) query.property_type = data.property_type;

    const range = BUDGET_RANGES.find((item) => item.value === data.budget);
    if (range) {
      if (range.listing) query.listing_type = range.listing;
      if (range.min != null || range.max != null) {
        query.price = {};
        if (range.min != null) query.price.$gte = range.min;
        if (range.max != null) query.price.$lte = range.max;
      }
    }

    const result = await context
      .getBase44()
      .entities.Property.filter(query, { sort: "-created_date", limit: 24 });

    return result?.items ?? [];
  });

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      full_name: z.string().trim().min(2).max(120),
      phone: z.string().trim().min(6).max(40),
      preferred_date: z.string().max(40).optional().or(z.literal("")),
      service_interest: z.enum([
        "Buying a Home",
        "Renting",
        "Interior Design",
        "Selling My Property",
        "Property Viewing",
      ]),
      property_title: z.string().max(160).optional(),
      message: z.string().max(1000).optional(),
    })
  )
  .handler(async ({ data, context }) => {
    const created = await context.getBase44().entities.Enquiry.create({
      full_name: data.full_name,
      phone: data.phone,
      preferred_date: data.preferred_date || undefined,
      service_interest: data.service_interest,
      property_title: data.property_title || undefined,
      message: data.message || undefined,
    });

    return { id: created.id };
  });