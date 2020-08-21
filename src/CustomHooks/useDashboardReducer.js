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
      case "NEW_APPLICATION":
        const newUserId = state.data.length + 1;
        const newApplication = action.newApplication;
        newApplication.id = newUserId;
        let newData = [...state.data, newApplication];
        if (state.column && state.direction) {
          newData = _.orderBy(newData, [state.column], [state.direction]);
        }
        return {
          ...state,
          data: newData,
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
