import React, { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { ContactService } from "../../services/ContactService";

function AddContact() {

  let navigate = useNavigate();
  
  let [state, setState] = useState({
    landing:false,
    contact: {
      name:'',
      photo:'',
      mobile:'',
      email:'',
      company:'',
      title:'',
      groupId:'',
    },
    groups:[],
    errorMessage:''
  });

  let updateInput = (event) => {
      setState({
        ...state,
        contact: {
          ...state.contact,
          [event.target.name]:event.target.value
        }
      });
  };

  useEffect( async () => {
     try {
        setState( {
          ...state,
          loading:true
        });
        let respone = await ContactService.getAllGroups();
        setState({
          ...state,
          loading:false,
          groups:respone.data
        })
     }
     catch(error) {

     }
     }, [])

     let submitForm = async(event) => {
       event.preventDefault();
       try {
          let response = await ContactService.createContact(state.contact);
          if(response){
            navigate('/contacts/list',{ replace: true})
          }
       }
       catch (error) {
         setState({...state, errorMessage:error.message});
         navigate('/contats/add',{replace:false});
       }
     }

  let {loading, contact,groups,errorMessage} =state;

  return (
    <React.Fragment>
 
      <div className="container p-3">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create Contact</p>
              <p>
              Fill this form and click the create button to add a new contact here.
              </p>
            </div>
          </div>
         
            <div className="row">
              <div className="col-md-5">
              <form  onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name" value={contact.name}
                    onChange={updateInput}
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                   autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <input
                  required={true}
                  name="photo" value={contact.photo}
                  onChange={updateInput}
                    type="text"
                    placeholder="Photo URL"
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <input
                  required={true}
                  name="mobile" value={contact.mobile}
                  onChange={updateInput}
                    type="text"
                    placeholder="Mobile"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <input
                  required={true}
                  name="email" value={contact.email}
                  onChange={updateInput}
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <input
                  required={true}
                  name="company" value={contact.company}
                  onChange={updateInput}
                    type="text"
                    placeholder="Company"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <input
                  required={true}
                  name="title" value={contact.title}
                  onChange={updateInput}
                    type="text"
                    placeholder="Title"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <select
                  required={true}
                  name="groupId" value={contact.groupId}
                  onChange={updateInput}
                  className="form-control">
                    <option value="">Select a Group</option>
                    {
                      groups.length > 0 &&
                        groups.map(group => {
                          return(
                            <option key={group.id} value={group.id}>{group.name}</option>
                          )
                        })
                    }
                  </select>
                </div>

                <div className="mb-2">
                  <input className="btn btn-success" type="submit" value='Create'/>
                    
                  
                  <Link
                    to="/contacts/list"
                    className="btn btn-dark ms-2"
                    type="submit"
                  >
                    Cancel
                  </Link>
                </div>
                </form>
              </div>
            </div>
        
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddContact;
