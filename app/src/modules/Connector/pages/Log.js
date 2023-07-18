import Layout from "../../../components/dashboard/Layout";
import moment from "moment";
import Search from "../components/Search";
import { Box, Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { withAloi } from "ui";

const Log = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const { connector_name, app_name = "" } = useParams();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState({
    transactionId: "",
    path: "",
    httpStatus: "",
    responseTime: "",
    httpMethod: "",
    from: null,
    to: null
  });

  const [data, setData] = useState({
    loading: true,
    page: 1,
    pageSize: 10,
    rows: [],
    rowsPerPageOptions: [10, 25, 50, 100],
    totalRows: 0
  });

  const updateData = (k, v) => {
    setData((data) => ({ ...data, [k]: v }));
  };

  const updateSearch = (k, v) => {
    setSearch((data) => ({ ...data, [k]: v }));
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

  const columns = [
    {
      field: "requestId",
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
      sortable: false,
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <Button variant="text" key={1} href={`/app/connectors/${connector_name}/${params.row.id}/request`}>
          View
        </Button>,
        <Button variant="text" key={2} href={`/app/connectors/${connector_name}/${params.row.transactionId}/traces`}>
          Trace
        </Button>
      ]
    }
  ];

  const onSubmit = () => {
    fetchData();
  };

  const fetchData = () => {
    updateData("loading", true);
    updateData("rows", []);
    let searchQuery = "";
    if (search.transactionId) {
      searchQuery = searchQuery.concat(searchQuery, `&transactionId=${search.transactionId}`);
    }

    if (search.path) {
      searchQuery = searchQuery.concat(searchQuery, `&path=${search.path}`);
    }

    if (search.httpMethod) {
      searchQuery = searchQuery.concat(searchQuery, `&method=${search.httpMethod}`);
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

    fetch(
      `https://api.aloi.io/logs/${connector_name}/${app_name}?size=${data.pageSize}&page=1${searchQuery}`,
      requestOption
    )
      .then((data) => data.json())
      .then((result) => {
        if (result.logs === undefined) return;
        setQuery(searchQuery);
        setData({
          ...data,
          totalRows: result.total,
          rows: result.logs,
          loading: false
        });
      });
  };

  const clearData = () => {
    updateData("loading", true);
    updateData("rows", []);
    setSearch({
      transactionId: "",
      path: "",
      httpStatus: "",
      responseTime: "",
      httpMethod: "",
      from: null,
      to: null
    });
    let searchQuery = "";

    fetch(`https://api.aloi.io/logs/${connector_name}/${app_name}?size=${data.pageSize}&page=1`, requestOption)
      .then((data) => data.json())
      .then((result) => {
        if (result.logs === undefined) return;
        setQuery(searchQuery);
        setData({
          ...data,
          totalRows: result.total,
          rows: result.logs,
          loading: false
        });
      });
  };

  useEffect(() => {
    updateData("loading", true);
    updateData("rows", []);
    fetch(
      `https://api.aloi.io/logs/${connector_name}/${app_name}?size=${data.pageSize}&page=${data.page}${query}`,
      requestOption
    )
      .then((data) => data.json())
      .then((result) => {
        if (result.logs === undefined || result.code) {
          setData({
            ...data,
            loading: false
          });
          return;
        }
        setData({
          ...data,
          totalRows: result.total,
          rows: result.logs,
          loading: false
        });
      });
  }, [data.page, data.pageSize]);

  return (
    <Layout>
      <title>
        {" "}
        Log {connector_name} {app_name ? "/" + app_name : ""} | Jive Dashboard{" "}
      </title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth={false}>
          <Typography color="textPrimary" variant="h4">
            {connector_name}
            {app_name ? "/" + app_name : ""}
          </Typography>
          <hr />
          <Search search={search} updateSearch={updateSearch} clearData={clearData} onSubmit={onSubmit} />
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
              rowCount={data.totalRows}
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

export default withAloi(Log);
