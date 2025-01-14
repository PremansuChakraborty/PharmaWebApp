// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// export default function ScrollCategory() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ bgcolor: 'background.paper', boxShadow: 10 }}>

//       <Tabs
//         value={value}
//         onChange={handleChange}
//         variant="scrollable"
//         scrollButtons={false}
//         aria-label="scrollable prevent tabs example"
//       >
//         <Tab label="Item All" />
//         <Tab label="Item Two" />
//         <Tab label="Item Three" />
//         <Tab label="Item Four" />
//         <Tab label="Item Five" />
//         <Tab label="Item Six" />
//         <Tab label="Item Seven" />
//         <Tab label="Item Two" />
//         <Tab label="Item Three" />
//         <Tab label="Item Four" />
//         <Tab label="Item Five" />
//         <Tab label="Item Six" />
//         <Tab label="Item Seven" />
//         <Tab label="Item Two" />
//         <Tab label="Item Three" />
//         <Tab label="Item Four" />
//         <Tab label="Item Five" />
//         <Tab label="Item Six" />
//         <Tab label="Item Seven" />
//         <Tab label="Item Two" />
//         <Tab label="Item Three" />
//         <Tab label="Item Four" />
//         <Tab label="Item Five" />
//         <Tab label="Item Six" />
//         <Tab label="Item Seven" />
//       </Tabs>
//     </Box>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Carousel } from './Carousel'
import Medicines from './Medicines';
import Ambulance from './Ambulence';
import Emergency from './Emergency';
import Doctors from './Doctors';
export default function ScrollCategory() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}  className='flex justify-center'>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Medicines" value="1" />
            <Tab label="Doctors" value="2" />
            <Tab label="Emergency" value="3" />
            <Tab label="Ambulance" value="4" />
          </TabList>
        </Box>
        <Carousel/>
        <TabPanel value="1"><Medicines/></TabPanel>
        <TabPanel value="2"><Doctors/></TabPanel>
        <TabPanel value="3"><Emergency/></TabPanel>
        <TabPanel value="4"><Ambulance/></TabPanel>
      </TabContext>
    </Box>
  );
}
