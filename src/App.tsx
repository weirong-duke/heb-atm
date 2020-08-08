import React, {useState} from 'react';
import './App.css';
import AutomatedTeller from "./components/AutomatedTeller";

//Pincodes are unique in this situation, usually we would use the credit card number as the "id" of sorts
export interface UserType {
  amount: number;
  name: string;
  pinCode: string;
}

const defaultUsers: {
  maximumDailyLimit: number
  users: {
    [key: string]: UserType
  };
} = {
  maximumDailyLimit: 2500,
  users: {
    "1234": {
      amount: 100,
      name: "Billiam When",
      pinCode: "1234"
    },
    "3333": {
      amount: 200,
      name: "Chedward Bli",
      pinCode: "3333"
    },
    "12345678": {
      amount: -500,
      name: "Gasha Suzlinski",
      pinCode: "12345678"
    }
  }
};


function App() {
  const updateUserAmount = (user: UserType, amount: number) => {
    setExistingUsers({
      ...existingUsers,
      [user.pinCode]: {
        ...user,
        amount
      }
    })
    return {...user, amount}
  };
  const [existingUsers, setExistingUsers] = useState<{[key: string]: UserType}>(defaultUsers.users);
  return (
    <div className="App">
        <AutomatedTeller updateUserAmount={updateUserAmount} existingUsers={existingUsers} maximumDailyLimit={defaultUsers.maximumDailyLimit}/>
    </div>
  );
}

export default App;
