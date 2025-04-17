import { useState } from 'react';

import Tabs from '@shared/components/partials/Tabs';
import ProfileForm from '../components/ProfileForm';
import PasswordForm from '../components/PasswordForm';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const profileTabs = ['profile', 'password'];
  const tabs = [
    {
      name: 'profile',
      children: <ProfileForm />,
    },
    {
      name: 'password',
      children: <PasswordForm />,
    },
  ];

  const changeTabCallback = (tabIndex: number) => {
    setSelectedTab(profileTabs[tabIndex]);
  };

  return (
    <div className="flex flex-col max-w-[100vw] w-[500px] mx-auto">
      <Tabs tabs={tabs} callback={changeTabCallback} />
    </div>
  );
};

export default Profile;
