// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
import PaymentMethodCard from './billing/PaymentMethodCard'
const TabBilling = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PaymentMethodCard  />
      </Grid>
    </Grid>
  )
}

export default TabBilling
