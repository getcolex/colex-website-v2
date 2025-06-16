export type Option = { label: string; value: string };

export const ROLES = [
  "Associate",
  "Partner",
  "General Counsel",
  "Other",
] as const;
export const ORGANIZATIONS = [
  "Law firm",
  "Consultancy",
  "Government",
  "Other",
] as const;
export const PRACTICE_AREAS = [
  "Family law",
  "Audit and compliance",
  "Criminal law",
  "Contract law",
  "Mediation",
  "Other",
] as const;

export interface FormSchema {
  firmName: string;
  currentRole: Option[];
  currentRoleOther: string;
  organization: Option[];
  organizationOther: string;
  mainAreas: Option[];
  mainAreaOther: string;
}

export const toOptions = (arr: readonly string[]) =>
  arr.map((v) => ({ label: v, value: v }));
