import React from 'react'

export const Header = () => {
  return (
    <>
        <header className='flex flex-col items-center justify-center mb-5'>
            <div>
                <h2>Facturador</h2>
            </div>

            <div className='flex items-center justify-between flex-wrap'>
                <ul>
                    <li>Imprimir</li>
                    <li>Descargar</li>
                    <li>Enviar</li>
                </ul>
            </div>
        </header>
    </>
  )
}
