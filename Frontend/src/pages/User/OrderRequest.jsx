import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Dropdown from "../../components/Dropdown";
import Dropdownqty from "../../components/Dropdownqty";
import Detailcard from "../../components/Detailcard";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { FaPlusCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "bg-gray-900",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function OrderRequest() {
  const [listofvegetable, setlistofvegetable] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const location = useLocation();
  const isFromLogin = location.state && location.state.fromLogin;

  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");

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

  const columns = [
    {
      field: "vegetype",
      headerName: "Vegetable",
      width: 150,
      editable: false,
    },
    {
      field: "qty",
      headerName: "Quantity",
      width: 150,
      editable: false,
    },
    {
      field: "unitprice",
      headerName: "Unite Price",
      type: "number",
      width: 110,
      editable: false,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      headerAlign: "left",
      sortable: false,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          const orderIdToDelete = params.row.id;
          console.log(orderIdToDelete);

          axios
            .delete(`http://localhost:3001/orderdata/${orderIdToDelete}`)
            .then((response) => {
              if (response.status === 204) {
                setShouldFetchData(true);
                enqueueSnackbar("Data Deleted successfully", {
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
        };

        return (
          <button
            onClick={handleDeleteClick}
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:transform scale-105 active:scale-95 transition-transform duration-300 py-2 px-4 rounded flex items-center space-x-1"
          >
            <AiOutlineDelete className="text-lg" />
            Delete
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get(`http://localhost:3001/orderdata/${orderid}`).then((response) => {
      setlistofvegetable(response.data);
      setShouldFetchData(false);
    });
  }, [shouldFetchData]);

  const [selectedValue, setSelectedValue_D] = useState(
    "Select A Vegetable to show more"
  );
  const [selectedqty, setSelectedqty] = useState("");
  const [unitprice, setunitprice] = useState("");
  const [orderid, setOrderid] = useState(uuidv4());

  const addRow = () => {
    if (
      selectedqty === "" ||
      selectedValue === "Select A Vegetable to show more"
    ) {
      enqueueSnackbar("Select both vegetable and the", {
        variant: "warning",
        style: {
          fontSize: "20px",
        },
      });
    } else {
      enqueueSnackbar("Row added successfully", {
        variant: "success",
        style: {
          fontSize: "20px",
        },
      });

      axios
        .post("http://localhost:3001/orderdata", {
          vegetype: `${selectedValue}`,
          qty: selectedqty,
          unitprice: unitprice,
          orderid: orderid,
        })
        .then((response) => {
          console.log(selectedqty);
        });

      setShouldFetchData(true);
    }
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const newid = () => {
    if (listofvegetable.length === 0) {
      // Show a warning notification if the list is empty
      enqueueSnackbar("Add vegetables before proceeding to payment", {
        variant: "warning",
        style: {
          fontSize: "20px",
        },
      });
    } else {
      axios
        .post("http://localhost:3001/order_histories", {
          orderid: `${orderid}`,
          orderdate: `${year}-${month}-${day}`,
          totalprice: total,
          username: `${username}`,
        })
        .then((response) => {
          console.log({ year } - { month } - { day });
        });

      setOrderid(uuidv4());
      console.log(orderid);

      setShouldFetchData(true);
      enqueueSnackbar("Payment completed", {
        variant: "success",
        style: {
          fontSize: "20px",
        },
      });
    }
  };

  const total = listofvegetable.reduce((acc, item) => {
    const qty = item.qty;
    const price = item.unitprice;

    if (!isNaN(qty) && !isNaN(price)) {
      return acc + qty * price;
    }
    console.log("qty:", qty);
    console.log("quantity:", price);

    return acc;
  }, 0);

  console.log("Total:", total);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      <div className="grid grid-cols-2 p-10 my-0 h-full   place-content-evenly">
        <div className=" grid grid-rows-10  gap-4 ">
          <div className="static grid  grid-cols-2  grid-flow-col gap-4 z-50">
            <Dropdown setSelectedValue_D={setSelectedValue_D} />
            <Dropdownqty setSelectedqty={setSelectedqty} />
          </div>

          <div className="relative top-10 pl-8 h-10 grid grid-cols-2  mt-20">
            {selectedValue !== "Select A Vegetable to show more" && (
              <div className="p-4 bg-white shadow-md rounded-md">
                <Detailcard
                  selectedValue={selectedValue}
                  setunitprice={setunitprice}
                />
              </div>
            )}

            <div className="relative bottom-10 flex justify-end m-10">
              {selectedValue !== "Select A Vegetable to show more" && (
                <button
                  onClick={addRow}
                  className="bg-green-400 hover:bg-green-700 h-12 w-36 flex items-center justify-center text-lg rounded-lg tracking-wide border-4 text-white shadow-md border-transparent active:border-white float-left"
                >
                  <FaPlusCircle className="text-lg mr-2" />
                  Add
                </button>
              )}
            </div>
          </div>

          <div className="relative pl-8 mt-20 font-bold text-2xl ">
            {listofvegetable.length > 0 ? `Total = Rs.${total}/=` : null}
          </div>

          <div className="flex justify-end m-10">
            {selectedValue !== "Select A Vegetable to show more" && (
              <button
                onClick={newid}
                className="fixed bg-green-400 hover:bg-green-700 h-12 w-80 flex items-center justify-center text-lg rounded-lg tracking-wide border-4 text-white border-transparent active:border-white"
              >
                <FaArrowRight className="text-lg mr-2" />
                Proceed
              </button>
            )}
          </div>
        </div>

        <Item>
          <div className="order bg-green-100 text-black p-4 rounded shadow-md">
            <Box sx={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={listofvegetable}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </Item>
      </div>
    </SnackbarProvider>
  );
}

export default OrderRequest;
