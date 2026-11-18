function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[minmax(110px,26%)_1fr] items-center gap-4 border-b border-charcoal/15 py-[11px]">
      <span className="text-[13px] text-charcoal/60">{label}</span>
      <span className="min-w-0 text-[14px] text-charcoal">{value}</span>
    </div>
  );
}

export default function PropertySpecs({ property }) {
  const rows = [
    { label: "Location", value: property.location },
    { label: "Property type", value: property.property_type },
    { label: "Tenure", value: property.listing_type },
    { label: "Bedrooms", value: property.beds },
    { label: "Bathrooms", value: property.baths },
    { label: "Floor area", value: property.sqm ? `${property.sqm} sqm` : null },
  ].filter((row) => row.value !== null && row.value !== undefined && row.value !== "");

  return (
    <div className="mt-6 border-t border-charcoal/15">
      {rows.map((row) => (
        <Row key={row.label} label={row.label} value={row.value} />
      ))}
    </div>
  );
}