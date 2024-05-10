import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const GenerateInvoice = () => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  const [productAdder, setProductAdder] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityState, setQuantityState] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const condicionDePago = ["Pago contra entrega"];


  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);

  const fetchData = async () => {
    try {
      const [clientsResponse, employeesResponse, productsResponse] =
        await Promise.all([
          axios.get("http://localhost:5191/clients/list"),
          axios.get("http://localhost:5191/employees/list"),
          axios.get("http://localhost:5191/products/list"),
        ]);

      setClients(clientsResponse.data);
      setEmployees(employeesResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdder = (e) => {
    console.log("selected");
    console.log(quantityState);
    const productToAdd = {
      IdProduct: selectedProduct.idProduct,
      productName: selectedProduct.productName,
      productPrice: Number(selectedProduct.productPrice),
      quantity: Number(quantityState),
    };

    setTotalPrice(
      totalPrice + productToAdd.productPrice * productToAdd.quantity
    );
    console.log(productToAdd);
    setProductAdder((prevProducts) => [...prevProducts, productToAdd]);
  };

  const handleSubmit = async (e, totalPrice) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    const fechaHoy = new Date();
    const dia = String(fechaHoy.getDate()).padStart(2, "0");
    const mes = String(fechaHoy.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan desde 0
    const ano = fechaHoy.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${ano}`;

    console.log("In request" + totalPrice);

    const invoice = {
      IdClient: payload.client,
      IdEmployee: payload.employee,
      SaleDate: fechaFormateada,
      PaymentMethod: payload.condition,
      totalPrice: totalPrice,
    };

    const invoiceRes = await axios.post(
      "http://localhost:5191/invoices/save",
      invoice
    );

    if (invoiceRes.status !== 200) {
        console.error('Error al crear la factura');
        return;
    }

    const IdInvoice = invoiceRes.data.idInvoice;
    console.log(IdInvoice)

    for (const product of productAdder) {
      const invoiceDetail = {
        "IdInvoice": IdInvoice,
        "IdProduct": product.IdProduct,
        "Quantity": product.quantity,
        "UnitPrice": product.productPrice,
      };

      const detailResponse = await axios.post(
        "http://localhost:5191/invoiceDetail/save",
        invoiceDetail
      );

      // Si algo sale mal al crear un detalle de factura, detén todo
      if (detailResponse.status !== 200) {
        console.error(
          "Error al crear el detalle de factura para el producto",
          product.IdProduct
        );
        return;
      }
    }

    navigate(`/invoice/${IdInvoice}`);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-600 rounded-md p-4 shadow-2xl">
      <h1 className="text-white font-bold p-2">Generar factura</h1>
      <form
        className="flex flex-wrap bg-white p-4 rounded-md space-y-4"
        onSubmit={(event) => handleSubmit(event, totalPrice)}
      >
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="client"
              className="block mb-2 text-sm font-medium text-gray-900 pl-2 pb-0"
            >
              Cliente:
            </label>
            <select
              id="client"
              name="client"
              defaultValue=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Elige un cliente
              </option>
              {clients.map((client) => (
                <option key={client.idClient} value={client.idClient}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <label
              htmlFor="employee"
              className="block mb-2 text-sm font-medium text-gray-900 pl-2 pb-0"
            >
              Empleado:
            </label>
            <select
              id="employee"
              name="employee"
              defaultValue=""
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Elige un empleado
              </option>
              {employees.map((employee) => (
                <option key={employee.idEmployee} value={employee.idEmployee}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-2/6">
            <label
              htmlFor="product"
              className="block mb-2 text-sm font-medium text-gray-900 pl-2 pb-0"
            >
              Product:
            </label>
            <select
              id="product"
              name="product"
              defaultValue="Elige un producto"
              onChange={(e) => {
                const selectedProductId = e.target.value;
                console.log(selectedProductId);
                const currentProduct = products.find(
                  (product) => product.idProduct == selectedProductId
                );
                console.log(currentProduct);
                setSelectedProduct(currentProduct);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue="" disabled>
                Elige un producto
              </option>
              {products.map((product) => (
                <option key={product.idProduct} value={product.idProduct}>
                  {product.productName} precio: {product.productPrice}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 flex justify-between">
            <div className="w-1/2">
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900 pl-2 pb-0"
              >
                Quantity:
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={quantityState || 1}
                onChange={(e) => setQuantityState(Number(e.target.value))}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-1/2 flex justify-between pl-4">
              <button
                type="button"
                className="w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded"
                onClick={handleAdder}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
        {productAdder.length > 0 && (
          <table className="table-auto">
            <thead>
              <tr>
                <th>Nombre del producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productAdder.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>{product.productPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <label
          htmlFor="client"
          className="block mb-2 text-sm font-medium text-gray-900 pl-2 pb-0"
        >
          Condicion de pago:
        </label>
        <select
          id="condition"
          name="condition"
          defaultValue=""
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Elige una condicion de pago
          </option>
          {condicionDePago.map((condicion, index) => (
            <option key={index} value={condicion}>
              {condicion}
            </option>
          ))}
        </select>
        <input
          type="submit"
          id="save"
          value="Guardar"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />

      </form>
    </div>
  );
};
