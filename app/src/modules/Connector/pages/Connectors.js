import Layout from "../../../components/dashboard/Layout";
import { Box, Container, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { withAloi } from "ui";
import ModalAloi from "../../utils/Modal";
// @ts-ignore
import jiveBorder from "../../icons/custom/tableHeadBorder.svg";

const Connectors = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [cleanRows, setCleanRows] = useState([]);

  const [data, setData] = useState({
    message: "",
    disabled: false,
    open: false,
    loading: true,
    connectorName: "",
    connectorTitle: ""
  });
  const { connector_name } = useParams();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      height: 100,
      renderCell: (params) => (
        <>
          <div>
            <Typography variant="subtitle2">{params.row.title}</Typography>
            <Typography variant="body2">{params.row.id}</Typography>
          </div>
        </>
      ),
      sortComparator: (v1, v2, p1, p2) => p1.id.localeCompare(p2.id)
    },
    { field: "version", headerName: "Version", flex: 1 },
    {
      field: "col2  ",
      headerName: "Apps",
      width: 350,
      renderCell: (params) => {
        const sec = params.row.apps.map((data, key) => data.name).join(", ");
        return <Typography sx={{ whiteSpace: "pre-wrap" }}>{sec}</Typography>;
      },
      sortable: false
    },
    {
      field: "option",
      headerName: "Options",
      type: "actions",
      flex: 4,
      sortable: false,
      getActions: (params) => [
        <Button key={1} href={`/app/connectors/${params.id}`} color="secondary" sx={{ textTransform: "capitalize" }}>
          View Apps
        </Button>,
        <Button key={2} href={`/app/connectors/${params.id}/logs`} color="primary" sx={{ textTransform: "capitalize" }}>
          View Logs
        </Button>,
        <Button key={3} href={`/app/connectors/${params.id}/jobs`} color="warning" sx={{ textTransform: "capitalize" }}>
          View Jobs
        </Button>,
        <Button key={4} onClick={() => deleteConnector(params)} color="error" sx={{ textTransform: "capitalize" }}>
          Delete
        </Button>
        // <Button key={4} href={`https://gateway.aloi.io/${props.keycloak.realm}/${params.id}/api/graphql`}>
        //   GraphQL Playground
        // </Button>
      ]
    }
  ];

  const deleteConnector = (params) => {
    setData({ ...data, open: true, connectorName: params.id, connectorTitle: params.row.title });
  };

  const requestOption = {
    method: "GET",
    headers: {
      HOST: "https://api.aloi.io/",
      Accept: "*/*",
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      Authorization: "Bearer " + _accessToken
    }
  };

  const onSubmit = () => {
    const deleteRequest = { ...requestOption, method: "DELETE" };
    setData({ ...data, disabled: true, loading: true });
    fetch(`https://demo-api.aloi.io/connector/${data.connectorName}`, deleteRequest).then((res) => {
      setData({ ...data, open: false, connectorName: "", connectorTitle: "" });
      window.location.href = props.realm.generateUrl(`/app/connectors`);
    });
  };

  const onClose = () => {
    setData({ ...data, open: false });
  };

  useEffect(() => {
    const logs = fetch(`https://api.aloi.io/connector`, requestOption);
    setLoading(true);
    logs
      .then((data) => data.json())
      .then((data) => {
        setRows(data.connectors);
        setLoading(false);
      });
  }, []);

  // filter out null values to avoid errors when rendering the connector rows
  useEffect(() => {
    console.log(rows);
    if (rows.length > 0) {
      let newRows = rows.filter((row) => row !== null);
      setCleanRows(newRows);
    }
  }, [rows]);

  return (
    <Layout>
      <title> Connectors | Jive Dashboard </title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <ModalAloi
          agree="Delete"
          close="Cancel"
          loading={data.loading}
          type="alert"
          message="This item will be deleted immediately. You can't undo this action"
          onClose={onClose}
          onSubmit={onSubmit}
          open={data.open}
          disableSubmit={data.disabled}
          title={`Are you sure you want to delete ${data.connectorTitle}?`}
        />
        <Container maxWidth={false}>
          <Typography
            color="textPrimary"
            variant="h4"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
              fontWeight: "bold"
            }}>
            Connectors
            <Button variant="contained" href="/app/packages" sx={{ margin: "1em 0" }}>
              Install Connector
            </Button>
          </Typography>
          <div className="table-wrapper" style={{ height: 650, width: "100%", clear: "both" }}>
            <img alt="notif" src={jiveBorder} className="tableHead" />
            <DataGrid
              checkboxSelection={false}
              columns={columns}
              hideFooterSelectedRowCount={true}
              loading={loading}
              pageSize={10}
              rows={cleanRows}
              rowsPerPageOptions={[10]}
              sx={{
                marginTop: "-11px",
                border: "none"
              }}
            />
          </div>
        </Container>
      </Box>
    </Layout>
  );
};

export default withAloi(Connectors);
