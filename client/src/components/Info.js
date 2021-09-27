import React from 'react'
import { Modal } from 'react-bootstrap'
export default function Info({ closeModal}) {
  return (
    <div>
      <React.Fragment>
      <Modal.Header closeButton>How To Use application</Modal.Header>
      <Modal.Body>
        <ul>
          <li>First Add new Contacts.</li>
          <li>Then You can start a new conversation with the new users.</li>
          <li>You can chat individually or in group as you like.</li>
          <li>Your <strong>ID</strong> is the <i>key</i> for the conversation.</li>
        </ul>
      </Modal.Body>
    </React.Fragment>
    </div>
  )
}
