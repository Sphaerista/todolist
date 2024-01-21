import React from "react";
import { Button } from "primereact/button";
import { Dialog as Dial } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export interface DialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visibleOffFunc: () => void;
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  sameName?: string;
  label_button: string;
  header: string;
  placeholder: string;
  submitButtonLabel: string;
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
  } = props;

  return (
    <>
      <Dial
        header={header}
        visible={visible}
        draggable={false}
        resizable={false}
        style={{ width: "50vw" }}
        onHide={() => visibleOffFunc()}
      >
        <form>
          <InputText
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={placeholder}
          />
          {sameName && <Message severity="error" text={sameName} />}
          <Button label={submitButtonLabel} onClick={onSubmition} />
        </form>
      </Dial>
    </>
  );
};
export default Dialog;
