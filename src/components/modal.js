import React,{useState} from 'react'
import {Modal } from 'semantic-ui-react'
const ModalClass = ({component: Component, component2: Component2}) => {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Component2/>}
    >
      <Modal.Content>
          <Component setOpen={setOpen}/>
      </Modal.Content>
    </Modal>
  )
}

export default ModalClass;