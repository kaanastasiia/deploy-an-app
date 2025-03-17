import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import UserDataService from "../services/UserService";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const usersRef = useRef();
  const [isApiAvailable, setIsApiAvailable] = useState(false);


  usersRef.current = users;

  useEffect(() => {
    if (isApiAvailable) retrieveUsers();
    checkUsersApi();
  }, [isApiAvailable]);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkUsersApi = () => {
    UserDataService.checkApi()
      .then((state) => {
        setIsApiAvailable(state)
      })
      .catch((e) => {
        console.log(e);
        setIsApiAvailable(false)
      });
  };

  const openUser = useCallback((rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    props.history.push("/users/" + id);
  }, [props]);

  const addDocument = useCallback((rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    props.history.push("/add-document?userId=" + id);
  },[props]);

  const deleteUser = useCallback((rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    UserDataService.remove(id)
      .then((response) => {
        props.history.push("/users");

        let newUsers = [...usersRef.current];
        newUsers.splice(rowIndex, 1);

        setUsers(newUsers);
      })
      .catch((e) => {
        console.log(e);
      });
  },[props]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First name",
        accessor: "firstname",
      },
      {
        Header: "Last name",
        accessor: "lastname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openUser(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => addDocument(rowIdx)}>
                <i className="far fa-file-image action mr-2"></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    [openUser, deleteUser, addDocument]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: users,
  });

  return (
    <div className="list row">
      { !isApiAvailable ?
        <div className="col-md-12 list alert alert-danger text-center" role="alert">
          Users API is not available!
        </div> : null
      }
      { isApiAvailable ? <div className="col-md-12 list">
        <Link to={"/add-user"} className="btn btn-success custom-margin">
          Add user
        </Link>
      </div> : null }
      { isApiAvailable ? <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> : null}
    </div>
  );
};

export default UsersList;
