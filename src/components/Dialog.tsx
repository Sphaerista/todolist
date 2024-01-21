import React from "react";
import { Button } from "primereact/button";
import { Dialog as Dial } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export interface DialogProps {
  visible: boolean;
  visibleOffFunc: () => void;
  newName?: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  sameName?: string;
  header: string;
  placeholder?: string;
  submitButtonLabel: string;
  trashDial?: boolean;
  onSubmition: (e: any) => void;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    visible,
    visibleOffFunc,
    newName,
    setNewName,
    sameName,
    header,
    placeholder,
    submitButtonLabel,
    onSubmition,
    trashDial,
  } = props;

  const trashComp = (
    <>
      {trashDial && (
        <Dial
          header={header}
          visible={visible}
          draggable={false}
          resizable={false}
          style={{ width: "30vw" }}
          onHide={() => visibleOffFunc()}
        >
          <div className="dial_btns_remove">
            <Button
              className="dial_btn_remove"
              label="Yes"
              severity="danger"
              onClick={onSubmition}
            />
            <Button label="No" onClick={visibleOffFunc} />
          </div>
        </Dial>
      )}
    </>
  );

  return (
    <>
      {trashDial ? (
        trashComp
      ) : (
        <Dial
          header={header}
          visible={visible}
          draggable={false}
          resizable={false}
          style={{ width: "30vw" }}
          onHide={() => visibleOffFunc()}
        >
          <form>
            {sameName && <Message severity="error" text={sameName} />}
            <InputText
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={placeholder}
            />
            <Button label={submitButtonLabel} onClick={onSubmition} />
          </form>
        </Dial>
      )}
    </>
  );
};
export default Dialog;
