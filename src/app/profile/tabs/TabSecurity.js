// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import ChangePasswordCard from './security/ChangePasswordCard'

const TabSecurity = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid> 
    </Grid>
  )
}

export default TabSecurity
