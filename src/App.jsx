import './App.css'

import * as React from 'react'
import { useTable } from 'react-table'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const fakeData = JSON.parse(localStorage.getItem('reminders'))
  const data = React.useMemo(() => fakeData, [fakeData])
  const columns = React.useMemo(
    () => [
      {
        Header: 'Номер',
        accessor: 'id'
      },
      {
        Header: 'Статус',
        accessor: 'status'
      },
      {
        Header: 'Краткое описание',
        accessor: 'short_text'
      },
      {
        Header: 'Дата и время создания',
        accessor: 'creation_time'
      },
      {
        Header: 'Дата и время выполнения',
        accessor: 'execution_time'
      }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <div className='flex flex-row justify-center items-center relative h-[100vh]'>
      <Outlet />

      <div className=' h-full w-[60%] flex flex-row justify-center items-center'>
        <table {...getTableProps()} className='container flex flex-row justify-center items-center h-[60vh]'>
          <div>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th key={i} {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr key={i} onDoubleClick={() => navigate(`/reminders/${i + 1}`, { replace: false })} {...row.getRowProps()}>
                    {row.cells.map((cell, i) => (
                      <td key={i} {...cell.getCellProps()}>
                        {' '}
                        {cell.render('Cell')}{' '}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </div>
        </table>
      </div>
    </div>
  )
}

export default App
