import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  LightBulbIcon,
  PencilSquareIcon,
  PlusSmallIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "@/app/lib/redux/resumeSlice";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  type ShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
} from "@/app/lib/redux/settingsSlice";
import { IconButton } from "@/components/Button";
import { ExpanderWithHeightTransition } from "@/components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "@/components/ResumeForm/Form/IconButton";

/**
 * BaseForm is the bare bone form, i.e. just the outline with no title and no control buttons.
 * ProfileForm uses this to compose its outline.
 */
export const BaseForm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`flex min-w-0 flex-col gap-4 rounded-2xl border border-[#28584c]/10 bg-white p-4 sm:p-5 transition-opacity duration-200 ${className || ""}`}
  >
    {children}
  </section>
);

const FORM_TO_ICON: { [section in ShowForm]: typeof BuildingOfficeIcon } = {
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
};

export const Form = ({
  form,
  addButtonText,
  children,
}: {
  form: ShowForm;
  addButtonText?: string;
  children: React.ReactNode;
}) => {
  const [renaming, setRenaming] = useState(false);
  const showForm = useAppSelector(selectShowByForm(form));
  const heading = useAppSelector(selectHeadingByForm(form));

  const dispatch = useAppDispatch();
  const setShowForm = (showForm: boolean) => {
    dispatch(changeShowForm({ field: form, value: showForm }));
  };
  const setHeading = (heading: string) => {
    dispatch(changeFormHeading({ field: form, value: heading }));
  };

  const isFirstForm = useAppSelector(selectIsFirstForm(form));
  const isLastForm = useAppSelector(selectIsLastForm(form));

  const handleMoveClick = (type: "up" | "down") => {
    dispatch(changeFormOrder({ form, type }));
  };

  const Icon = FORM_TO_ICON[form];

  return (
    <BaseForm
      className={`transition-opacity duration-200 ${showForm ? "pb-6" : "pb-2 opacity-60"}`}
    >
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 text-sm font-semibold text-[#28584c]">
          <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 break-words">{heading}</span>
          <ChevronDownIcon
            className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="my-3 flex items-center justify-end gap-2">
          <div className="flex items-center gap-0.5">
            <IconButton
              tooltipText="Renomear seção"
              aria-pressed={renaming}
              onClick={() => setRenaming(!renaming)}
            >
              <PencilSquareIcon className="h-5 w-5 text-gray-500" />
            </IconButton>
            {!isFirstForm && <MoveIconButton type="up" onClick={handleMoveClick} />}
            {!isLastForm && <MoveIconButton type="down" onClick={handleMoveClick} />}
            <ShowIconButton show={showForm} setShow={setShowForm} />
          </div>
        </div>
        {renaming && (
          <input
            type="text"
            aria-label={`Título da seção ${heading}`}
            className="mb-4 block w-full rounded-lg border border-[#28584c]/20 p-2 text-sm"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        )}
        <ExpanderWithHeightTransition expanded={showForm}>{children}</ExpanderWithHeightTransition>
        {showForm && addButtonText && (
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => {
                dispatch(addSectionInForm({ form }));
              }}
              className="cursor-pointer flex items-center rounded-md bg-[#f1eee1] py-2 pl-3 pr-4 text-sm font-semibold text-[#28584c] "
            >
              <PlusSmallIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              {addButtonText}
            </button>
          </div>
        )}
      </details>
    </BaseForm>
  );
};

export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}: {
  form: ShowForm;
  idx: number;
  showMoveUp: boolean;
  showMoveDown: boolean;
  showDelete: boolean;
  deleteButtonTooltipText: string;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }));
  };
  const handleMoveClick = (direction: "up" | "down") => {
    dispatch(moveSectionInForm({ form, direction, idx }));
  };

  return (
    <>
      {idx !== 0 && <div className="mb-4 mt-6 border-t-2 border-dotted border-gray-200" />}
      {(showMoveUp || showMoveDown || showDelete) && (
        <div className="mb-2 flex justify-end gap-1">
          {showMoveUp && (
            <MoveIconButton type="up" size="small" onClick={() => handleMoveClick("up")} />
          )}
          {showMoveDown && (
            <MoveIconButton type="down" size="small" onClick={() => handleMoveClick("down")} />
          )}
          {showDelete && (
            <DeleteIconButton onClick={handleDeleteClick} tooltipText={deleteButtonTooltipText} />
          )}
        </div>
      )}
      <div className="grid grid-cols-6 gap-3">{children}</div>
    </>
  );
};
