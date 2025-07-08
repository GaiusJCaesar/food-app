import { ItemsType } from "./default";

export type Cuisine = {
  label: string;
  value: string;
  group: string;
};

export type CuisineMap = ItemsType<Cuisine>;

export const cuisines: CuisineMap = {
  British: { label: "British", value: "british", group: "Europe" },
  Italian: { label: "Italian", value: "italian", group: "Europe" },
  Chinese: { label: "Chinese", value: "chinese", group: "Asia" },
  Indian: { label: "Indian", value: "indian", group: "Asia" },
  Mexican: { label: "Mexican", value: "mexican", group: "North America" },
  French: { label: "French", value: "french", group: "Europe" },
  Thai: { label: "Thai", value: "thai", group: "Asia" },
  Japanese: { label: "Japanese", value: "japanese", group: "Asia" },
  Greek: { label: "Greek", value: "greek", group: "Europe" },
  Spanish: { label: "Spanish", value: "spanish", group: "Europe" },
  Turkish: { label: "Turkish", value: "turkish", group: "Middle East" },
  Vietnamese: { label: "Vietnamese", value: "vietnamese", group: "Asia" },
  Korean: { label: "Korean", value: "korean", group: "Asia" },
  Moroccan: { label: "Moroccan", value: "moroccan", group: "Africa" },
  Ethiopian: { label: "Ethiopian", value: "ethiopian", group: "Africa" },
  Lebanese: { label: "Lebanese", value: "lebanese", group: "Middle East" },
  American: { label: "American", value: "american", group: "North America" },
  Brazilian: { label: "Brazilian", value: "brazilian", group: "South America" },
  Peruvian: { label: "Peruvian", value: "peruvian", group: "South America" },
  German: { label: "German", value: "german", group: "Europe" },
  Caribbean: { label: "Caribbean", value: "caribbean", group: "Caribbean" },
  Persian: { label: "Persian", value: "persian", group: "Middle East" },
  SouthAfrican: {
    label: "SouthAfrican",
    value: "southafrican",
    group: "Africa",
  },
  Cuban: { label: "Cuban", value: "cuban", group: "Caribbean" },
  Malaysian: { label: "Malaysian", value: "malaysian", group: "Asia" },
  Russian: { label: "Russian", value: "russian", group: "Europe" },
  Other: { label: "Other", value: "other", group: "Other" },
};
