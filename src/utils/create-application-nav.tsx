type NewApplicationNavProps = {
  step: number;
  label: string;
};

export const NewApplicationNav: NewApplicationNavProps[] = [
  {
    step: 1,
    label: "Application Type",
  },
  {
    step: 2,
    label: "Personal Info",
  },
  {
    step: 3,
    label: "Booklet & Validity",
  },
  {
    step: 4,
    label: "Summary",
  },
];
