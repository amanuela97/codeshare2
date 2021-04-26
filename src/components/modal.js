import React,{useState} from 'react'
import { Button, Modal } from 'semantic-ui-react'
const ModalClass = ({component: Component}) => {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Content>
          <Component setOpen={setOpen}/>
      </Modal.Content>
    </Modal>
  )
}

export default ModalClass;