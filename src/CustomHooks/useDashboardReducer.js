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
      case "NEW_APPLICATIONS":
        const currUserId = state.data.length + 1;
        const { page1, page2 } = action.newApplication;
        const application1 = {
          name: `${page1.childFirstName} ${page1.childLastName}`,
          date: page1.date,
          action: page1.actionType,
          applicationStatus: page1.applicationStatus,
        };
        const application2 = {
          name: `${page2.childFirstName} ${page2.childLastName}`,
          date: page2.date,
          action: page2.actionType,
          applicationStatus: page2.applicationStatus,
        };

        application1.id = currUserId + 1;
        application2.id = currUserId + 2;
        let newDatas = [...state.data, application1, application2];
        if (state.column && state.direction) {
          newDatas = _.orderBy(newDatas, [state.column], [state.direction]);
        }
        return {
          ...state,
          data: newDatas,
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
