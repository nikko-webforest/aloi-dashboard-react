import Layout from "../../../components/dashboard/Layout";
import moment from "moment";
import { Box, Button, Container, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { withAloi } from "ui";
import CircularProgress from "@mui/material/CircularProgress";
// @ts-ignore
import jiveBorder from "../../icons/custom/tableHeadBorder.svg";

const Request = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const [requestLog, setRequestLog] = useState({});
  const { connector_name, requestId } = useParams();

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
    if (requestId === "") return;

    fetch(`https://api.aloi.io/requests/${connector_name}/${requestId}`, requestOption)
      .then((data) => data.json())
      .then((data) => {
        const logsObject = { ...data };
        setRequestLog(logsObject);
      });
  }, [requestId]);

  const payload = (body) => {
    try {
      const json = JSON.stringify(JSON.parse(body), null, 2);
      return json;
    } catch (e) {
      return body;
    }
  };

  const renderItem = () => {
    if (Object.keys(requestLog).length === 0)
      return (
        <Box sx={{ width: "350px" }}>
          {" "}
          <Skeleton /> <Skeleton /> <Skeleton /> <Skeleton /> <Skeleton /> <Skeleton />{" "}
        </Box>
      );
    const uri = `https://aloi.io/${requestLog.request?.uri}`;
    const queryUri = [...new URLSearchParams(new URL(uri).search).entries()];
    const queryString = JSON.stringify(Object.fromEntries(queryUri), null, 4);
    return (
      <>
        <Typography>
          <strong> Request ID: </strong> {requestId}
        </Typography>
        <Typography>
          {" "}
          <strong>Transaction ID: </strong> {requestLog.transactionId}
          <Button target="_blank" href={`/app/connectors/${connector_name}/${requestLog.transactionId}/traces`}>
            Trace
          </Button>
        </Typography>
        <Typography>
          {" "}
          <strong>Method: </strong> {requestLog.request?.method}
        </Typography>
        <Typography>
          {" "}
          <strong> Status: </strong> {requestLog.response?.status}
        </Typography>
        <Typography>
          {" "}
          <strong> URI: </strong>
          {requestLog.request?.uri}
        </Typography>
        {Object.keys(JSON.parse(queryString)).length > 0 && (
          <>
            <strong> Query Params: </strong>
            <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", fontSize: "14px" }}>{queryString}</pre>
          </>
        )}
        <Typography>
          {" "}
          <strong> Timestamp: </strong>
          {moment(requestLog.timestamp).format("DD/MM/YYYY hh:mm:ss:SSS a")}
        </Typography>

        {!requestLog.request.body ? (
          ""
        ) : (
          <>
            <strong> Payload </strong>
            <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", fontSize: "14px" }}>
              {payload(requestLog.request?.body)}
            </pre>
          </>
        )}

        {!requestLog.body ? (
          ""
        ) : (
          <>
            <Typography>
              <strong> Response </strong>
            </Typography>
            <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", fontSize: "14px" }}>
              {payload(requestLog.body)}
            </pre>
          </>
        )}
      </>
    );
  };

  return (
    <Layout>
      <title> Request {requestId} | Jive Dashboard </title>
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth={false}>
          <Typography color="textPrimary" variant="h4">
            {connector_name}
          </Typography>
          <div className="table-wrapper" style={{ maxHeight: 650, width: "100%", clear: "both" }}>
            <img alt="notif" src={jiveBorder} className="tableHead" />
            <div style={{ padding: "20px" }}> {requestId && <>{renderItem()}</>}</div>
          </div>
        </Container>
      </Box>
    </Layout>
  );
};

export default withAloi(Request);
