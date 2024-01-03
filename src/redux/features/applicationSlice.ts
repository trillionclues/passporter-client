import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ApplicationFormState {
  currentStep: number;
  formData: {
    applicationType?: string;
    processingState?: string;
    processingOffice?: string;
    validity?: string;
    bookletType?: string;
  };
  submitted: boolean;
  error: any | { message: string; statusCode?: number };
  isLoading: boolean;
}

const initialState: ApplicationFormState = {
  currentStep: 1,
  formData: {},
  submitted: false,
  error: {},
  isLoading: false,
};

const applicationFromSlice = createSlice({
  name: "applicationForm",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setFormData: (
      state,
      action: PayloadAction<Partial<ApplicationFormState>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSubmitted(state, action: PayloadAction<boolean>) {
      state.submitted = action.payload;
    },
    resetFormData: (state) => {
      state.formData = {};
      state.submitted = false;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = {
        message: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setFormData,
  setStep,
  setSubmitted,
  setError,
  setLoading,
  resetFormData,
} = applicationFromSlice.actions;
export default applicationFromSlice.reducer;
