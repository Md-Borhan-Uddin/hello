import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

export default function CustomModal({isOpen,isFooter, onClose, deleteBtnLable,id,handleSave, handleDelete, closeOnOverlayClick,title, saveBtnLabel,cancelBtnLabel, children}) {
  return (
    <Modal closeOnOverlayClick={closeOnOverlayClick} isOpen={isOpen} onClose={onClose} id={id}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {children}
            </ModalBody>
            {isFooter && <ModalFooter>
                {cancelBtnLabel && <Button colorScheme='blue' mr={3} onClick={onClose}>{cancelBtnLabel}</Button>}
                {saveBtnLabel && <Button type='submit' colorScheme='teal' onClick={handleSave} variant="outline" p={2}>{saveBtnLabel}</Button>}
                {deleteBtnLable && <Button type='submit' colorScheme='red' onClick={handleDelete} p={2}>{deleteBtnLable}</Button>}
            </ModalFooter>}
        </ModalContent>
    </Modal>
  )
}
