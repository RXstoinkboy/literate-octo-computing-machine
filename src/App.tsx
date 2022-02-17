import React, { useState, useEffect } from "react";
import apiData from "./api";
import { Spinner } from "./components/spinner/spinner";
import PersonInfo, { Person } from "./people/person-info/person-info";
import { Button } from "./components/button/button";
import {
  Notification,
  NotificationType,
} from "./components/notification/notification";

type OnPeopleDataLoaded = (people: Person[]) => void;
type OnPeopleDataLoadedError = (error?: Error) => void;
type IsPeopleDataLoading = (loading: boolean) => void;
type LoadPeopleData = (
  onPeopleDataLoaded: OnPeopleDataLoaded,
  onPeopleDataLoadedError: OnPeopleDataLoadedError,
  isPeopleDataLoading: IsPeopleDataLoading
) => Promise<void>;
type LoadMorePeopleData = () => void;

const loadPeopleData: LoadPeopleData = async (
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

const usePeopleData = (): {
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

function App() {
  const { peopleData, loadMorePeopleData, loading, error } = usePeopleData();
  const [selected, setSelected] = React.useState<string[]>([]);

  const toggleSelected = (personId: string): void => {
    const isSelected = selected.includes(personId);
    if (!isSelected) {
      setSelected((prevState) => [...prevState, personId]);
    }
    if (isSelected) {
      setSelected((prevState) =>
        prevState.filter((person) => person !== personId)
      );
    }
  };

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {peopleData.map((personInfo: any) => (
          // @ts-ignore
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            onClick={() => toggleSelected(personInfo.id)}
            selected={selected.includes(personInfo.id)}
          />
        ))}
        {error && (
          <Notification type={NotificationType.ERROR} message={error.message} />
        )}
        <Button onClick={loadMorePeopleData} disabled={loading}>
          {loading ? <Spinner /> : "Load more"}
        </Button>
      </div>
    </div>
  );
}

export default App;
