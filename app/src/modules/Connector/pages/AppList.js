import Layout from "../../../components/dashboard/Layout";
import { Box, Container, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { withAloi } from "ui";
// @ts-ignore
import jiveBorder from "../../icons/custom/tableHeadBorder.svg";

const AppList = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const [loading, setLoading] = useState(false);
  const { connector_name } = useParams();
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "App Name", width: 250 },
    { field: "host", headerName: "Host", flex: 3 },
    {
      field: "security",
      headerName: "security",
      width: 250,
      sortable: false,
      renderCell: (params) => <Typography>{params.row.auth.type}</Typography>
    },
    {
      field: "option",
      headerName: "Options",
      type: "actions",
      width: 150,
      sortable: false,
      getActions: (params) => [
        <Button key={1} href={`/app/connectors/${connector_name}/${params.id}/logs`}>
          View Logs
        </Button>
      ]
    }
  ];

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

  useEffect(() => {
    const app_list = fetch(`https://demo-api.aloi.io/connector/${connector_name}`, requestOption);
    setLoading(true);
    app_list
      .then((data) => data.json())
      .then((c) => {
        fetch(`https://api.aloi.io/package/${c.package}`, requestOption)
          .then((data) => data.json())
          .then((res) => {
            const apps = res.apps.map((d) => ({ ...d, id: d.name }));
            setRows(apps);
            setLoading(false);
          });
      });
  }, []);

  return (
    <Layout>
      <title> {connector_name} - App Lists | Jive Dashboard </title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth={false}>
          <Typography color="textPrimary" variant="h4">
            {connector_name} - App Lists
          </Typography>
          <br />
          <div className="table-wrapper" style={{ height: 650, width: "100%", clear: "both" }}>
            <img alt="notif" src={jiveBorder} className="tableHead" />
            <DataGrid
              checkboxSelection={false}
              columns={columns}
              hideFooterSelectedRowCount={true}
              loading={loading}
              pageSize={10}
              rows={rows}
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

export default withAloi(AppList);
