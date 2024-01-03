export interface FormProgress {
  onNextStep?: () => void;
  onPrevStep?: () => void;
  onSubmit?: () => void;
}
