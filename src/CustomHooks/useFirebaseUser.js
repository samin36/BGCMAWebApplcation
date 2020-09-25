const useFirebaseUser = () => {
  return JSON.parse(sessionStorage.getItem("authenticatedUser"));
};

export default useFirebaseUser;
