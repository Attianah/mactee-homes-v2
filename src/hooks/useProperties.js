import { useEffect, useState } from "react";
import { listProperties } from "@/lib/server-fns";

export function useProperties({ tab, search, initialProperties = [] }) {
  const filtersActive = Boolean(
    tab || search?.location || search?.property_type || search?.budget
  );
  const [properties, setProperties] = useState(initialProperties);
  const [isLoading, setIsLoading] = useState(filtersActive);

  useEffect(() => {
    if (!filtersActive) {
      setProperties(initialProperties);
      setIsLoading(false);
      return;
    }

    let alive = true;
    setIsLoading(true);

    listProperties({
      data: {
        listing_type: tab || undefined,
        area: search?.location || undefined,
        property_type: search?.property_type || undefined,
        budget: search?.budget || undefined,
      },
    })
      .then((items) => {
        if (alive) setProperties(items || []);
      })
      .catch(() => {
        if (alive) setProperties([]);
      })
      .finally(() => {
        if (alive) setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [filtersActive, tab, search?.location, search?.property_type, search?.budget, initialProperties]);

  return { properties, isLoading };
}