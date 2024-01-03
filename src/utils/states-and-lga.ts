import * as nigerianStates from "nigerian-states-and-lgas";

export const getOfficeForState = (selectedState: string) => {
  const allStatesAndLGAs = nigerianStates.all();
  const stateData = allStatesAndLGAs.find(
    (state) => state.state === selectedState
  );
  return stateData ? stateData.lgas : [];
};
