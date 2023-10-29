import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { AiOutlineDelete } from "react-icons/ai";

const initialValues = {
  vegetype: "",
  qty: "",
  unitprice: "",
};

const validationSchema = Yup.object().shape({
  vegetype: Yup.string().required("Vegetable Name is required"),
  qty: Yup.number().required("Quantity is required"),
  unitprice: Yup.number().required("Unit Price is required"),
});

function ProductUpdate() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [listofvegetable, setlistofvegetable] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const [vegetable, setVegetable] = useState("");
  const [newqty, setQty] = useState("");
  const [newunitprice, setUnitPrice] = useState("");

  const handleChange = (event) => {
    setVegetable(event.target.value);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const handleUnitPriceChange = (e) => {
    setUnitPrice(e.target.value);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "vegetype",
      headerName: "Vegetable Type",
      width: 200,
      editable: false,
    },
    {
      field: "qty",
      headerName: "Quantity",
      width: 200,
      editable: false,
    },
    {
      field: "unitprice",
      headerName: "Unit Price",
      width: 200,
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
            .delete(`http://localhost:3001/vegetabledata/${orderIdToDelete}`)
            .then((response) => {
              if (response.status === 204) {
                setShouldFetchData(true);
                enqueueSnackbar("Data Deleted successfully", {
                  variant: "success",
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
    axios.get("http://localhost:3001/vegetabledata").then((response) => {
      setRows(response.data);
      setlistofvegetable(response.data);
      setShouldFetchData(false);
    });
  }, [shouldFetchData]);

  const onSubmit = (formData, { resetForm }) => {
    axios
      .post("http://localhost:3001/vegetabledata", formData)
      .then((response) => {
        enqueueSnackbar("Vegitable added successfully.", {
          variant: "success",
        });
        resetForm({ values: initialValues });
      })
      .catch((error) => {
        enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
        resetForm({ values: initialValues });
      });
    setShouldFetchData(true);
  };

  const onUpdate = (formData) => {
    axios
      .put(`http://localhost:3001/vegetabledata/${vegetable}`, {
        uniteprice: newunitprice,
        qty: newqty,
      })
      .then((response) => {});
    setQty("");
    setUnitPrice("");
    setVegetable("");
    enqueueSnackbar("Vegitable Updated successfully.", {
      variant: "success",
    });

    setShouldFetchData(true);
  };

  if (!sessionStorage.getItem("id")) {
    navigate("/");
  }

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      <div className="w-full m-4 items-center  justify-center">
        <div className="grid grid-cols-2 gap-20 p-10 mx-4 bg-green-100 md-w-full lg-w-full shadow-lg rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formProps) => {
              return (
                <Form className="p-4 border-r border-gray-300">
                  <h2 className="text-2xl font-bold mb-4">
                    Create Vegetable Type
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Vegetable Name
                    </label>
                    <Field
                      type="text"
                      id="vegetype"
                      name="vegetype"
                      className="w-full p-2"
                    />
                    <ErrorMessage
                      name="vegetableName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <Field
                      type="number"
                      id="qty"
                      name="qty"
                      className="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-indigo-300"
                    />
                    <ErrorMessage
                      name="qty"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Unit Price
                    </label>
                    <Field
                      type="number"
                      id="unitprice"
                      name="unitprice"
                      className="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-indigo-300"
                    />
                    <ErrorMessage
                      name="unitprice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 w-60 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Create
                  </button>
                </Form>
              );
            }}
          </Formik>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form className="p-4">
              <h2 className="text-2xl font-bold mb-4">Update Vegetable Type</h2>
              <div className="mb-4">
                <InputLabel id="demo-simple-select-label">
                  Vegetable Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={vegetable}
                  label="Vegetable"
                  onChange={handleChange}
                  className="w-full bg-white"
                >
                  {listofvegetable.map((item, i) => (
                    <MenuItem key={i} value={item.vegetype}>
                      {item.vegetype}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Quantity
                </label>
                <Field
                  type="number"
                  id="newQty"
                  name="newQty"
                  value={newqty}
                  onChange={handleQtyChange}
                  className="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Unit Price
                </label>
                <Field
                  type="number"
                  id="newUnitPrice"
                  name="newUnitPrice"
                  value={newunitprice}
                  onChange={handleUnitPriceChange}
                  className="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-indigo-300"
                />
              </div>
              <button
                onClick={onUpdate}
                className="bg-green-500 w-60 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                Update
              </button>
            </Form>
          </Formik>
        </div>
        <div className="p-4 w-full mt-4 mx-4 bg-green-100">
          <h2 className="text-2xl font-bold mb-4">Vegetable Details</h2>
          <div>
            <Container>
              <Paper>
                <div className="order bg-green-100 ">
                  <Box sx={{ height: "100%", width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pagination
                      pageSize={5}
                      disableSelectionOnClick
                    />
                  </Box>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default ProductUpdate;
