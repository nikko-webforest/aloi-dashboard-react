import Layout from "../../../components/dashboard/Layout";
import {
  Box,
  Modal,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  Snackbar
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withAloi } from "ui";
import CircularProgress from "@mui/material/CircularProgress";

const Job = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const [requestJob, setrequestJob] = useState({});
  const [jobName, setJobName] = useState("");
  const { connector_name } = useParams();
  const [toast, setToast] = useState({
    runJob: false,
    open: false,
    message: ""
  });
  const [data, setData] = useState({
    loading: true,
    page: 1,
    pageSize: 100,
    rows: [],
    rowsPerPageOptions: [50, 100, 150, 200],
    totalRows: 0
  });

  const updateData = (k, v) => {
    setData((data) => ({ ...data, [k]: v }));
  };

  const handleOpen = (data) => {
    setJobName(data);
  };

  const requestOption = {
    method: "GET",
    headers: {
      HOST: "https://api.aloi.io/",
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      Authorization: "Bearer " + _accessToken
    }
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100 },
    {
      field: "job",
      headerName: "Job",
      width: 200
    },
    {
      field: "Actions",
      headerName: "Actions",
      sortable: false,
      flex: 2,
      type: "actions",
      getActions: (params) => [
        <Button key={1} onClick={() => handleOpen(params.row.job)}>
          View
        </Button>,
        <Button key={2} disabled={toast.runJob} onClick={() => handleRun(params.row.job, connector_name)}>
          Run
        </Button>
      ]
    }
  ];

  const toISOConverter = (date) => {
    return new Date(date).toISOString();
  };

  const addTime = (unit, every, date) => {
    switch (unit) {
      case "MONTHS":
        return toISOConverter(date.setMonth(date.getMonth() + every));
        break;
      case "WEEKS":
        return toISOConverter(date.setDate(date.getDate() + every * 7));
        break;
      case "DAYS":
        return toISOConverter(date.setDay(date.getDay() + every));
        break;
      case "HOURS":
        return toISOConverter(date.setHour(date.getHour() + every));
        break;
      case "MINUTES":
        return toISOConverter(date.setMinutes(date.getMinutes() + every));
        break;
      default:
        return toISOConverter(date.setMinutes(date.getMinutes() + every));
        break;
    }
  };

  const runJob = async (data) => {
    const job = await fetch(`https://api.aloi.io/jobs/${data.connectorName}/${data.job}`, requestOption)
      .then((data) => data.json())
      .then((resp) => resp);

    const date = new Date();
    const payload = `jobName=${data.job}&actualFireTime=${date.toISOString()}&nextFireTime=${addTime(
      job.units,
      job.every,
      date
    )}&scheduledFireTime=${toISOConverter(job.nextRunTime)}&previousFireTime=${toISOConverter(job.lastRunTime)}`;

    const getOption = {
      ...requestOption,
      method: "POST",
      body: new URLSearchParams(payload)
    };
    setToast({ ...toast, runJob: false, open: true, message: `Done running job - ${data.job}` });
    return fetch(
      `https://gateway.aloi.io/${props.keycloak.realm}/${data.connectorName}/api/.aloi/execute_job/${data.job}`,
      getOption
    ).then((resp) => resp);
  };

  const handleRun = (job, connectorName) => {
    setToast({ ...toast, runJob: true, message: `Running - ${job}`, open: true });
    runJob({ job, connectorName });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  useEffect(() => {
    updateData("loading", true);
    setTimeout(() => {
      fetch(`https://api.aloi.io/jobs/${connector_name}`, requestOption)
        .then((data) => data.json())
        .then((result) => {
          if (result === undefined) return;
          updateData("rowCount", result.length);

          setTimeout(() => {
            const data = result.map((data, id) => {
              return { ...data, id: id + 1 };
            });

            updateData("rows", data);
            updateData("loading", false);
          }, 100);
        });
    }, 500);
  }, [data.page, data.pageSize]);

  useEffect(() => {
    fetch(`https://api.aloi.io/jobs/${connector_name}/${jobName}`, requestOption)
      .then((data) => data.json())
      .then((data) => {
        setrequestJob(data);
      });
  }, [jobName]);

  return (
    <Layout>
      <title> Job {jobName} | Jive Dashboard </title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={toast.open}
          onClose={() => setToast({ ...toast, open: false })}
          message={toast.message}
          key={{ vertical: "bottom", horizontal: "center" }}
        />
        {jobName && (
          <>
            <Modal
              open={jobName !== "" ? true : false}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5">
                  {jobName}
                </Typography>
                {Object.keys(requestJob).length === 0 ? (
                  <CircularProgress />
                ) : (
                  <>
                    <p>
                      {" "}
                      <strong>Connector: </strong> {requestJob.connector}
                    </p>
                    <p>
                      {" "}
                      <strong> Job: </strong> {requestJob.job}
                    </p>
                    <p>
                      <strong> Every: </strong> {requestJob.every} {requestJob.unit}
                    </p>
                    <p>
                      {" "}
                      <strong> First Run Time: </strong> {requestJob.firstRunTime}
                    </p>
                    <p>
                      {" "}
                      <strong> Last Run Time: </strong> {requestJob.lastRunTime}
                    </p>
                    <p>
                      {" "}
                      <strong> Next Run Time: </strong> {requestJob.nextRunTime}
                    </p>
                  </>
                )}
              </Box>
            </Modal>
          </>
        )}
        <Container maxWidth={false}>
          <Typography color="textPrimary" variant="h4">
            {connector_name}
          </Typography>
          <hr />
          <br />
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              autoHeight
              checkboxSelection={false}
              columns={columns}
              hideFooterSelectedRowCount={true}
              loading={data.loading}
              page={data.page - 1}
              pageSize={data.pageSize}
              rows={data.rows}
              rowCount={data.rowCount}
              rowsPerPageOptions={data.rowsPerPageOptions}
              onPageChange={(data) => {
                updateData("page", data + 1);
              }}
              onPageSizeChange={(data) => {
                updateData("page", 1);
                updateData("pageSize", data);
              }}
              paginationMode={"server"}
            />
          </div>
        </Container>
      </Box>
    </Layout>
  );
};

export default withAloi(Job);
