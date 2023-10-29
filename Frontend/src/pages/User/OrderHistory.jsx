import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columns = [
  {
    field: "orderid",
    headerName: "Order ID",
    width: 450,
    editable: true,
  },
  {
    field: "orderdate",
    headerName: "Ordered Date",
    width: 150,
    editable: true,
  },
  {
    field: "totalprice",
    headerName: "Total Price",
    type: "number",
    width: 110,
    editable: true,
  },
];

function OrderHistory() {
  const [rows, setRows] = useState([]);
  let a = sessionStorage.getItem("id");
  const navigate = useNavigate();
  if (!a) {
    navigate("/");
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/order_histories/${a}`).then((response) => {
      setRows(response.data);
    });
  }, []);

  return (
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
  );
}

export default OrderHistory;
