-- Mactee Homes — the four current listings.
-- Run after db/schema.sql. Safe to re-run: it clears and re-inserts the sample rows.

delete from properties;

insert into properties
  (id, title, location, area, property_type, listing_type, price, beds, baths, sqm, badge, featured, sort_order, amenities, images)
values
  (
    'a1000000-0000-4000-8000-000000000001',
    '4-Bedroom Detached Executive Home',
    'Spintex Road, Accra',
    'Spintex',
    'Detached House',
    'For Sale',
    280000, 4, 4.5, 380, 'Featured', true, 1,
    '["24/7 Gated Security","Fitted Kitchen","Solar Backup","Private Garden","Parking for 4 Cars","Borehole Water"]'::jsonb,
    '["https://media.base44.com/images/public/6afa19a081aacf8e0203b792/b7ae0cbab_generated_03e62ca5.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/d0ff5a94e_generated_5fa8dd72.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/20349eaf7_generated_cea6e5fe.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/d55d6c1e6_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/2ca4384da_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/8105983fb_generated_image.png"]'::jsonb
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    '3-Bedroom Modern Townhouse',
    'East Legon, Accra',
    'East Legon',
    'Townhouse',
    'For Sale',
    320000, 3, 3.5, 240, 'New Listing', false, 2,
    '["Shared Swimming Pool","Private Courtyard","Air Conditioning","Fitted Wardrobes","Gated Community","Visitor Parking"]'::jsonb,
    '["https://media.base44.com/images/public/6afa19a081aacf8e0203b792/83141ec35_generated_d3d8702e.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/05a1659ac_generated_7cdf247f.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/468f8d42a_generated_f748750a.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/b208ff892_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/061df2497_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/83bd60d40_generated_image.png"]'::jsonb
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    '2-Bedroom Luxury Serviced Apartment',
    'Cantonments, Accra',
    'Cantonments',
    'Apartment',
    'For Rent',
    2200, 2, 2, 118, 'For Rent', false, 3,
    '["Concierge Service","Residents'' Gym","Private Terrace","Backup Power","Weekly Housekeeping","Secure Parking"]'::jsonb,
    '["https://media.base44.com/images/public/6afa19a081aacf8e0203b792/e3105bd70_generated_99bf274d.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/e7363e18e_generated_49eab80c.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/db32378fd_generated_8e24c6ab.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/901798e9f_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/869e32403_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/e56e8d0ef_generated_image.png"]'::jsonb
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    '5-Bedroom Contemporary Villa with Pool',
    'Airport Hills, Accra',
    'Airport Residential',
    'Detached House',
    'For Sale',
    650000, 5, 6, 620, 'Luxury', true, 4,
    '["Private Swimming Pool","Master Suite with Terrace","Four-Car Garage","Staff Quarters","Smart Home System","Landscaped Garden"]'::jsonb,
    '["https://media.base44.com/images/public/6afa19a081aacf8e0203b792/041628ac0_generated_ecb5d45d.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/a4df8f335_generated_b35bde61.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/1ce37a6ce_generated_be961e31.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/116dc7165_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/d7b37a2f1_generated_image.png","https://media.base44.com/images/public/6afa19a081aacf8e0203b792/ee2d2ea8c_generated_image.png"]'::jsonb
  );