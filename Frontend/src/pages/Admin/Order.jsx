import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columns = [
  {
    field: "id",
    headerName: "Order ID",
    type: "number",
    width: 110,
    editable: false,
  },

  {
    field: "UserId",
    headerName: "User ID",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "orderid",
    headerName: "Order ID",
    width: 450,
    editable: false,
  },
  {
    field: "orderdate",
    headerName: "Ordered Date",
    width: 150,
    editable: false,
  },
  {
    field: "totalprice",
    headerName: "Total Price",
    type: "number",
    width: 110,
    editable: false,
  },
];

function Order() {
  const location = useLocation();
  const isFromLogin = location.state && location.state.fromLogin;

  useEffect(() => {
    if (isFromLogin) {
      enqueueSnackbar("Successfully logged in", {
        variant: "success",
        style: {
          fontSize: "20px",
        },
      });
    }
  }, [isFromLogin]);
  const [rows, setRows] = useState([]);
  let a = sessionStorage.getItem("id");
  const navigate = useNavigate();
  if (!a) {
    navigate("/");
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/order_histories/`).then((response) => {
      setRows(response.data);
    });
  }, []);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      <div>
        <Container>
          <Item>
            <div className="order">
              <Box sx={{ height: "100%", width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 12,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />
              </Box>
            </div>
          </Item>
        </Container>
      </div>
    </SnackbarProvider>
  );
}

export default Order;
