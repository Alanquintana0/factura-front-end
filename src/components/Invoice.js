import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faSearch, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import logo from '../resources/img/createga-text.png'
import axios from "axios";

export const Invoice = (prop) => {

 const items = [
  {"vendedor": "Alan",
  "puesto": "Sale",
  "condiciones": 1000,
  "fechaDeVencimiento": "05/03/2025"}
 ]

 const itemsSale = [
  {
    "cantidad": 1,
    "descripcion": "Ram",
    "precioUnitario": 1000,
    "total_linea": 1000
  }
 ]

 const [data, setData] = useState([]);
 const [dataClient, setDataClient] = useState([]);

 useEffect(() => {
  getData(prop.id)
 }, []);

 const getData = (id) => {
  axios.get(`http://localhost:5191/invoices/get/${id}`)
  .then((result) => {
    setData(result.data)
    console.log(result.data)
  }).catch((err) => {console.log(err)});
 }

 const getClientData = (id) => {
  axios.get(`http://localhost:5191/clients/get/${id}`)
  .then((obj) => {
    console.log(obj.data);
    setDataClient(obj.data);
  }).catch((ex) => {
    console.log(ex);
  })
 }

  return (
    <>
      <div className=" space-x-4 w-2/3 bg-slate-300 mx-auto">
        <div className='flex'>
        <section className="w-full md:w-1/2 xl:w-1/2 p-4 bg-white">
          <h1 className="text-3xl font-bold">Createga</h1>
          <ul className="list-none mb-4">
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

          <ul className="list-none mb-4 text-sm">
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
        <section className="w-full md:w-1/2 xl:w-1/2 p-4 bg-blue-500 text-white">
          <img
            src={logo}
            alt="Logo de la empresa"
            className="w-60 h-auto mb-4"
          />
          <h1 className="text-2xl font-bold">Factura</h1>
          <h3>Facturar a:</h3>
          <ul className="list-none mb-4">
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
        

        <section className='w-auto mx-auto p-4 overflow-auto'>
          <table className="mx-auto max-w-5xl w-full text-left bg-white">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold bg-slate-600 text-white">Vendedor</th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">Puesto</th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">Condiciones de pago</th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">Fecha de vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.vendedor}</td>
                  <td>{item.puesto}</td>
                  <td>{item.condiciones}</td>
                  <td>{item.fechaDeVencimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className='w-auto mx-auto p-4 overflow-auto'>
          <table className="mx-auto max-w-5xl w-full text-left bg-slate-200">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold bg-slate-600 text-white">Cantidad</th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">Descripcion</th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">Precio unitario</th>
                <th className="w-1/4 border-b border-gray-300 py-2 px-4 font-bold  bg-slate-600 text-white">Total de linea</th>
              </tr>
            </thead>
            <tbody>
              {itemsSale.map((item) => (
                <tr key={item.id}>
                  <td>{item.cantidad}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.precioUnitario}</td>
                  <td>{item.total_linea}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        
      </div>
      
    </>
  );
}
