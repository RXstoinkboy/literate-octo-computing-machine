import { useEffect, useState } from "react";
import { Person } from "../person-info/person-info";
import {
  IsPeopleDataLoading,
  LoadMorePeopleData,
  OnPeopleDataLoaded,
  OnPeopleDataLoadedError,
} from "./people-list.types";
import { loadPeopleData } from "./people-list.utils";

export const usePeopleData = (): {
  peopleData: Person[];
  loadMorePeopleData: LoadMorePeopleData;
  error?: Error;
  loading: boolean;
} => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const onPeopleDataLoaded: OnPeopleDataLoaded = (newPeopleData) => {
    if (!loading) {
      setPeopleData((prevState) => [...prevState, ...newPeopleData]);
    }
  };

  const onPeopleDataLoadedError: OnPeopleDataLoadedError = (error) => {
    setError(error);
  };

  const isPeopleDataLoading: IsPeopleDataLoading = (loading) =>
    setLoading(loading);

  const loadMorePeopleData = (): void => {
    loadPeopleData(
      onPeopleDataLoaded,
      onPeopleDataLoadedError,
      isPeopleDataLoading
    );
  };

  useEffect(() => {
    loadMorePeopleData();
  }, []);

  return {
    peopleData,
    loadMorePeopleData,
    loading,
    error,
  };
};
