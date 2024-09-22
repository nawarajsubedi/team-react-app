const validVariants: Array<"success" | "failure" | "warning"> = [
  "success",
  "failure",
  "warning",
];

const getValidVariant = (
  variant: string
): "success" | "failure" | "warning" => {
  return validVariants.includes(variant as any)
    ? (variant as "success" | "failure" | "warning")
    : "warning";
};

const addMinutes = (date: Date, minute: number) => {
  date.setMinutes(minute);
  return date;
};

export { getValidVariant, addMinutes };
