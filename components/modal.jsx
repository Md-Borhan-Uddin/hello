import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"


export const CustomModal = ({isOpen, onClose,title, children,maxW=null})=> {
    
    return (
      <>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={maxW}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {children}
            </ModalBody>
  
            
          </ModalContent>
        </Modal>
      </>
    )
  }