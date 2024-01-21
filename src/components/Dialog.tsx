import React from "react";
import { Button } from "primereact/button";
import { Dialog as Dial } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export interface DialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  sameName?: string;
  label_button: string;
  header: string;
  placeholder: string;
  submitButtonLabel: string;
  onSubmit: () => void;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    visible,
    setVisible,
    newName,
    setNewName,
    sameName,
    label_button,
    header,
    placeholder,
    submitButtonLabel,
    onSubmit,
  } = props;

  return (
    <>
      <Button
        label={label_button}
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dial
        header={header}
        visible={visible}
        draggable={false}
        resizable={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <InputText
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={placeholder}
        />
        {sameName && <Message severity="error" text={sameName} />}

        <Button
          icon="pi pi-tags"
          label={submitButtonLabel}
          onClick={onSubmit}
        />
      </Dial>
      {/* tag dialog */}
    </>
  );
};
export default Dialog;
