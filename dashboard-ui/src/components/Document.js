import React, { useState, useEffect } from "react";
import DocumentService from "../services/DocumentService";

const Document = props => {
  const initialDocumentState = {
    id: null,
    name: "",
    userId: null,
  };
  const [currentDocument, setCurrentDocument] = useState(initialDocumentState);
  const [message, setMessage] = useState("");

  const getDocument = id => {
    DocumentService.get(id)
      .then(response => {
        setCurrentDocument(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDocument(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDocument({ ...currentDocument, [name]: value });
  };

  const updateDocument = () => {
    DocumentService.update(currentDocument.id, currentDocument)
      .then(response => {
        console.log(response.data);
        setMessage("The document was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDocument = () => {
    DocumentService.remove(currentDocument.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/documents");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDocument ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
            <label htmlFor="name">Owner ID</label>
              <input
                type="number"
                disabled
                className="form-control"
                id="userId"
                name="userId"
                value={currentDocument.userId}
                onChange={handleInputChange}
              />
              <label htmlFor="name">Document type</label>
              <select
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentDocument.name}
                onChange={handleInputChange}
              >
                <option selected value="Other">Other</option>
                <option value="ID">ID</option>
                <option value="Driver license">Driver license</option>
              </select>
            </div>
          </form>
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateDocument}
          >
            Update
          </button>
          <br/>
          <br/>
          <button className="btn btn-danger" onClick={deleteDocument}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Document...</p>
        </div>
      )}
    </div>
  );
};

export default Document;
