import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import DocumentService from "../services/DocumentService";
import { useTable } from "react-table";
import env from "react-dotenv";

const DocumentsList = (props) => {
  const [documents, setDocuments] = useState([]);
  const [data, setData] = useState({});
  const documentsRef = useRef();
  const [isApiAvailable, setIsApiAvailable] = useState(false);


  documentsRef.current = documents;

  useEffect(() => {
    if (isApiAvailable) retrieveDocuments();
    checkUsersApi();
  }, [data, isApiAvailable]);

  const retrieveDocuments = () => {
    DocumentService.getAll()
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkUsersApi = () => {
    DocumentService.checkApi()
      .then((state) => {
        setIsApiAvailable(state)
      })
      .catch((e) => {
        console.log(e);
        setIsApiAvailable(false)
      });
  };

  const openDocument = useCallback((rowIndex) => {
    const id = documentsRef.current[rowIndex].id;

    props.history.push("/documents/" + id);
  },[props]);

  const onUploadIconClick = (rowIndex) => {
    const input = document.getElementById(`file-input-upload-${rowIndex}`);
    if (input) {
       input.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, rowIndex) => {
    const id = documentsRef.current[rowIndex].id;
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const result = await fetch(`${env.DOCUMENTS_API_BASE_URL}/documents/upload/${id}`, {
        method: 'POST',
        body: formData,
      });

      const data = await result.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDocument = useCallback((rowIndex) => {
    const id = documentsRef.current[rowIndex].id;

    DocumentService.remove(id)
      .then((response) => {
        props.history.push("/documents");

        let newDocuments = [...documentsRef.current];
        newDocuments.splice(rowIndex, 1);

        setDocuments(newDocuments);
      })
      .catch((e) => {
        console.log(e);
      });
  },[props] );

  const columns = useMemo(
    () => [
      {
        Header: "Owner ID",
        accessor: "userId",
      },
      {
        Header: "Document type",
        accessor: "name",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openDocument(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => onUploadIconClick(rowIdx)}>
                <i className="fas fa-upload action mr-2"></i>
                <input
                  type="file"
                  id={`file-input-upload-${rowIdx}`}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, rowIdx)}
                />
              </span>

              {
                documentsRef.current[rowIdx].path ?
                  <a href={`${env.DOCUMENTS_API_BASE_URL}/documents/download/${documentsRef.current[rowIdx].id}`} target='_blank' rel="noreferrer">
                    <span>
                      <i className="fas fa-download action mr-2"></i>
                    </span>
                  </a> :
                  null
              }

              <span onClick={() => deleteDocument(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    [openDocument, deleteDocument]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: documents,
  });

  return (
    <div className="list row">
      { !isApiAvailable ?
        <div className="col-md-12 list alert alert-danger text-center" role="alert">
          Documents API is not available!
        </div> : null
      }
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

export default DocumentsList;
