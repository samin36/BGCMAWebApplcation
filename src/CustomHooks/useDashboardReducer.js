import { useReducer } from "react";
import _ from "lodash";

const useDashboardReducer = (initialData) => {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "SORT":
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.reverse(),
            direction: state.direction === "asc" ? "desc" : "asc",
          };
        } else {
          return {
            ...state,
            column: action.column,
            data: _.sortBy(state.data, [action.column]),
            direction: "asc",
          };
        }
      case "DELETE":
        return {
          ...state,
          data: state.data.filter(
            (application) => application.id !== action.id
          ),
        };
      case "UPDATE":
        return {
          ...state,
          data: action.metaData,
        };
      default:
        throw new Error("dashboard reducer error");
    }
  };
  const [dashboardState, dashboardDispatch] = useReducer(dataReducer, {
    column: null,
    direction: null,
    data: initialData,
  });
  return [dashboardState, dashboardDispatch];
};

export default useDashboardReducer;
