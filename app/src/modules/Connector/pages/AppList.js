import Layout from "../../../components/dashboard/Layout";
import { Box, Container, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { withAloi } from "ui";
import jiveBorder from "../../icons/custom/tableHeadBorder.svg";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

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
      headerName: "Security",
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
        <Button
          key={1}
          href={`/app/connectors/${connector_name}/${params.id}/logs`}
          sx={{ textTransform: "capitalize" }}>
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
      <title> {connector_name} - App Lists | Aloi Platform </title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
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
            {connector_name} - App Lists
            <Button
              variant="text"
              href="/app/connectors"
              sx={{
                textTransform: "capitalize",
                color: "#AEAEAE !important",
                "&:hover": { backgroundColor: "transparent", color: "#FF4C6E !important" }
              }}>
              <ChevronLeftOutlinedIcon /> Back to Connectors
            </Button>
          </Typography>
          <div className="table-wrapper" style={{ height: 600, width: "100%" }}>
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
