import { Box, Container, Grid, Typography, Card, CardContent, Button, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import { useParams, Link as LinkReact } from "react-router-dom";
import { withAloi } from "ui";
import { generateAppPayload, generatePackagePayload, generateSecurityPayload } from "./utils";

const PackageIndex = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { connector_name } = useParams();

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      height: 100,
      renderCell: (params) => (
        <>
          {params.row.name == params.row.title ? (
            <Typography variant="subtitle2">{params.row.name}</Typography>
          ) : (
            <div>
              <Typography variant="subtitle2">{params.row.title}</Typography>
              <Typography variant="body2">{params.row.name}</Typography>
            </div>
          )}
        </>
      ),
      sortComparator: (v1, v2, p1, p2) => {
        return p1.value.localeCompare(p2.value);
      }
    },
    { field: "version", headerName: "Version", flex: 1 },
    {
      field: "col2",
      headerName: "Apps",
      width: 350,
      renderCell: (params) => {
        const sec = params.row.apps.map((data, key) => data.name).join(", ");
        return <Typography sx={{ whiteSpace: "pre-wrap" }}>{sec}</Typography>;
      },
      sortable: false
    },
    {
      field: "col3",
      headerName: "Security",
      flex: 2,
      renderCell: (params) => {
        const sec = Object.keys(params.row.security)
          .map((data, key) => params.row.security[data].type)
          .join(", ");
        return sec;
      },
      sortable: false
    },
    {
      field: "option",
      headerName: "Options",
      flex: 1,
      sortable: false,
      type: "actions",
      getActions: (params) => [
        <Button key={1} href={`/app/packages/${params.row.name}/install`} color="secondary">
          Install Connector
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
    const logs = fetch(`https://api.aloi.io/package/`, requestOption);
    logs
      .then((data) => data.json())
      .then((data) => {
        const packages = data.packages.map((data, id) => {
          return { id, ...data };
        });
        setRows(packages);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <title>Packages | Aloi Platform</title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth={false}>
          <Typography color="textPrimary" variant="h4">
            Packages
          </Typography>
          <Typography color="textPrimary" variant="caption">
            {" "}
            Below is a list of packages uploaded to your Aloi workspace. These packages are not currently deployed on
            Aloi.{" "}
          </Typography>
          <hr />
          <div style={{ height: "600px", width: "100%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={25} loading={loading} rowsPerPageOptions={[25]} />
          </div>
        </Container>
      </Box>
    </>
  );
};
export default withAloi(PackageIndex);
