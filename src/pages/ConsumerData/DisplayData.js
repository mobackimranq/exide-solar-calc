import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const mockdata = [
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "9999999999",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "tejjjjjjjjjjjjjjjst@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "tehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhst",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Gohhhhhhhhhhhhhhhhhhhhha",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
  {
    name: "test",
    phone: "21235465",
    email: "test@email.com",
    location: "Goa",
    appliancesData: [{ name: "fan", watt: "45" }],
  },
];

const columns = [
  { id: "srNo", label: "" },
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "location", label: "Location" },
  { id: "appliancesData", label: "Appliances Data" },
];

export default function StickyHeadTable() {
  const [data, setData] = useState(mockdata);

  useEffect(() => {
    setData(mockdata);
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (data == null) return <p>Loading...</p>;

  return (
    <div className="d-flex flex-column">
      <TableContainer style={{ maxHeight: "60vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column, index) => {
                      let value = row[column.id] || i + 1;
                      if (typeof value === "object") {
                        value = JSON.stringify(value);
                      }
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
