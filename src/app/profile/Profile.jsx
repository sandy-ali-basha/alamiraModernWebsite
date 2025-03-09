
// ** Third Party Imports
import AccountSettings from './tabs/AccountSettings';
import { useParams } from 'react-router-dom';

const Profile =  () => {
  const params = useParams()

  return (
    <AccountSettings tab={params.tab}  />
  );
};

export default Profile;
