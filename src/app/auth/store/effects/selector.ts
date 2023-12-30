import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/types/appState.interface";
import {AuthStateInterface} from "../../type/authState.inteface";

export const authFeatureSelector = (state:AppStateInterface) => state.auth;

export  const isSubmittingSelector = createSelector(
  authFeatureSelector,
  authState=>authState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface)=> authState.validationErrors)


