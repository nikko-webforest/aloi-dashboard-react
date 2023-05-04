import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const TotalCustomers = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL CUSTOMERS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            1,600
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className="icon" src="/static/images/custom/customers.svg" />
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          pt: 2
        }}>
        <ArrowUpwardIcon />
        <Typography variant="body2">16%</Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default TotalCustomers;
