import { createContext, useContext } from 'react';

export interface DialogData {
  type: string;
  title?: any;
  content: any; // Can be string or a component
  button?: {
    ok?: string,
    cancel?: string
  };
  confirmHandler?: any; // Function you want handle when click confirm button
  cancelHandler?: any; // Function you want handle when close dialog
  isDisabled?: boolean; // Button diable condition
  isLoading?: boolean; // Button loading condition,
  alignContent?: 'center' | 'left';
  class?: string;
  hasCloseIcon?: boolean;
  containComponent?: boolean;
  dialogSize?: 'lg' | 'md' | 'sm' | 'full';
  verticallyTop?: boolean;
  btnConfirmClass?: '';
  btnCancelClass?: '';
  pendingCloseDialog?: boolean;
}

export const DialogContext = createContext({
  dialog: [],
  addDialog: (data) => data,
  closeDialog: () => true,
  closeDialogByIndex: (ind) => ind
});

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context) {
    return context;
  }
};
