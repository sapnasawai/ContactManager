import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import AddContact from './components/Contacts/AddContact';
import ContactList from './components/Contacts/ContactList';
import ViewContact from './components/Contacts/ViewContact';
import EditContact from './components/Contacts/EditContact';
import Navbar from './components/Navbar';


function App() {
  return (
    <React.Fragment>
     <Navbar />
      <Routes>
      
        <Route path='/' element={<Navigate to={'/contacts/list'}/>} />
        <Route path='/contacts/list' element={<ContactList/>} />
        <Route path='/contacts/add' element={<AddContact/>} />
        <Route path='/contacts/view/:contactId' element={<ViewContact/>} />
        <Route path='/contacts/edit/:contactId' element={<EditContact/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
