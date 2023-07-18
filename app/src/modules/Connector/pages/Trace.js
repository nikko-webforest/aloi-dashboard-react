import Layout from "../../../components/dashboard/Layout";
import moment from "moment";
import Search from "../components/Search";
import { Box, Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { withAloi } from "ui";

const Trace = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const { connector_name, transactionId = "", app_name = "" } = useParams();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState({
    transactionId: transactionId,
    path: "",
    httpStatus: "",
    responseTime: "",
    httpMethod: "",
    from: null,
    to: null
  });

  const updateData = (k, v) => {
    setData((data) => ({ ...data, [k]: v }));
  };

  const [data, setData] = useState({
    loading: true,
    page: 1,
    pageSize: 100,
    rows: [],
    rowsPerPageOptions: [50, 100, 150, 200],
    totalRows: 0
  });

  const updateSearch = (k, v) => {
    setSearch((data) => ({ ...data, [k]: v }));
  };

  const onSubmit = () => {
    fetchData();
  };

  const fetchData = () => {
    updateData("loading", true);
    updateData("rows", []);
    let searchQuery = "";

    searchQuery = searchQuery + `?transactionId=${transactionId}`;

    if (search.path) {
      searchQuery = searchQuery + `&path=${search.path}`;
    }

    if (search.httpMethod) {
      searchQuery = searchQuery + `&method=${search.httpMethod}`;
    }

    if (search.httpStatus) {
      searchQuery = searchQuery + `&httpStatus=${search.httpStatus}`;
    }

    if (search.responseTime) {
      searchQuery = searchQuery + `&responseTime=${search.responseTime}`;
    }

    if (search.from) {
      searchQuery = searchQuery + `&from=${search.from.set({ hour: 0, second: 0, millisecond: 0 }).valueOf()}`;
    }

    if (search.to) {
      searchQuery = searchQuery + `&to=${search.to.set({ hour: 0, second: 0, millisecond: 0 }).valueOf()}`;
    }

    fetch(`https://demo-api.aloi.io/connector/${connector_name}`, requestOption)
      .then((data) => data.json())
      .then((data) => {
        data.apps.push({ name: "" });
        console.log(data.apps);
        const promises = data.apps.map(async (data) => {
          const appName = data.name;
          return await fetch(`https://api.aloi.io/logs/${connector_name}/${appName}${searchQuery}`, requestOption)
            .then((data) => data.json())
            .then((data) => {
              return { app: appName, ...data };
            });
        });

        Promise.all(promises).then((data) => {
          const newObject = data.reduce((o, data) => {
            o.push(...data.logs);
            return o;
          }, []);

          newObject.sort((a, b) => {
            return new Date(a.timestamp) - new Date(b.timestamp);
          });

          updateData("rows", newObject);
          updateData("loading", false);
        });
      });
  };

  const fetchTraces = () => {
    if (transactionId === "") return;

    const app_list = fetch(`https://demo-api.aloi.io/connector/${connector_name}`, requestOption);
    app_list
      .then((data) => data.json())
      .then((data) => {
        data.apps.push({ name: "" });
        console.log(data.apps);
        const promises = data.apps.map(async (data) => {
          const appName = data.name;
          return await fetch(
            `https://api.aloi.io/logs/${connector_name}/${appName}?transactionId=${transactionId}`,
            requestOption
          )
            .then((data) => data.json())
            .then((data) => {
              return { app: appName, ...data };
            });
        });

        Promise.all(promises).then((data) => {
          const newObject = data.reduce((o, data) => {
            o.push(...data.logs);
            return o;
          }, []);

          newObject.sort((a, b) => {
            return new Date(a.timestamp) - new Date(b.timestamp);
          });

          updateData("rows", newObject);
          updateData("loading", false);
        });
      });
  };

  const clearData = () => {
    updateData("loading", true);
    updateData("rows", []);
    setSearch({
      path: "",
      httpStatus: "",
      responseTime: "",
      httpMethod: "",
      from: null,
      to: null
    });
    let searchQuery = "";
    fetchTraces();
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

  useEffect(() => {
    updateData("loading", true);
    fetchTraces();
  }, []);

  const columns = [
    {
      field: "transactionId",
      headerName: "ID",
      width: 250,
      sortable: false,
      renderCell: (params) => params.row.id
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY hh:mm:ss:SSS a"),
      flex: 2
    },
    { field: "method", headerName: "Method" },
    { field: "path", headerName: "Path", flex: 5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          <strong style={/^[1-2][0-9][0-9]$/.test(params.row.status) ? { color: "green" } : { color: "red" }}>
            {params.row.status}
          </strong>
        </>
      )
    },
    {
      field: "id",
      headerName: "Option",
      type: "actions",
      sortable: false,
      flex: 1,
      getActions: (params) => [
        <Button
          key={1}
          style={{ color: "#d85a57" }}
          href={`/app/connectors/${connector_name}/${params.row.id}/request`}>
          View
        </Button>
      ]
    }
  ];

  return (
    <Layout>
      <title>
        Trace Logs: {transactionId} {connector_name} {app_name ? "/" + app_name : ""} | Jive Dashboard
      </title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth={false}>
          <Typography color="textPrimary" variant="h4">
            Trace Logs: {transactionId} {connector_name} {app_name ? "/" + app_name : ""}
          </Typography>
          <hr />
          <Search
            search={search}
            hideTransaction={true}
            updateSearch={updateSearch}
            clearData={clearData}
            onSubmit={onSubmit}
          />
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
              rowsPerPageOptions={data.rowsPerPageOptions}
            />
          </div>
        </Container>
      </Box>
    </Layout>
  );
};

export default withAloi(Trace);
