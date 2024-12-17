export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}