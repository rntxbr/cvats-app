import { ExpanderWithHeightTransition } from "components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
  ShowForm,
} from "lib/redux/settingsSlice";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  LightBulbIcon,
  WrenchIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "lib/redux/resumeSlice";

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
  <div className="relative">
    <div className="absolute -right-2 -top-2 h-full w-full rounded-xl border-4 border-black bg-yellow-200"></div>
    <section
      className={`relative z-10 flex flex-col gap-3 rounded-xl border-4 border-black bg-white p-6 pt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-opacity duration-200 ${className}`}
    >
      {children}
    </section>
  </div>
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
      className={`transition-opacity duration-200 ${
        showForm ? "pb-6" : "pb-2 opacity-60"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <Icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          <input
            type="text"
            className="block w-full rounded-lg border-2 border-transparent bg-transparent px-2 py-1 text-lg font-bold tracking-wide text-gray-900 outline-none transition-all hover:border-gray-300 hover:bg-gray-50 focus:border-black focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-0.5">
          {!isFirstForm && (
            <MoveIconButton type="up" onClick={handleMoveClick} />
          )}
          {!isLastForm && (
            <MoveIconButton type="down" onClick={handleMoveClick} />
          )}
          <ShowIconButton show={showForm} setShow={setShowForm} />
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        {children}
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => {
              dispatch(addSectionInForm({ form }));
            }}
            className="group relative inline-flex"
          >
            <div className="absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black bg-green-300"></div>
            <div className="relative z-10 flex items-center rounded-lg border-3 border-black bg-white py-2 pl-3 pr-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <PlusSmallIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
              <span className="text-sm font-bold text-gray-900">{addButtonText}</span>
            </div>
          </button>
        </div>
      )}
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
      {idx !== 0 && (
        <div className="mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
      )}
      <div className="relative grid grid-cols-6 gap-3">
        {children}
        <div className={`absolute right-0 top-0 flex gap-0.5 `}>
          <div
            className={`transition-all duration-300 ${
              showMoveUp ? "" : "invisible opacity-0"
            } ${showMoveDown ? "" : "-mr-6"}`}
          >
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showMoveDown ? "" : "invisible opacity-0"
            }`}
          >
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showDelete ? "" : "invisible opacity-0"
            }`}
          >
            <DeleteIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
