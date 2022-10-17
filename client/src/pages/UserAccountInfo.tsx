import UserAccount from "components/UserAccount";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import MenuBar from "components/MenuBar";

function UserAccountInfo() {
  const { users } = useSelector((state: RootState) => {
    return state;
  });
  return (
    <>
      <MenuBar />
      <UserAccount selectedUser={users.currentUser} />
    </>
  );
}

export default UserAccountInfo;
