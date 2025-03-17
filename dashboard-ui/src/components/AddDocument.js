import React, { useState } from "react";
import DocumentService from "../services/DocumentService";

const AddDocument = () => {
  const initialDocumentState = {
    id: null,
    name: "Other",
    userId: window.location.search.substring(1).split("=")[1]
  };
  const [document, setDocument] = useState(initialDocumentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDocument({ ...document, [name]: value });
  };

  const saveDocument = () => {
    var data = {
      name: document.name,
      userId: document.userId,
    };

    DocumentService.create(data)
      .then(response => {
        setDocument({
          id: response.data.id,
          name: response.data.name,
          userId: response.data.userId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newDocument = () => {
    setDocument(initialDocumentState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newDocument}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Owner ID</label>
            <input
              type="number"
              className="form-control"
              id="userId"
              required
              disabled
              value={document.userId}
              onChange={handleInputChange}
              name="userId"
            />
            <label htmlFor="name">Document type</label>
            <select
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={document.name}
                onChange={handleInputChange}
                required
              >
                <option selected value="Other">Other</option>
                <option value="ID">ID</option>
                <option value="Driver license">Driver license</option>
            </select>
          </div>

          <button onClick={saveDocument} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDocument;
