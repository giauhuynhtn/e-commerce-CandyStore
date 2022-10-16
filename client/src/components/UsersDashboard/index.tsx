import React from "react";
import { useSelector } from "react-redux";
import { TableCell, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { fetchUsersThunk } from "services/thunks.services";
import axios from "axios";

function UsersDashboard() {
  const { users } = useSelector((state: RootState) => {
    return state;
  });
  const dispatch = useDispatch<AppDispatch>();

  const baseURL = "http://localhost:4000/api/v1/users";

  React.useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const handleBanUser = async (banStatus: boolean, userId: string) => {
    const newBanStatus = String(banStatus) === "true" ? false : true;
    await axios.put(`${baseURL}/${userId}`, { isBanned: newBanStatus });
    dispatch(fetchUsersThunk());
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='countries table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Id
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Firstname
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Ban status
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Admin status
              </TableCell>
              {/* <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Orders
              </TableCell> */}
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Email
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#333" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.items.map((user) => (
              <TableRow hover={true} key={user._id}>
                <TableCell align='center' sx={{ width: 100 }}>
                  {user._id}
                </TableCell>
                <TableCell align='center' sx={{ width: 100 }}>
                  {user.firstname}
                </TableCell>
                <TableCell align='center' sx={{ width: 100 }}>
                  {user.isBanned}
                </TableCell>
                <TableCell align='center' sx={{ width: 100 }}>
                  {user.isAdmin}
                </TableCell>
                {/* <TableCell align='center' sx={{ width: 200 }}>
                  {user.orders}
                </TableCell> */}
                <TableCell align='center' sx={{ width: 100 }}>
                  {user.email}
                </TableCell>
                <TableCell align='center' sx={{ width: 100 }}>
                  <Button
                    onClick={() => handleBanUser(user.isBanned, user._id)}
                    variant='contained'>
                    {String(user.isBanned) === "true" ? "Unban" : "Ban"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UsersDashboard;
