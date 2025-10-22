export const campaignTypeOptions: string[] = ["General", "Promotion"];

export const subCampaignTypeOptionsMap = {
  General: ["All"],
};

export const statusOptions = ["Active", "Inactive"];

export const geoOptions: string[] = ["AMER", "EMEA", "Other"];

export const filteredAreaOptions = {
  AMER: ["US", "All"],
  EMEA: ["UK", "All"],
  Default: ["All"],
};

export function updateFilteredAreaOptions(
  geo: string,
  setFilteredAreaOptions: (options: string[]) => void,
) {
  if (geo) {
    const options =
      filteredAreaOptions[geo as keyof typeof filteredAreaOptions] ||
      filteredAreaOptions.Default;
    setFilteredAreaOptions(options);
  } else {
    setFilteredAreaOptions([]);
  }
}
