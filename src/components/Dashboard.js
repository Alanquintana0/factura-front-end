import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { BarChart, Bar, Rectangle } from "recharts";

export const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);

  useEffect(() => {
    fetchInvoices();
    fetchInvoiceDetails();
  }, []);

  const fetchInvoices = async (id) => {
    axios
      .get(`http://localhost:5191/invoices/list`)
      .then((obj) => {
        console.log(obj.data);
        setInvoices(obj.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const fetchInvoiceDetails = async (id) => {
    axios
      .get(`http://localhost:5191/invoiceDetail/list`)
      .then((obj) => {
        console.log(obj.data);
        setInvoiceDetails(obj.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const groupByEmployee = (invoices) => {
    const grouped = invoices.reduce((acc, invoice) => {
      if (!acc[invoice.employeeName]) {
        acc[invoice.employeeName] = {
          name: invoice.employeeName,
          totalSales: 0,
        };
      }
      acc[invoice.employeeName].totalSales += invoice.totalPrice;
      return acc;
    }, {});

    for (let employee in grouped) {
      grouped[employee].totalSales = parseFloat(
        grouped[employee].totalSales.toFixed(2)
      );
    }

    return Object.values(grouped);
  };

  const groupedInvoices = groupByEmployee(invoices);

  const getTotalSales = (invoices) => {
    const totalSales = invoices.reduce((acc, invoice) => {
      return acc + invoice.totalPrice;
    }, 0);

    return parseFloat(totalSales.toFixed(2));
  };

  // Uso de la función
  const totalSales = getTotalSales(invoices);
  console.log(totalSales);

  const groupByProduct = (invoiceDetails) => {
    const grouped = invoiceDetails.reduce((acc, detail) => {
      if (!acc[detail.productName]) {
        acc[detail.productName] = {
          name: detail.productName,
          totalSales: 0,
        };
      }
      acc[detail.productName].totalSales += detail.quantity * detail.unitPrice;
      return acc;
    }, {});

    // Formatear totalSales a dos decimales
    for (let product in grouped) {
      grouped[product].totalSales = parseFloat(
        grouped[product].totalSales.toFixed(2)
      );
    }

    return Object.values(grouped);
  };

  // Uso de la función
  const groupedInvoiceDetails = groupByProduct(invoiceDetails);
  console.log(groupedInvoiceDetails);

  const groupByProductQuantity = (invoiceDetails) => {
    const grouped = invoiceDetails.reduce((acc, detail) => {
      if (!acc[detail.productName]) {
        acc[detail.productName] = {
          name: detail.productName,
          totalQuantity: 0,
        };
      }
      acc[detail.productName].totalQuantity += detail.quantity;
      return acc;
    }, {});

    return Object.values(grouped);
  };

  // Uso de la función
  const groupedInvoiceDetailsQuantity = groupByProductQuantity(invoiceDetails);
  console.log(groupedInvoiceDetailsQuantity);

  return (
    <div className="minw-space-x-4 w-full bg-slate-200 mx-auto shadow-2xl p-8 rounded-lg ">
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      <h2>
        <strong>Total de ventas: </strong> ${totalSales}
      </h2>
      <div className="flex justify-between">
        <div className="p-5 bg-white w-1/2">
          <h3 className="text-2xl font-semibold">Ventas por fecha</h3>
          <LineChart
            width={600}
            height={300}
            data={invoices}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="saleDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalPrice"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="p-5 bg-white w-1/2">
          <h3 className="text-2xl font-semibold">Ventas por empleado</h3>
          <BarChart
            width={500}
            height={300}
            data={groupedInvoices}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="totalSales"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </div>
      </div>
      <div className="flex justify-between p-3">
        <div className="p-5 bg-white w-1/2">
          <h3 className="text-2xl font-semibold">Ventas por producto</h3>
          <BarChart
            width={500}
            height={300}
            data={groupedInvoiceDetails}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="totalSales"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </div>
        <div className="p-5 bg-white w-1/2">
          <h3 className="text-2xl font-semibold">Cantidad por producto</h3>
          <BarChart
            width={500}
            height={300}
            data={groupedInvoiceDetailsQuantity}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="totalQuantity"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
};
