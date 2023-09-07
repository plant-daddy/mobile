import { useState } from 'react'

export const useModal = (initialState?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState ?? false)

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return { isOpen, onOpen, onClose, onToggle }
}
