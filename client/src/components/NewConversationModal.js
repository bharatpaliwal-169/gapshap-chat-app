import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()
    console.log(selectedContactIds);
    if(selectedContactIds.length <= 0) {
      window.alert("Please add contacts to the chat")
    }
    else{
      createConversation(selectedContactIds)
    }
    closeModal()
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds(oldSelectedContactIds => {
      if (oldSelectedContactIds.includes(contactId)) {
        return oldSelectedContactIds.filter(prevId => {
          return (contactId !== prevId)
        })
      } else {
        return [...oldSelectedContactIds, contactId]
      }
    })

  }

  return (
    <React.Fragment>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </React.Fragment>
  )
}
