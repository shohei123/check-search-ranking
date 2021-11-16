import React from "react";
import { Container } from "@mui/material";
import { DataTable } from "./components/DataTable";

export default function App() {
  return (
    <Container maxWidth="lg">
      <DataTable />
    </Container>
  );
}
