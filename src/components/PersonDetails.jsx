import React, { useState } from "react";

const PersonDetails = () => {
  const [personList, setPersonList] = useState([]);

  const handleAdd = () => {
    const newPerson = {
      name: "",
      age: "",
    };
    setPersonList([...personList, newPerson]);
  };

  const handleDelete = (person) => {
    const updatedList = personList.filter((p) => person !== p);
    setPersonList(updatedList);
  };

  const updatePersonData = (person, key, value) => {
    const updatedList = personList.map((p) => {
      if (p === person) {
        return { ...p, [key]: value };
      }
      return p;
    });
    setPersonList(updatedList);
  };
  return (
    <div>
      <div className="max-h-52 h-full overflow-y-scroll">
        {personList.map((person) => (
          <div key={person.id}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={person.name}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => {
                updatePersonData(person, "name", e.target.value);
              }}
            />
            <input
              type="number"
              value={person.age}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => {
                updatePersonData(person, "age", e.target.value);
              }}
            />
            <button onClick={() => handleDelete(person)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={handleAdd}>Add Person</button>
    </div>
  );
};

export default PersonDetails;
