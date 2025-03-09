// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
import BillingAddressCard from './billing/BillingAddressCard'

const TabAddresses = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <BillingAddressCard />
      </Grid>
    </Grid>
  )
}

export default TabAddresses
