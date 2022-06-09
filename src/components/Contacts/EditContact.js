import React , { useState, useEffect} from "react";
import { Link , useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../services/ContactService";
import Spinner from "../Spinner/Spinner";

function EditContact() {
  
  let navigate = useNavigate()
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading : false,
    contact : {
      name:"",
      photo:"",
      email:"",
      mobile:"",
      company:'',
      title:'',
      groupId:""
    },
    groups : [],
    errorMessage : ''
  });

  useEffect( async () => {
     try{
       setState({...state , loading:true});
       let response = await ContactService.getContact(contactId);
       let groupResponse = await ContactService.getAllGroups();
       setState({
         ...state,
         loading:false,
         contact:response.data,
         groups:groupResponse.data
       })
     }
     catch (error) {
       setState({
         ...state,
         loading:false,
         errorMessage:error.message
       })
     }
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name] : event.target.value
      }
    })
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, contactId);
      if(response) {
        navigate('/contacts/list', { replace:true });
      }
    }
    catch(error) {
      setState({...state , errorMessage:error.message});
      navigate(`/contacts/edit/${contactId}` , {replace:false})
    }
  };


  let {loading , contact, groups, errrorMessage} = state;


  return (
    <React.Fragment>
      {
        loading ? <Spinner/> : <React.Fragment>
               
               {/* <pre>{JSON.stringify(contact)}</pre> */}
      <div className="container p-3">
        <div className="row">
          <div className="col">
            <p className="h3 text-primary fw-bold">Edit Contact</p>
            <p>
             Edit the selected contact here and save.
            </p>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-5">
            <form onSubmit={submitForm}>
              <div className="mb-2">
                <input
                required={true}
                  name="name" value={contact.name}
                  onChange={updateInput}
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
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
                        return (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                      })
                  }
                </select>
              </div>

              <div className="mb-2">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Update"
                />

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
          <div className="col-md-6 ">
            <img
              src={contact.photo}
              className="container-img  "
            />
          </div>
        </div>
      </div>

          </React.Fragment>
      }
     
    </React.Fragment>
  );
}

export default EditContact;
