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
  {
    field: "orderStatus",
    headerName: "Total Price",
    type: "number",
    minwidth: 110,
    editable: false,
    flex: 1,
  },
];

function OrderHistory() {
  const [vegeList, setVegeList] = useState([]);
  const [clickedRow, setClickedRow] = useState([]);

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
    console.log(clickedRow);
  }, [clickedRow]);

  const handleRowclick = (params) => {
    axios
      .get(`http://localhost:3001/orderdata/${params.row.orderid}`)
      .then((response) => {
        setVegeList(response.data);
        setClickedRow(params.row);
      });
  };

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
                pageSizeOptions={[5, 12]}
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
              <h1 className="text-xl font-bold mb-1">List of the Order</h1>
              <h3 className="font-bold  pb-6">
                Order ID - {vegeList[0].orderid}
              </h3>

              <ul>
                {vegeList.map((item) => (
                  <li key={item.id} className="border-b py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Vegetable: {item.vegetype}</p>
                        <p className="text-sm">Quantity: {item.qty}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <h4 className="font-bold pt-8">
                Total Price - {clickedRow.totalprice}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
