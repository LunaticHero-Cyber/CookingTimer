import {HomePageProps} from '@/views/HomePage';
import {SplashProps} from '@/views/Splash';
import {StepPageProps} from '@/views/StepPage';

export interface ConfirmPinRouteParams {}

export type RootStackParamList = {
  Splash: SplashProps;
  Home: HomePageProps;
  Step: StepPageProps;
};
