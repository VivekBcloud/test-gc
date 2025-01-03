import React, { useState } from "react";
import { CloseIcon, DeleteIcon } from "../../../components/SvgIcons";

const PersonDetails = ({
  personList,
  handlePersonAdd,
  handlePersonDelete,
  updatePersonData,
}) => {
  return (
    <div className="">
      <div className="max-h-72 h-full overflow-y-scroll py-1">
        {personList.map((person, idx) => (
          <div className="py-4 text-sm" key={person.id}>
            <div className="flex pb-4 text-sm font-medium text-gray-700">
              Person {idx + 1}
              {idx !== 0 && (
                <button
                  type="button"
                  onClick={() => handlePersonDelete(person)}
                  className="flex hover:bg-gray-200 ml-2"
                >
                  {"("}
                  Remove
                  <span>
                    <CloseIcon />
                  </span>
                  {")"}
                </button>
              )}
            </div>
            <div className="px-1 md:px-4">
              <input
                id={`person-${person.id}`}
                type="text"
                required
                placeholder="Name"
                value={person.name}
                className="w-full my-2 px-3 py-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-gray-300"
                onChange={(e) => {
                  updatePersonData(person, "name", e.target.value);
                }}
              />
              <div className="grid  grid-cols-1 sm:grid-cols-2 ">
                <input
                  required
                  type="number"
                  value={person.age}
                  placeholder="Age"
                  className=" my-2 pl-2 py-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-gray-300"
                  onChange={(e) => {
                    updatePersonData(person, "age", e.target.value);
                  }}
                />

                {/* Gender Toggle */}
                <div className="ml-auto flex items-center  rounded">
                  <button
                    className={`px-2 sm:px-3 py-2 border border-collapse border-gray-500 ${
                      person?.gender === "Male"
                        ? "bg-gray-500 text-white"
                        : "bg-white"
                    }`}
                    type="button"
                    onClick={() => updatePersonData(person, "gender", "Male")}
                  >
                    Male
                  </button>
                  <button
                    className={`px-2 sm:px-3 py-2 border border-collapse border-gray-500 ${
                      person?.gender === "Female"
                        ? "bg-gray-500 text-white"
                        : "bg-white"
                    }`}
                    type="button"
                    onClick={() => updatePersonData(person, "gender", "Female")}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-right py-4">
        <button
          type="button"
          className="text-blue-500 capitalize text-sm font-semibold"
          onClick={handlePersonAdd}
        >
          + ADD PERSON
        </button>
      </div>
    </div>
  );
};

export default PersonDetails;
