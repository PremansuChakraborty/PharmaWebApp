import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Carousel } from './Carousel';
import Medicines from './Medicines';
import Ambulance from './Ambulance';
import Emergency from './Emergency';
import Doctors from './Doctors';
import UserContext from '../Context/User/UserContext';
import AddDoctor from '../Pages/AddDoctor';
import AddMedicine from '../Pages/AddMedicine';
import AddAmbulance from '../Pages/AddAmbulance';
import { useNavigate } from 'react-router-dom';

export default function ScrollCategory() {
  const [value, setValue] = React.useState('1');
  const { UserDetails } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Redirect when "Medical AI Recommendation System" tab is selected
  React.useEffect(() => {
    if (value === '5') {
      window.open('https://medical-recommendation-system-kqw3.onrender.com/predict', '_blank');
      setValue('1'); // Optional: revert to first tab after redirection
    }
    if (value === '10') {
      window.open('https://tracker-iqp8.onrender.com/', '_blank');
      setValue('1'); // Optional: revert to first tab after redirection
    }
    else if (value === '9') {
      window.open(UserDetails.doctorId.doctorJoiningLink, '_blank');
      setValue('1'); // Optional: revert to first tab after redirection
    }
  }, [value]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="overflow-x-auto whitespace-nowrap">
  <TabList
    onChange={handleChange}
    aria-label="lab API tabs example"
    className="flex flex-nowrap justify-start md:justify-center min-w-max"
  >

            <Tab label="Medicines" value="1" />
            <Tab label="Doctors" value="2" />
            <Tab label="Emergency" value="3" />
            <Tab label="Live Ambulance" value="10" />
            <Tab label="Medical AI Recommendation System" value="5" />
            {UserDetails?.profile === 'admin' && <Tab label="Add Doctor" value="6" />}
            {UserDetails?.profile === 'admin' && <Tab label="Add Medicine" value="7" />}
            {UserDetails?.profile === 'admin' && <Tab label="Add Ambulance" value="8" />}
            {UserDetails?.profile === 'doctor' && <Tab label="Go Live" value="9" />}
            <Tab label="Ambulance" value="4" />
          </TabList>
        </Box>

        <Carousel />
        <TabPanel value="1"><Medicines /></TabPanel>
        <TabPanel value="2"><Doctors /></TabPanel>
        <TabPanel value="3"><Emergency /></TabPanel>
        <TabPanel value="4"><Ambulance /></TabPanel>
        <TabPanel value="6"><AddDoctor /></TabPanel>
        <TabPanel value="7"><AddMedicine /></TabPanel>
        <TabPanel value="8"><AddAmbulance /></TabPanel>
      </TabContext>
    </Box>
  );
}
