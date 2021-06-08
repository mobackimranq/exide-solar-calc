import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import mockData from "../../raw-data/schema/userData.json";

const columns = [
  { id: "srNo", label: "" },
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "location", label: "Location" },
  { id: "load", label: "Load (watt)" },
  { id: "loadDuration", label: "Duration (hours)" },
  { id: "dependency", label: "Dependency (%)" },
  { id: "projectLocation", label: "Project Location" },
  { id: "inverterType", label: "Inverter Type" },
];

export default function StickyHeadTable() {
  const [data, setData] = useState(mockData);
  useEffect(() => {
    setData(mockData);
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
                <TableCell size="small" key={index} align={column.align}>
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
                      const value = row[column.id] || i + 1;
                      return (
                        <TableCell
                          className={
                            column.id === "name" ? "text-capitalize" : ""
                          }
                          size="small"
                          key={index}
                          align={column.align}
                        >
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
