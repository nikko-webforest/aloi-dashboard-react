import CircleIcon from "@mui/icons-material/Circle";
import { Skeleton, CircularProgress } from "@mui/material";
import { Box, Container, Grid, Typography, Card, CardContent, Button, Link, Alert, AlertTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalAloi from "../../utils/Modal";
import {
  generateSecurityObject,
  generateFormObject,
  generateAppPayload,
  generatePackagePayload,
  generateSecurityPayload
} from "./utils";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { useEffect, useState } from "react";
import { useParams, Link as LinkReact } from "react-router-dom";
import { withAloi } from "ui";
import { Form, Group, Text } from "src/forms";

const InstallIndex = (props) => {
  const [_accessToken, setAccessToken] = useState(() => props.keycloak.token);
  const [data, setData] = useState({});
  const [packageInfo, setPackageInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [{ schema, uischema }, setSchema] = useState({
    schema: {},
    uischema: {}
  });
  const { package_name } = useParams();
  const [errors, setErrors] = useState([]);
  const [modalData, setModalData] = useState({
    message: "",
    disabled: false,
    open: false,
    loading: true,
    title: "",
    hideSubmit: false
  });
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
    fetch(`https://api.aloi.io/package/${package_name}`, requestOption)
      .then((data) => data.json())
      .then((packageResp) => {
        let obj = {
          type: "object",
          properties: {
            connectorName: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Connector Name"
                }
              }
            },
            apps: {
              type: "object",
              properties: {}
            },
            security: {
              type: "object",
              properties: {}
            }
          }
        };

        const securityFields = Object.entries(packageResp.security).reduce((o, [name, security]) => {
          const fields = generateSecurityObject(security.type);
          o.push(Group(fields, name));
          return o;
        }, []);

        const appFields = packageResp.apps.reduce((o, app) => {
          const fields = generateFormObject(app.auth.type, app.auth.schema);
          o.push(Group(fields, `${app.auth.title} - ${app.name}`));
          return o;
        }, []);

        const { schema, uischema } = Form([
          Group([Text("Connector Name")], "Connector Name", { updateSchema: false }),
          Group(securityFields, "Security"),
          Group(appFields, "Apps")
        ]);
        setSchema({ schema, uischema });
        setPackageInfo(packageResp);
      });
  }, []);

  const errorHandler = (e) => {
    if (e.hasOwnProperty("request")) {
      return e.request.errors;
    }

    if (e.hasOwnProperty("errors")) {
      return e.errors;
    }
  };

  const installConnector = (dataInstall) => {
    let requestPost = { ...requestOption };
    requestPost.method = "POST";

    const packagePayload = generatePackagePayload(packageInfo.name, dataInstall.name);

    const appPayload = Object.keys(dataInstall.apps).reduce((o, a) => {
      if (a === "connectorName" || a === "security" || a === undefined) return o;
      o[a] = generateAppPayload(dataInstall["apps"][a].type, dataInstall["apps"][a]);
      return o;
    }, {});

    let securityPayload = { test: {} };
    if (Object.keys(dataInstall.security).length > 0) {
      securityPayload = Object.keys(dataInstall.security).reduce((o, s) => {
        o[s] = generateSecurityPayload(s, dataInstall.security[s].type, dataInstall.security[s]);
        return o;
      }, {});
    }

    const installPayload = { ...packagePayload, apps: appPayload, security: securityPayload };
    requestPost["body"] = JSON.stringify(installPayload);

    setLoading(true);
    const resp = fetch("https://api.aloi.io/connector", requestPost);

    resp
      .then((resp) => {
        return { status: resp.status, body: resp.json() };
      })
      .then(async (data) => {
        setLoading(false);
        const body = await data.body;
        const status = data.status;
        if (!/^[1-2][0-9][0-9]$/.test(status)) {
          setModalData({
            ...modalData,
            open: true,
            title: "Invalid package data",
            message:
              "Please ensure that all the required data for installing this package are accurate and correctly entered.",
            hideSubmit: true
          });
          return;
        }

        window.location.href = props.realm.generateUrl(`/app/connectors/${dataInstall.name}`);
      });
  };

  const showError = () => {
    return (
      <Alert severity="error" sx={{ m: 1 }}>
        <AlertTitle> Error </AlertTitle>
        {errors.map((data, key) => (
          <p key={key}>- {data.message} </p>
        ))}
      </Alert>
    );
  };

  const submitData = () => {
    if (Object.keys(data).length === 0) {
      setModalData({
        ...modalData,
        open: true,
        title: "Please fill out the form completely.",
        message: "To proceed with the installation of this package, please provide the necessary data.",
        hideSubmit: true
      });
      return;
    }

    const { connectorName, ...c } = data;
    const payload = { name: connectorName, ...c };
    console.log({ data, payload });

    // const d = JSON.parse(JSON.stringify(payload));

    payload.apps = packageInfo.apps.reduce((o, app) => {
      return {
        ...o,
        [app.name]: { ...payload.apps[app.name], type: app.auth.type }
      };
    }, {});

    payload.security = Object.entries(packageInfo.security).reduce((o, [name, s]) => {
      if (!payload.security) return o;

      return {
        ...o,
        [name]: { ...payload["security"][name], type: packageInfo["security"][name]["type"] }
      };
    }, {});
    // const installObject = { name: d.connectorName.name, apps, security };
    try {
      installConnector(payload);
    } catch (error) {
      setModalData({
        ...modalData,
        open: true,
        title: "Something went wrong.",
        message: "" + error + "",
        hideSubmit: true
      });
    }
  };

  const onClose = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <>
      <title>Install Package | Jive Dashboard</title>
      <ModalAloi
        close="Cancel"
        loading={modalData.loading}
        type="alert"
        hideSubmit={modalData.hideSubmit}
        message={modalData.message}
        onClose={onClose}
        open={modalData.open}
        title={modalData.title}
      />
      <Box
        sx={{
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth={false} className="jive-form">
          <Container className="form-head">
            {packageInfo && (
              <>
                <Container className="title-wrapper">
                  <Typography color="textPrimary" variant="h4" sx={{ fontWeight: "bold", fontFamily: "Helvetica" }}>
                    {" "}
                    {packageInfo.description}{" "}
                  </Typography>
                  <Typography color="textPrimary" variant="subtitle2" sx={{ color: "#9B9B9B", marginBottom: "35px" }}>
                    {packageInfo.name} {packageInfo.version}
                  </Typography>
                </Container>
                <Container className="action">
                  <Button href="/app/packages">
                    <Typography sx={{ textTransform: "capitalize" }}>Back to Packages</Typography>
                  </Button>
                </Container>
              </>
            )}
          </Container>
          {errors.length > 0 && showError()}
          {Object.keys(uischema).length == 0 ? (
            <Skeleton />
          ) : (
            <>
              <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, _errors }) => setData(data)}
              />

              <Box sx={{ m: 1, position: "relative" }}>
                <Button disabled={loading} variant="contained" onClick={() => submitData()}>
                  Submit
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      marginTop: "8px",
                      marginLeft: "37px"
                    }}
                  />
                )}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};
export default withAloi(InstallIndex);
