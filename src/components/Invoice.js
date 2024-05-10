import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faSearch,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../resources/img/createga-text.png";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Invoice = () => {

  const prop = useParams()
  const items = [
    {
      vendedor: "Alan",
      puesto: "Sale",
      condiciones: 1000,
      fechaDeVencimiento: "05/03/2025",
    },
  ];

  const itemsSale = [
    {
      cantidad: 1,
      descripcion: "Ram",
      precioUnitario: 1000,
      total_linea: 1000,
    },
  ];

  const [data, setData] = useState([]);
  const [dataClient, setDataClient] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataInvoiceDetail, setDataInvoiceDetail] = useState([])
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(prop.id);
    getData(prop.id);
  }, []);

  useEffect(() => {
    getClientData(data.idClient);
    getEmployeeData(data.idEmployee)
    getInvoiceDetailData(data.idInvoice)
  }, [data]);

  const getData = async (id) => {
    axios
      .get(`http://localhost:5191/invoices/get/${id}`)
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getClientData = async (id) => {
    axios
      .get(`http://localhost:5191/clients/get/${id}`)
      .then((obj) => {
        console.log(obj.data);
        setDataClient(obj.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const getEmployeeData =  async (id) => {
    axios
      .get(`http://localhost:5191/employees/get/${id}`)
      .then((obj) => {
        console.log(obj.data);
        setDataEmployee(obj.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const getInvoiceDetailData = async(idInvoice) => {
    axios
      .get(`http://localhost:5191/invoiceDetail/list/${idInvoice}`)
      .then((obj) => {
        console.log(obj.data);
        setDataInvoiceDetail(obj.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  return (
    <>
      <div className="minw-space-x-4 w-2/3 bg-slate-300 mx-auto shadow-2xl p-8 rounded-lg ">
        <div className="flex">
          <section className="w-full md:w-1/2 xl:w-1/2 p-4 bg-white shadow-md">
            <h1 className="text-4xl font-bold">Createga</h1>
            <ul className="list-none mb-4 space-y-2">
              <li className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-lg mr-2"
                ></FontAwesomeIcon>
                <span>6145351814</span>
              </li>
              <li className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-lg mr-2"
                ></FontAwesomeIcon>
                <span>createga.mx</span>
              </li>
              <li className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-lg mr-2"
                ></FontAwesomeIcon>
                <span>Correo electronico</span>
              </li>
              <li className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-lg mr-2"
                ></FontAwesomeIcon>
                <span>Direccion</span>
              </li>
            </ul>

            <ul className="list-none mb-4 text-sm space-y-1">
              <li className="flex items-center mb-1">
                <span>
                  No. de factura: <strong>{data.idInvoice}</strong>
                </span>
              </li>
              <li className="flex items-center mb-1">
                <span>
                  Fecha de factura: <strong>{data.saleDate}</strong>
                </span>
              </li>
              <li className="flex items-center mb-1">
                <span>
                  Id. del cliente: <strong>{data.idClient}</strong>
                </span>
              </li>
            </ul>
          </section>
          <section className="w-full md:w-1/2 xl:w-1/2 p-4 bg-blue-600 text-white shadow-md">
            <img
              src={logo}
              alt="Logo de la empresa"
              className="w-60 h-auto mb-4"
            />
            <h1 className="text-3xl font-bold">Factura</h1>
            <h3 className="text-xl">Facturar a:</h3>
            <ul className="list-none mb-4 space-y-2">
              <li className="flex items-center mb-2">
                <span>Nombre de la empresa:</span>
                <span className="ml-2">{dataClient.clientName}</span>
              </li>
              <li className="flex items-center mb-2">
                <span>Dirección de la empresa:</span>
                <span className="ml-2">{dataClient.clientAddress}</span>
              </li>
              <li className="flex items-center mb-2">
                <span>Teléfono:</span>
                <span className="ml-2">{dataClient.clientPhoneNumber}</span>
              </li>
            </ul>
          </section>
        </div>

        <section className="w-auto mx-auto p-4 overflow-auto">
          <table className="mx-auto max-w-5xl w-full text-left bg-white">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold bg-slate-600 text-white">
                  Vendedor
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Puesto
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Condiciones de pago
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Fecha de vencimiento
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">{dataEmployee.employeeName}</td>
                  <td className="border border-gray-300 px-4 py-2">{dataEmployee.employeePosition}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.paymentMethod}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.saleDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="w-auto mx-auto p-4 overflow-auto">
          <table className="mx-auto max-w-5xl w-full text-left bg-slate-200">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold bg-slate-600 text-white">
                  Cantidad
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Descripcion
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Precio unitario
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Total de linea
                </th>
              </tr>
            </thead>
            <tbody>
              {dataInvoiceDetail.map((item) => (
                <tr key={item.idInvoiceDetails}>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.unitPrice}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity * item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="w-auto mx-auto p-4 overflow-auto flex justify-end items-end">
          <table className="ml-auto max-w-5xl w-1/3 text-left bg-slate-200">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Subtotal
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  IVA
                </th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{Number((data.totalPrice) * 0.84).toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{Number((data.totalPrice) * 0.16).toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{Number(data.totalPrice).toFixed(2)}</td>
                </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};
