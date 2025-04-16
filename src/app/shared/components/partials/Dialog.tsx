import { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

import CloseIcon from '@assets/icons/close.svg?react';
import LoaderIcon from '@assets/icons/loader.svg?react';

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
    if (dialog?.pendingCloseDialog) {
      setRequestingAPI(true);
    } else {
      closeDialog();
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

  return createPortal(
    <div className="dialog-wrapper">
      <div className="dialog">
        <div className="dialog-header">
          {typeof dialog.title === 'string' ? (
            <h6
              className="dialog-title"
              dangerouslySetInnerHTML={{ __html: dialog.title }}
            />
          ) : (
            dialog.title
          )}
          <button
            className="btn btn-circle btn-close"
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="dialog-body">
          {dialog.containComponent ? (
            dialog.content
          ) : (
            <p dangerouslySetInnerHTML={{ __html: dialog.content }} />
          )}
        </div>
        {dialog.button && (
          <div className="dialog-footer">
            {dialog.button.cancel && (
              <button
                className="btn btn-outline mr-2"
                onClick={handleCloseDialog}
              >
                {dialog.button.cancel}
              </button>
            )}
            {dialog.button.ok && (
              <button className="btn btn-primary" onClick={handleConfirmButton}>
                {requestingAPI ? (
                  <LoaderIcon className="inline w-4 h-4 me-3 animate-spin" />
                ) : (
                  dialog.button.ok
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

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
    setDialog((prev) => {
      return prev[ind] ? prev.splice(ind + 1, 1) : prev;
    });
  };

  return (
    <DialogContext.Provider
      value={{ dialog, addDialog, closeDialog, closeDialogByIndex }}
      {...props}
    >
      {props.children}
      <Suspense fallback={<></>}>
        {!!dialog?.length &&
          dialog?.map((d, ind) => (
            <Dialog key={ind} dialog={d} closeDialog={closeDialog} />
          ))}
      </Suspense>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
