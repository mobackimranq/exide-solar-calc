import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles

// Create Document Component
export const PDFDocument = ({ data, columns }) => {
  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            {columns.map((column, index) => (
              <View
                style={{ ...styles.cell, width: getWidth(column.id) }}
                key={index}
              >
                <Text style={styles.text}>{column.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.dataContainer}>
            {data.map((user, index) => {
              return (
                <View key={index} style={styles.dataRow}>
                  {columns.map((column, i) => {
                    const cellData = user[column.id] || index + 1;
                    return (
                      <View
                        key={i}
                        style={{
                          ...styles.cell,
                          width: getWidth(column.id),
                        }}
                      >
                        <Text style={styles.text}>{cellData}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

function getWidth(columnid) {
  switch (columnid) {
    case "srNo":
      return 20;
    case "name":
      return 120;
    case "phone":
      return 80;
    case "email":
      return 150;
    case "load":
      return 50;
    case "loadDuration":
      return 52;
    case "dependency":
      return 70;
    case "inverterType":
      return 70;
    default:
      return 170;
  }
}

const border = "1px solid black";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: "2mm",
    marginVertical: "10mm",
    border: border,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  header: {
    flexDirection: "row",
    borderBottom: border,
  },
  cell: {
    justifyContent: "center",
    borderRight: border,
    padding: 2,
  },
  text: {
    fontSize: 10,
  },
  dataRow: {
    borderBottom: border,
    flexDirection: "row",
  },
});
