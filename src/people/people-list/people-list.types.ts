import { Person } from "../person-info/person-info";

export type OnPeopleDataLoaded = (people: Person[]) => void;
export type OnPeopleDataLoadedError = (error?: Error) => void;
export type IsPeopleDataLoading = (loading: boolean) => void;
export type LoadPeopleData = (
  onPeopleDataLoaded: OnPeopleDataLoaded,
  onPeopleDataLoadedError: OnPeopleDataLoadedError,
  isPeopleDataLoading: IsPeopleDataLoading
) => Promise<void>;
export type LoadMorePeopleData = () => void;
