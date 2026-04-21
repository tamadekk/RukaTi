export const PRICE_RANGES = [
  "Negotiable",
  "Under €25/hr",
  "€25–€50/hr",
  "€50–€100/hr",
  "€100–€150/hr",
  "€150–€200/hr",
  "€200+/hr",
  "Fixed Price",
];

export const AVAILABILITY_DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const AVAILABILITY_OPTIONS = [
  { value: "on-call", label: "On Call" },
  { value: "business", label: "Business Days (Mon–Fri)" },
  { value: "custom", label: "Custom Days" },
] as const;

export type AvailabilityType =
  | (typeof AVAILABILITY_OPTIONS)[number]["value"]
  | "";
