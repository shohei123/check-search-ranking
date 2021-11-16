import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableSortLabel,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Data } from "../type";
import { Comparison } from "../components/Comparison";
import { connect_gspread } from "../api/spreadsheet";

const useStyles = makeStyles({
  root: {
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
  table: {
    tableLayout: "fixed",
  },
});

export const DataTable: React.VFC = () => {
  const classes = useStyles();
  const culumnNames: string[] = ["検索キーワード", "順位", "推移", "URL"];
  const [columns, setColumns] = useState<string[]>([]);
  const [state, setState] = useState<{ rows: Data[]; order: any; key: string }>({
    rows: [],
    order: "desc",
    key: "keyword",
  });

  useEffect(() => {
    connect_gspread().then((res) => {
      if (res) {
        setColumns(Object.keys(res[0]));
        setState({ rows: res, order: "desc", key: columns[0] });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSortColumn = (column: "keyword" | "currentRank" | "preRank" | "url") => {
    const isDesc = column === state.key && state.order === "desc";
    const nextOrder = isDesc ? "asc" : "desc";
    const sortRule = { asc: [1, -1], desc: [-1, 1] };
    const sortedRows = state.rows.slice().sort((a, b) => {
      if (a[column] > b[column]) {
        return sortRule[nextOrder][0];
      } else if (a[column] < b[column]) {
        return sortRule[nextOrder][1];
      } else {
        return 0;
      }
    });

    setState({
      rows: sortedRows,
      order: nextOrder,
      key: column,
    });
  };

  if (state.rows.length > 0) {
    return (
      <Paper className={classes.root}>
        <Table size="medium" className={classes.table}>
          <TableHead>
            <TableRow>
              {(columns as (keyof Data)[]).map((column, colIndex) => (
                <TableCell
                  key={`table-header-col-${colIndex}`}
                  sortDirection={state.key === column ? state.order : false}
                >
                  <TableSortLabel
                    active={state.key === column}
                    direction={state.order}
                    onClick={() => handleClickSortColumn(column)}
                  >
                    {culumnNames[colIndex]}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map((row, rowIndex) => (
              <TableRow hover key={`table-row-row-${rowIndex}`}>
                {(Object.keys(row) as (keyof Data)[]).map((key, colIndex) => (
                  <TableCell key={`table-row-${rowIndex}-col-${colIndex}`}>
                    {key !== "preRank" ? (
                      row[key]
                    ) : (
                      <Comparison currentRank={row["currentRank"]} preRank={row["preRank"]} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  } else {
    return (
      <CircularProgress
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }
};
