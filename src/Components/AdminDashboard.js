import React, { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";
import firebase from "../Firebase/firebase";
import ParentApplicationEntries from "./ParentApplicationEntries";

const AdminDashboard = () => {
  const [allParents, setAllParents] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
    }, 1000);
  }, []);

  useEffect(() => {
    const getAllParents = async () => {
      try {
        const allParents = await firebase.getAllParents();
        setAllParents(allParents.docs.map((doc) => {
            const data = JSON.parse(JSON.stringify(doc.data()));
            const name = `${data.firstName} ${data.lastName}`;
            const modifiedData = {
                uid: data.uid,
                name,
                email: data.email
            };
            return modifiedData;
        }));
        // const allMetaData = allChildren.docs.map((doc) => {
        //   const originalMetaData = doc.data().metaData;
        //   sessionStorage.setItem(
        //     originalMetaData.childDocRefId,
        //     JSON.stringify(doc.data().formData)
        //   );
        //   const modifiedMetaData = {
        //     name: `${originalMetaData.firstName} ${originalMetaData.lastName}`,
        //     id: originalMetaData.childDocRefId,
        //     date: originalMetaData.dateSubmitted,
        //     applicationStatus: originalMetaData.applicationStatus,
        //     action: computeAction(originalMetaData.applicationStatus),
        //   };
        //   return modifiedMetaData;
        // });
        // dashboardDispatch({ type: "UPDATE", metaData: allMetaData });
      } catch (err) {
        console.error(err);
      }
    };
    getAllParents();
  }, []);

  return (
    <Container fluid style={{ background: "#EFF2F7" }} textAlign="center">
      <Header
        textAlign="center"
        as="h1"
        style={{ color: "#47525E", fontSize: "4em" }}
        dividing
      >
        Admin Dashboard
      </Header>
      <ParentApplicationEntries allParents={allParents}/>
    </Container>
  );
};

export default AdminDashboard;
