import {
  Box,
  Modal,
  Button,
  Link as LinkMUI,
  Container,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  TextField,
  Typography,
  FormControl
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { withAloi } from "ui";

const Search = (props) => {
  const { search, updateSearch, clearData, onSubmit, hideTransaction = false } = props;
  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "1em", marginBottom: "1em" }}>
        {!hideTransaction ? (
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <TextField
              fullWidth
              label="Search Transaction ID"
              variant="outlined"
              value={search.transactionId}
              onChange={(data) => {
                updateSearch("transactionId", data.target.value);
              }}
            />
          </FormControl>
        ) : (
          ""
        )}
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <TextField
            fullWidth
            label="Filter Path"
            variant="outlined"
            value={search.path}
            onChange={(data) => {
              updateSearch("path", data.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel> HTTP Method </InputLabel>
          <Select
            id="http-method"
            value={search.httpMethod}
            onChange={(data) => updateSearch("httpMethod", data.target.value)}>
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
            <MenuItem value="OTHER">OTHER</MenuItem>
            <MenuItem value="CONNECT">CONNECT</MenuItem>
            <MenuItem value="HEAD">HEAD</MenuItem>
            <MenuItem value="OPTIONS">OPTIONS</MenuItem>
            <MenuItem value="PATCH">PATCH</MenuItem>
            <MenuItem value="TRACE">TRACE</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <TextField
            fullWidth
            label="HTTP Status Code"
            variant="outlined"
            value={search.httpStatus}
            onChange={(data) => {
              updateSearch("httpStatus", data.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel> Response Time </InputLabel>
          <Select
            id="response-time"
            value={search.responseTime}
            onChange={(data) => updateSearch("responseTime", data.target.value)}>
            <MenuItem value="0">0 to 100ms</MenuItem>
            <MenuItem value="1">100 to 200ms</MenuItem>
            <MenuItem value="2">200 to 300ms</MenuItem>
            <MenuItem value="3">300 to 400ms</MenuItem>
            <MenuItem value="4">400 to 500ms</MenuItem>
            <MenuItem value="5">> 500ms</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "1em", marginBottom: "1em" }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <DatePicker
              label="From"
              value={search.from}
              onChange={(newValue) => {
                updateSearch("from", newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <DatePicker
              label="To"
              value={search.to}
              onChange={(newValue) => {
                updateSearch("to", newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </LocalizationProvider>
        <FormControl sx={{ marginLeft: 1, minWidth: 120 }}>
          <Button variant="contained" sx={{ marginTop: "1em", textTransform: "capitalize" }} onClick={() => onSubmit()}>
            {" "}
            Search{" "}
          </Button>
        </FormControl>
        <FormControl sx={{ marginLeft: 2, minWidth: 130 }}>
          <Button
            variant="outlined"
            sx={{
              marginTop: "1em",
              borderColor: "#674ABE !important",
              borderWidth: "1px",
              paddingTop: "7px",
              paddingBottom: "7px",
              color: "#674ABE",
              textTransform: "capitalize",
              fontWeight: "medium",
              borderRadius: "50px",
              "&:hover": {
                borderColor: "##674ABE !important",
                color: "##674ABE"
              }
            }}
            onClick={() => clearData()}>
            {" "}
            Reset Filter{" "}
          </Button>
        </FormControl>
      </Grid>
    </>
  );
};

export default withAloi(Search);
