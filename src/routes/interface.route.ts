import {HomePageProps} from '@/views/HomePage';
import {StepPageProps} from '@/views/StepPage';

export interface ConfirmPinRouteParams {}

export type RootStackParamList = {
  Home: HomePageProps;
  Step: StepPageProps;
};
