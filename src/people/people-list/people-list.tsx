import React from "react";
import { Button } from "src/components/button/button";
import { Spinner } from "src/components/spinner/spinner";
import {
  Notification,
  NotificationType,
} from "src/components/notification/notification";
import PersonInfo from "../person-info/person-info";
import { usePeopleData } from "./people-list.hooks";

type PeopleListProps = {
  onPersonSelected: (personId: string) => void;
  selected: string[]
};

export const PeopleList = (props: PeopleListProps): JSX.Element => {
  const { peopleData, loadMorePeopleData, loading, error } = usePeopleData();

  return (
    <div className="list">
      {peopleData.map((personInfo: any) => (
        // @ts-ignore
        <PersonInfo
          key={personInfo.id}
          data={personInfo}
          onClick={() => props.onPersonSelected(personInfo.id)}
          selected={props.selected.includes(personInfo.id)}
        />
      ))}
      {error && (
        <Notification type={NotificationType.ERROR} message={error.message} />
      )}
      <Button onClick={loadMorePeopleData} disabled={loading}>
        {loading ? <Spinner /> : "Load more"}
      </Button>
    </div>
  );
};
