import apiData from "src/api";
import { LoadPeopleData } from "./people-list.types";

export const loadPeopleData: LoadPeopleData = async (
  onPeopleDataLoaded,
  onPeopleDataLoadedError,
  isPeopleDataLoading
) => {
  try {
    isPeopleDataLoading(true);
    onPeopleDataLoadedError(undefined);

    const people = await apiData();
    onPeopleDataLoaded(people);

    isPeopleDataLoading(false);
  } catch (error) {
    isPeopleDataLoading(false);
    onPeopleDataLoadedError(error as Error);
  }
};
