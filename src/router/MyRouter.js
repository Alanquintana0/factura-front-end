import React from 'react'

import { Routes, Route, BrowserRouter, NavLink, Navigate } from "react-router-dom"
import { GenerateInvoice } from '../components/GenerateInvoice'
import { Invoice } from '../components/Invoice'
import { Dashboard } from '../components/Dashboard'
import { Header } from '../components/layout/Header'
import { InvoicesTable } from '../components/InvoicesTable'

export const MyRouter = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        
        <Route path="/" element={<Navigate to='/inicio'/>}></Route>
        <Route path="/inicio" element={<GenerateInvoice />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/invoices" element={<InvoicesTable/>}></Route>
        <Route path='/invoice/:id' element={<Invoice/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
