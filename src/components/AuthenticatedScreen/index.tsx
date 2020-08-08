import React, {FC} from 'react';
import {UserType} from '../../App'
import {ScreenMode} from '../AutomatedTeller';
import {formatNumber} from '../../utils/format';

interface AuthenticatedScreenProps {
  hasError: string;
  input: string;
  maximumDailyLimit: number;
  mode: ScreenMode;
  user: UserType
}

const AuthenticatedScreen: FC<AuthenticatedScreenProps> = ({hasError, input, maximumDailyLimit, mode, user}) => {

  const lineOneText = mode === ScreenMode.Default ? '--> Withdraw' : '';
  const lineTwoText = mode === ScreenMode.Default ? '--> Deposit' : mode;
  const lineThreeText = mode === ScreenMode.Default ? '--> Balance' : input ? formatNumber(parseInt(input)) : '';
  const lineFourText = mode === ScreenMode.Default ? `Daily Limit: ${formatNumber(maximumDailyLimit)}` : '';
  return <>
    <div className="interface__line">{lineOneText}</div>
    <div className="interface__line">{lineTwoText}</div>
    <div className="interface__line">{lineThreeText}</div>
    <div className="interface__line small">{hasError || lineFourText}</div>
  </>
};

export default AuthenticatedScreen;
