import Swal, { SweetAlertIcon } from 'sweetalert2';

interface SwalProps {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  timer?: number;
}

export const SwalMessage = ({ title, text = '', icon = 'info', timer }: SwalProps) => {
  return Swal.fire({
    title,
    text,
    icon,
    timer,
    showConfirmButton: !timer,
  });
};
