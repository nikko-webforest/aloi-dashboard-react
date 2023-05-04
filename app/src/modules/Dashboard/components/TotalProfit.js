import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL PROFIT
          </Typography>
          <Typography color="textPrimary" variant="h3">
            $23,200
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className="icon" src="/static/images/custom/profit.svg" />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalProfit;
