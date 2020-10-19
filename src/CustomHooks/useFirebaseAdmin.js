const useFirebaseAdmin = () => {
    return JSON.parse(sessionStorage.getItem("authenticatedUser")).admin === true;
  };
  
  export default useFirebaseAdmin;
  