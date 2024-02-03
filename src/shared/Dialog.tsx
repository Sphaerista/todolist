import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Dialog as Dial } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";

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
  selectedPriority?: {
    name: string;
    key: string;
  };
  setSelectedPriority?: React.Dispatch<
    React.SetStateAction<{
      name: string;
      key: string;
    }>
  >;
  tagPriorityList?: {
    name: string;
    key: string;
  }[];
  onSubmition: (e: any) => void;
}

const Dialog: React.FC<DialogProps> = /* istanbul ignore next */ (props) => {
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
    selectedPriority,
    setSelectedPriority,
    tagPriorityList,
  } = props;

  const trashComp = (
    <>
      {trashDial && (
        <Dial
          data-testid="dialog"
          header={header}
          visible={visible}
          draggable={false}
          resizable={false}
          style={{ width: "20rem" }}
          onHide={() => visibleOffFunc()}
        >
          <div className="dial_btns_remove">
            <Button
              data-testid="dial_btn_remove"
              className="dial_btn_remove"
              label="Yes"
              severity="danger"
              onClick={onSubmition}
            />
            <Button
              data-testid="dial_btn_remove_no"
              label="No"
              onClick={visibleOffFunc}
            />
          </div>
        </Dial>
      )}
    </>
  );

  const tagRadioBtn =
    tagPriorityList && selectedPriority && setSelectedPriority;

  return (
    <>
      {trashDial ? (
        trashComp
      ) : (
        <Dial
          data-testid="dial"
          header={header}
          visible={visible}
          draggable={false}
          resizable={false}
          style={{ width: "20rem" }}
          onHide={() => visibleOffFunc()}
        >
          <form>
            <InputText
              data-testid="input_in_dialog"
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={placeholder}
            />
            <Button
              data-testid="submission_button"
              label={submitButtonLabel}
              onClick={onSubmition}
              disabled={!newName}
            />
            {tagRadioBtn && (
              <div className="radioBtnCard">
                <div className="radioBtnFlex">
                  {tagPriorityList.map((priority) => {
                    return (
                      <div key={priority.key} className="radioaBtnItem">
                        <RadioButton
                          data-testid="radio_button"
                          inputId={priority.key}
                          name="category"
                          value={priority}
                          onChange={(e) => setSelectedPriority(e.value)}
                          checked={selectedPriority.key === priority.key}
                        />
                        <label htmlFor={priority.key} className="ml-2">
                          {priority.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </form>
        </Dial>
      )}
    </>
  );
};
export default Dialog;
