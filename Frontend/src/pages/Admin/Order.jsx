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
    minwidth: 110,
    editable: false,
    flex: 1,
  },

  {
    field: "UserId",
    headerName: "User ID",
    type: "number",
    minwidth: 110,
    editable: false,
    flex: 1,
  },
  {
    field: "orderid",
    headerName: "Order ID",
    minwidth: 450,
    editable: false,
    flex: 1,
  },
  {
    field: "orderdate",
    headerName: "Ordered Date",
    minwidth: 150,
    editable: false,
    flex: 1,
  },
  {
    field: "totalprice",
    headerName: "Total Price",
    type: "number",
    minwidth: 110,
    editable: false,
    flex: 1,
  },
  {
    field: "orderStatus",
    headerName: "Total Price",
    type: "number",
    minwidth: 110,
    editable: false,
    flex: 1,
  },
];

function Order() {
  const location = useLocation();
  const [orderStatus, setorderStatus] = useState(true);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const isFromLogin = location.state && location.state.fromLogin;
  const [vegeList, setVegeList] = useState([]);
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
  }, [shouldFetchData]);

  const handleRowclick = (params) => {
    axios
      .get(`http://localhost:3001/orderdata/${params.row.orderid}`)
      .then((response) => {
        setVegeList(response.data);
      });
    if (params.row.orderStatus === "completed") {
      setorderStatus(false);
      console.log("alert");
    } else {
      setorderStatus(true);
    }
  };
  const handleOrderComplete = () => {
    axios
      .put(`http://localhost:3001/order_histories/${vegeList[0].orderid}`)
      .then((response) => {
        if (response.status === 204) {
          setShouldFetchData(true);
          enqueueSnackbar("Order Completed successfully", {
            variant: "success",
            style: {
              fontSize: "20px",
            },
          });
        } else {
          enqueueSnackbar("Failed to delete data", {
            variant: "error",
            style: {
              fontSize: "20px",
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setorderStatus(false);
  };

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      <div className="items-center justify-center m-8 ">
        <Container>
          <Item>
            <div className="order items-center justify-center ">
              <Box
                className="items-center justify-center"
                sx={{ height: "100%", width: "100%" }}
              >
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
                  onRowClick={handleRowclick}
                />
              </Box>
            </div>
          </Item>
        </Container>
        {vegeList.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <h1 className="text-xl font-bold mb-4">List of the Order</h1>
                <h3>Order ID - {vegeList[0].orderid}</h3>
                <ul>
                  {vegeList.map((item) => (
                    <li key={item.id} className="border-b py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold">ID: {item.id}</p>
                          <p className="text-sm">Vegetable: {item.vegetype}</p>
                          <p className="text-sm">Quantity: {item.qty}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {orderStatus && (
                  <button
                    onClick={handleOrderComplete}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Order Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </SnackbarProvider>
  );
}

export default Order;
