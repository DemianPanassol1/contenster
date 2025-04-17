interface ToastProps {
  anchorOrigin: {
    horizontal: 'right' | 'left' | 'center';
    vertical: 'top' | 'bottom';
  };
  action: (snackId: string | number) => JSX.Element;
}
