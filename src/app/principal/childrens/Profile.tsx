import { useState } from 'react';

import Tabs from '@shared/components/partials/Tabs';
import ProfileForm from '../components/ProfileForm';
import PasswordForm from '../components/PasswordForm';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const profileTabs = ['profile', 'password'];

  const changeTabCallback = (tabIndex: number) => {
    setSelectedTab(profileTabs[tabIndex]);
  };

  return (
    <div className="profile-detail">
      <Tabs tabs={ profileTabs } callback={ changeTabCallback }>
        { selectedTab === 'profile' ? <ProfileForm /> : <PasswordForm /> }
      </Tabs>
    </div>
  )
};

export default Profile;
