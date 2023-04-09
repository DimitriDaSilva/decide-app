import clsx from 'clsx';
import toast from 'react-hot-toast';

type ToastProps = {
  message: string;
  visible: boolean;
  className?: string;
};

const Toast = ({ message, visible, className }: ToastProps) => (
  <p
    className={clsx(
      'px-6 py-4 text-justify shadow-md rounded-sm w-96',
      visible ? 'animate-enter' : 'animate-leave',
      className,
    )}
  >
    {message}
  </p>
);

const triggerErrorToast = (message: string) =>
  toast.custom(
    (t) => (
      <Toast
        message={message}
        visible={t.visible}
        className="bg-secondary-hover"
      />
    ),
    {
      position: 'top-right',
    },
  );

export { triggerErrorToast };
