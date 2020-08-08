import React, {FC, useState} from 'react';
import {FaCheck, FaTimes} from 'react-icons/fa'

import AuthenticatedScreen from '../AuthenticatedScreen';
import {UserType} from '../../App'
import {formatNumber} from "../../utils/format";

import './AutomatedTeller.scss';

interface AutomatedTellerProps {
  existingUsers: {
    [key: string]: UserType;
  }
  maximumDailyLimit: number;
  updateUserAmount(user: UserType, amount: number): UserType;
}

const keyNumbers = Array.from(Array(9).keys()).map(value => value + 1);

export enum ScreenMode {
  Default = 'Default',
  Withdraw = 'Withdraw',
  Deposit = 'Deposit',
  Balance = 'Balance'
}
const AutomatedTeller: FC<AutomatedTellerProps> = (
  {
    existingUsers: users,
    maximumDailyLimit,
    updateUserAmount
  }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<UserType | null>(null);
  const [withdrawals, setWithdrawals] = useState<{[key: string]: number}>({});

  const [hasError, setHasError] = useState<string>('');
  const [mode, setMode] = useState<ScreenMode>(ScreenMode.Default);
  const [inputValue, setInputValue] = useState<string>('');

  const handleClickNumber = (value: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const newPincode = inputValue + value;
    if (newPincode.length <= 8) {
      setInputValue(inputValue + value);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setHasError('');
    if (authenticatedUser) {
      if (mode === ScreenMode.Default) {
        setAuthenticatedUser(null);
      } else {
        setInputValue('');
        setMode(ScreenMode.Default)
      }
    }
  };

  const handleSubmit = () => {
    if (authenticatedUser) {
      switch (mode) {
        case ScreenMode.Balance:
          setMode(ScreenMode.Default);
          break;
        case ScreenMode.Deposit:
          const newTotal = authenticatedUser.amount += +inputValue;
          updateUserAmount(authenticatedUser, newTotal);
          setMode(ScreenMode.Default);
          break;
        case ScreenMode.Withdraw:
          const withdrawalAmount = parseFloat(inputValue);
          if (withdrawalAmount > authenticatedUser.amount) {
            setHasError(`You have less than this amount in your account.`)
            break;
          }
          if (withdrawals[authenticatedUser.pinCode]) {
            if (withdrawalAmount + withdrawals[authenticatedUser.pinCode] > maximumDailyLimit) {
               setHasError(`Maximum daily withdrawal limit: ${formatNumber(maximumDailyLimit)}`)
            } else {
              setWithdrawals({
                ...withdrawals,
                [authenticatedUser.pinCode]: withdrawalAmount + withdrawals[authenticatedUser.pinCode]
              });
              setAuthenticatedUser(updateUserAmount(authenticatedUser, authenticatedUser.amount-withdrawalAmount))
              setMode(ScreenMode.Default);
            }
          } else {
            if (withdrawalAmount > maximumDailyLimit) {
              setHasError(`Maximum daily withdrawal limit: ${formatNumber(maximumDailyLimit)}`)
            } else {
              setWithdrawals({
                ...withdrawals,
                [authenticatedUser.pinCode]: withdrawalAmount
              });
              setAuthenticatedUser(updateUserAmount(authenticatedUser, authenticatedUser.amount-withdrawalAmount))
              setMode(ScreenMode.Default);
            }
          }
          break;
      }
    } else {
      if (users[inputValue]) {
        setAuthenticatedUser(users[inputValue]);
      } else {
        setHasError('Pin Code Not Found')
      }
    }
    setInputValue('');
  };

  const handleSetMode = (nextMode: ScreenMode) => () => {
    if (authenticatedUser) {
      if (mode === ScreenMode.Default) {
        setMode(nextMode);
        if (nextMode === ScreenMode.Balance) {
          setInputValue(String(authenticatedUser.amount));
        }
      }
    }
  };

  const renderKeypadNumber = (value: number) => {
    return <div key={value} onClick={handleClickNumber(value)} className="interface__key">{value}</div>
  };
  const renderUnauthenticatedScreen = () => {
    return <>
      <div className="interface__line"/>
      <div className="interface__line">Enter Pin Code</div>
      <div className="interface__line">{inputValue.split('').map(() => '*').join('')}</div>
      <div className="interface__line small">{hasError || ''}</div>
    </>
  };
  return <div className="AutomatedTeller">
    <div className="actions">
      <button onClick={handleSetMode(ScreenMode.Withdraw)} className="actions__button"/>
      <button onClick={handleSetMode(ScreenMode.Deposit)} className="actions__button"/>
      <button onClick={handleSetMode(ScreenMode.Balance)} className="actions__button"/>

    </div>
    <div className="interface">

      {authenticatedUser ?
        <AuthenticatedScreen
          input={inputValue}
          hasError={hasError}
          maximumDailyLimit={maximumDailyLimit}
          mode={mode}
          user={authenticatedUser}/> :
        renderUnauthenticatedScreen()}
      <div className="interface__keypad">
        {keyNumbers.map(renderKeypadNumber)}
        <div onClick={handleSubmit}className="interface__key green"><FaCheck/></div>
        <div onClick={handleClickNumber(0)}className="interface__key">0</div>
        <div onClick={handleClear}className="interface__key red"><FaTimes /></div>
      </div>
    </div>
  </div>
};

export default AutomatedTeller
