import React from 'react';
//custom hooks
import useLocalStorage from '../Hooks/useLocalStorage';

//screens
import Login from './Login';
import Dashboard from './Dashboard';

//context
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

function App() {
  const [id,setId] = useLocalStorage('id');
  
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    
      id ? dashboard : <Login onIdSubmit={setId} />

  );
}

export default App;
