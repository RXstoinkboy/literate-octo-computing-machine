import React from "react";
import { PeopleList } from "./people/people-list/people-list";

function App() {
  // This logic and 'selected people' jsx could be further moved to separate file
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
      <PeopleList onPersonSelected={toggleSelected} selected={selected} />
    </div>
  );
}

export default App;
