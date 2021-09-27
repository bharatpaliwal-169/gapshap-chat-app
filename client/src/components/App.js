import React from 'react';
//custom hooks
import useLocalStorage from '../Hooks/useLocalStorage';

//screens
import Login from './Login';
import Dashboard from './Dashboard';
import Info from './Info'
//context
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

import {Button,Modal} from 'react-bootstrap';
function App() {
  const [id,setId] = useLocalStorage('id');
  const [open,isOpen] = React.useState(false);
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  function closeModal(){
    isOpen(false);
  }
  return (
    <>
      {id ? dashboard : <Login onIdSubmit={setId} />}
      <div className='info'>
        <Button onClick={()=>isOpen(true)} variant="warning" className="text-white">
          Info
        </Button>

        <Modal show={open} onHide={closeModal}>
          <Info closeModal={closeModal}/>
        </Modal>
      </div>
    </>
  );
}

export default App;
