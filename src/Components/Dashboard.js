import React, { useEffect, useContext } from "react";
import { Container, Header } from "semantic-ui-react";
import ApplicationEntries from "./ApplicationEntries";
import { DashboardDispatchContext } from "../Context/DashboardDispatchContext";
import firebase from "../Firebase/firebase";
import useFirebaseUser from "../CustomHooks/useFirebaseUser";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const dashboardDispatch = useContext(DashboardDispatchContext);
  const user = useFirebaseUser();  
  const location = useLocation();
  let parentUid = null;
  if (user && user.admin === true) {
    if (location.state) {
      parentUid = location.state.parentUid;
    } 
  }
  

  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
    }, 1000);
  }, []);

  const computeAction = (applicationStatus) => {
    if (parentUid && user && user.admin === true) {
      return "View";
    } else if (applicationStatus === "Incomplete") {
      return "Edit";
    } else if (
      applicationStatus === "Approved" ||
      applicationStatus === "Pending"
    ) {
      return "View";
    } else {
      return "Error";
    }
  };

  useEffect(() => {
    const getMetaData = async () => {
      let parentId = parentUid ? parentUid : user.uid;
      try {
        const allChildren = await firebase.getMetaDataForAllChildren(parentId);
        const allMetaData = allChildren.docs.map((doc) => {
          const originalMetaData = doc.data().metaData;
          sessionStorage.setItem(
            originalMetaData.childDocRefId,
            JSON.stringify(doc.data().formData)
          );
          const modifiedMetaData = {
            name: `${originalMetaData.firstName} ${originalMetaData.lastName}`,
            id: originalMetaData.childDocRefId,
            date: originalMetaData.dateSubmitted,
            applicationStatus: originalMetaData.applicationStatus,
            action: computeAction(originalMetaData.applicationStatus),
            parentUid: parentId
          };
          return modifiedMetaData;
        });
        dashboardDispatch({ type: "UPDATE", metaData: allMetaData });
      } catch (err) {
        console.error(err);
      }
    };
    getMetaData();
  }, []);

  return (
    <>
    <Container fluid style={{ background: "#EFF2F7" }} textAlign="center">
      <Header
        textAlign="center"
        as="h1"
        style={{ color: "#47525E", fontSize: "4em" }}
        dividing
      >
        Dashboard
      </Header>
      <ApplicationEntries />
    </Container>
    </>
  );
};

export default Dashboard;
