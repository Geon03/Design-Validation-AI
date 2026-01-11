"use client";

import { useState } from "react";
import axios from "axios";
import { Button, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {
  const [input, setInput] = useState("");
  const [rows, setRows] = useState<any[]>([]);

  const validate = async () => {
    const res = await axios.post("http://localhost:8000/design/validate", {
      freeTextInput: input
    });

    console.log("Backend Response:", res.data);

    const mappedRows = res.data.validation.map((item: any, index: number) => ({
      id: index,
      field: item.field,
      status: item.status,
      expected: item.expected,
      comment: item.comment
    }));

    setRows(mappedRows);
  }; // ✅ VERY IMPORTANT — THIS WAS MISSING
  

  const columns = [
    { field: "field", headerName: "Attribute", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color={
            params.value === "PASS"
              ? "success"
              : params.value === "WARN"
              ? "warning"
              : "error"
          }
        />
      )
    },
    { field: "expected", headerName: "Expected", width: 200 },
    { field: "comment", headerName: "Comment", width: 400 }
  ];

  return (
    <div style={{ padding: 40 }}>
      <TextField
        fullWidth
        label="Cable description"
        placeholder="Paste cable description here"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          backgroundColor: "white",
          borderRadius: 1
        }}
      />

      <Button
        onClick={validate}
        variant="contained"
        style={{ marginTop: 20 }}
      >
        Validate
      </Button>

      <div style={{ height: 400, marginTop: 30 }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
