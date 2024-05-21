import { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

import CloseIcon from '@assets/icons/close.svg?react';

import { DialogContext, DialogData } from '@shared/contexts/dialog.context';
import DIALOG_TYPE from '@shared/constants/dialog-types';

const Dialog = ({ dialog, closeDialog }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);

  useEffect(() => {
    return () => {
      setRequestingAPI(false);
    };
  }, []);

  const handleConfirmButton = () => {
    if (dialog?.confirmHandler) {
      dialog.confirmHandler();
    }
    if (!dialog?.pendingCloseDialog) {
      closeDialog();
    } else {
      setRequestingAPI(true);
    }
  };

  const handleCloseDialog = () => {
    if (dialog?.type !== DIALOG_TYPE.ALERT) {
      if (dialog?.cancelHandler) {
        dialog?.cancelHandler();
      }
      closeDialog();
    }
  };

  // Block close popup when click on modal content
  const handleChildClick = (e) => e.stopPropagation();

  return (
    createPortal(
      <div className="dialog-wrapper">
        <div className="dialog">
          <div className="dialog-header">
            <h6 className="dialog-title">
              Dialog Title
            </h6>
            <button className="btn btn-circle btn-close" onClick={ handleCloseDialog }>
              <CloseIcon />
            </button>
          </div>
          <div className="dialog-body">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam doloremque aliquam eos aperiam consequatur earum iste blanditiis modi numquam voluptatibus consectetur adipisci quidem, sequi optio. Quisquam obcaecati corporis error hic.</p>
          </div>
          <div className="dialog-footer">
            <button className="btn btn-outline mr-2" onClick={ handleCloseDialog }>
              Cancel
            </button>
            <button className="btn btn-primary">
              Ok
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}

const DialogProvider = (props) => {
  const [dialog, setDialog] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setDialog([]);
  }, [location]);

  useEffect(() => {
    if (dialog.length) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [dialog.length]);

  const addDialog = (newDialog: DialogData) => {
    setDialog([...dialog, ...[newDialog]]);
  };

  const closeDialog = () => {
    setDialog((prev) => {
      let newArr;
      if (prev?.length > 1) {
        newArr = prev.splice(0, 1);
      } else {
        newArr = [];
      }
      return newArr;
    });
  };

  const closeDialogByIndex = (ind) => {
    setDialog(prev => {
      return prev[ind] ? prev.splice(ind + 1, 1) : prev;
    });
  };

  return (
    <DialogContext.Provider value={{ dialog, addDialog, closeDialog, closeDialogByIndex }} { ...props }>
      { props.children }
      <Suspense fallback={<></>}>
        {
          !!dialog?.length &&
          dialog?.map((d, ind) => (
            <Dialog key={ind} dialog={d} closeDialog={closeDialog} />
          ))
        }
      </Suspense>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
