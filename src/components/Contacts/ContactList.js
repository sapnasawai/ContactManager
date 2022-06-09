import React, {useState , useEffect } from 'react';
import {Link} from 'react-router-dom';
import {ContactService} from '../../services/ContactService'
import Spinner from '../Spinner/Spinner';

const ContactList = () => {
  
  let [query, setQuery] = useState({
    text:''
  });

  let [state, setState] = useState( {
    loading : false,
    contacts : [],
    filteredContacts : [],
    errorMessage : ''
  });

  useEffect( async () => {
  try {
    setState({
      ...state, loading:true
    })
   let response = await ContactService.getAllContacts();
   setState({
    ...state, 
    loading:false,
    contacts:response.data,
    filteredContacts:response.data
  })
  }
  catch (error) {
    setState({
      ...state,
       loading:false,
      errorMessage:error.message
    })
  }
  }, [])

  // delete contact
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if(response) {
        setState({
          ...state, loading:true
        })
       let response = await ContactService.getAllContacts();
       setState({
        ...state, 
        loading:false,
        contacts:response.data,
        filteredContacts:response.data

      })
    }
    
  }
  catch (error) {
    setState({
      ...state,
       loading:false,
      errorMessage:error.message
    })
  }
}

  let searchContacts = (event) => {
    setQuery({...query, text:event.target.value});
    let theContacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts:theContacts
    })
  }

  let {loading, contacts, filteredContacts, errorMessage} = state;

  return (
    <React.Fragment>
      <pre>{query.text}</pre>
      <section className='contact-search p-5 '>
        <div className='container'>
          <div className='grid'>
            <div className='row'>
              <div className='col'>
                <p className='h3 fw-bold'>Contact Manager  
                    <Link to='/contacts/add' className="btn btn-primary ms-4">
                     <span className='fa fa-user-plus pe-2'></span>
                     New
                    </Link>
                </p>
              </div>
              <div className='row'>
              <div className='col'>
                <p> Hey there , This is the Contact Manager App built with 💝.
                </p>
              </div></div>
              <form className='row'>
                <div className='col'>
                   <div className='mb-2'>
                     <input 
                     name="text" value={query.text} onChange={searchContacts}
                     type='text' placeholder='Search Names' className='form-control'/>
                   </div>
                </div>
                <div className='col'>
                   <div className='mb-2'>
                     <input type='submit' className='btn btn-outline-dark' value='search'/>
                   </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    {
       loading ? <Spinner/> : <React.Fragment>
          
          <section className='contact-list'>
      <div className='container'>
        <div className='row'>
          {
            filteredContacts.length > 0 &&
               filteredContacts.map(contact => {
                 return (
                  <div className='col-lg-6' key={contact.id}>
                  <div className='card my-2 '>
                    <div className='card-body '>
                       <div className='row align-items-center d-flex justify-content-around'>
                         <div className='col-md-5 '>
                           <img src={contact.photo} className='container-img img-fluid ' />
                         </div>
                         <div className='col-md-6 '>
                           <ul className='list-group'>
                             <li className='list-group-item list-group-item-action'>
                               Name : <span className='fw-bold'>{contact.name}</span>
                             </li>
                             <li className='list-group-item list-group-item-action'>
                               Mobile : <span className='fw-bold'>{contact.mobile}</span>
                             </li>
                             <li className='list-group-item list-group-item-action'>
                               Email : <span className='fw-bold'>{contact.email}</span>
                             </li>
                           </ul>
                         </div>
                         <div className='col-md-1 d-flex  align-items-center flex-lg-column flex-md-column justify-content-lg-center'>
                         <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                            <i className='fa fa-eye '/>
                          </Link>
                          <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                            <i className='fa fa-edit'/>
                          </Link>
                          <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)} type='submit'><i className='fa fa-trash'/></button>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
                 )
               })
          }
         
        </div>
      </div>
    </section>

     </React.Fragment>
    }

    

    </React.Fragment>
  );
}

export default ContactList;
