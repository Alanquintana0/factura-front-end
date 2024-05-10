import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const InvoicesTable = () => {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetchInvoices();
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

  return (
    <div className="minw-space-x-4 w-2/3 bg-slate-300 mx-auto shadow-2xl p-8 rounded-lg ">
        <section className="w-auto mx-auto p-4 overflow-auto">
          <table className="mx-auto max-w-5xl w-full text-left bg-white">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold bg-slate-600 text-white">
                  Id Factura
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Cliente
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Vendedor
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Total de venta
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Fecha de venta
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((item) => (
                <tr key={item.idInvoice}>
                  <td className="border border-gray-300 px-4 py-2">
                  <Link to={"/invoice/"+item.idInvoice}>{item.idInvoice}</Link>
                </td>
                  <td className="border border-gray-300 px-4 py-2">{item.clientName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.employeeName}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.totalPrice}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.saleDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
    </div>
  )
}
