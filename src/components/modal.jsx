import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Modal() {
  const navigate = useNavigate()

  const location = useLocation()
  const index = location.pathname.substring(location.pathname.length - 1)
  const fakeData = JSON.parse(localStorage.getItem('reminders'))
  const data = fakeData.find((r) => r.id == index)
  const [shortText, setShortText] = React.useState(data.short_text)
  const [fullText, setFullText] = React.useState(data.full_text)
  const [date, setDate] = React.useState(data.creation_time.split(', ')[0])
  const [time, setTime] = React.useState(data.creation_time.split(', ')[1])
  const [dateExecution, setDateExecution] = React.useState(data.execution_time.split(', ')[0])
  const [timeExecution, setTimeExecution] = React.useState(data.execution_time.split(', ')[1])
  const [status, setStatus] = React.useState(data.status)
  return (
    <div className='flex flex-col justify-around bg-[grey]  opacity-95 z-[100]  p-[30px]  w-[650px] h-[400px] m-auto absolute left-[calc(50% - 200px)] top-[calc(50% - 200px)]'>
      <div className=''>
        <div className='flex flex-row justify-around w-full'>
          <div className='border-white border'>
            <p>Дата и время создания</p>
            <input
              type='date'
              value={date}
              className='border-b-[2px] border-black outline-none bg-transparent mr-[10px]'
              onChange={(e) => setDate(new Date(e.target.value).toISOString().substring(0, 10))}
            />
            <input
              type='time'
              value={time}
              className=' outline-none bg-transparent border-b-[2px] border-black'
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className='border-white border'>
            <p>Дата и время выполнения</p>
            <input
              type='date'
              value={dateExecution}
              className='border-b-[2px] border-black outline-none bg-transparent mr-[10px]'
              onChange={(e) => setDateExecution(new Date(e.target.value).toISOString().substring(0, 10))}
            />
            <input
              type='time'
              value={timeExecution}
              className=' outline-none border-b-[2px] border-black bg-transparent'
              onChange={(e) => setTimeExecution(e.target.value)}
            />
          </div>
          <div className='border-white border'>
            <p>Статус</p>
            <select
              className='border-none outline-none bg-transparent '
              id='status'
              name='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='Новый'>Новый</option>
              <option value='Исполнен'>Исполнен</option>
              <option value='Запланирован'>Запланирован</option>
              <option value='Просрочен'>Просрочен</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <p>Краткое описание</p>​
        <textarea
          className='w-full h-[30px] rounded-[4px] p-[4px]'
          onChange={(e) => setShortText(e.target.value)}
          value={shortText}
        ></textarea>
      </div>
      <div>
        <p>Полное описание</p>​
        <textarea
          className='w-full h-[120px] rounded-[4px] p-[4px]'
          onChange={(e) => setFullText(e.target.value)}
          value={fullText}
        ></textarea>
      </div>

      <button
        className='bg-white w-[80px] h-[30px] rounded-[15px] mx-auto'
        onClick={() => {
          localStorage.setItem(
            'reminders',
            JSON.stringify(
              [
                {
                  ...data,
                  short_text: shortText || data.short_text,
                  full_text: fullText,
                  status,
                  creation_time: `${date}, ${time}`,
                  execution_time: `${dateExecution}, ${timeExecution}`
                },
                ...fakeData.filter((r) => r.id != index)
              ].sort(function (a, b) {
                return parseFloat(a.id) - parseFloat(b.id)
              })
            )
          )
          navigate(`/`, { replace: true })
        }}
      >
        Назад
      </button>
    </div>
  )
}

export default Modal
