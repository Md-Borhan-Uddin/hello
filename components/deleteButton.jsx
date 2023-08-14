import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { BsTrash3 } from 'react-icons/bs';

function DeleteButton({handleDelete,id}) {
    const {
        isOpen,
        onClose,
        onOpen
      } = useDisclosure();
  return (
    <>
        <Button
            aria-label="deletebtn"
            icon={<BsTrash3 />}
            onClick={onOpen}
            colorScheme="red"
        >
            Delete
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Do You want to Delete
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>Cancel</Button>
                
                <Button type='submit' colorScheme='red' onClick={()=>{handleDelete(id);onClose()}} p={2}>Delete</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}

export default DeleteButton;