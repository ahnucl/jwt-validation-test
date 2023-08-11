import * as jose from "jose";
import { useEffect, useState } from "react";

function App() {
  const [valid, setValid] = useState<boolean>(false)
  const [jwtPayloadData, setJwtPayloadData] = useState({})
  const [userInput, setUserInput] = useState('')

  const jwt = new URLSearchParams(document.location.search).get('token')

  useEffect(() => {
    if (jwt) {
      const payload = jose.decodeJwt(jwt)
      setJwtPayloadData({ 
        ...payload,
        expires: new Date((payload.exp ?? 0) * 1000)
      })
    }
  }, [jwt])

  useEffect(() => {
    if (jwt && userInput) {
      const secret = new TextEncoder().encode(userInput)

      jose.jwtVerify(jwt, secret, {
        // audience: 'teste:example:audience',
        // issuer: 'teste:example:issuer'
      })
        .then(() => {
          // console.log('ok', res)
          setValid(true)
        })
        .catch(rej => {
          console.error('not ok', rej)
          setValid(false)
        })
    }
    if (userInput === '') {
      setValid(false)
    }
  }, [jwt, userInput])

  const isPayloadEmpty = Object.keys(jwtPayloadData).length === 0

  return (
    <div className='bg-slate-950 h-screen text-slate-300 flex items-center justify-center'>
      <div className="flex flex-col gap-4 px-6 py-3 bg-slate-800 w-96 min-h-80 border-slate-600 border-solid border-2 rounded-lg shadow-lg shadow-slate-800">
        <div>
          <h2 className='text-xl font-semibold underline mb-4'>Validando JWT</h2>
          
          {jwt && (
            <>
              <div className=''>
                jwt recebido:
              </div>
              <div className='truncate text-yellow-500'>
                {jwt}
              </div>
            </>
          )}
        </div>
        
        {!isPayloadEmpty && (
          <div className="border-t-2 border-slate-600 pt-2">
            <h3 className='text-lg font-medium'>Payload:</h3>

            <div>
              {
                Object.entries(jwtPayloadData).map(([key, value]) => (
                  <div className="" key={key}>
                    <span className="text-sky-500 font-semibold">{key}</span>
                    {`: ${value}`}
                  </div>
                ))
              }
            </div>
          </div>
        )}
          

        <div className="border-t-2 border-slate-600 pt-2">
          <h3 className='text-lg font-medium mb-2'>Validação do Token</h3>

          <div className="flex flex-col gap-3">
            {jwt && (
              <input 
                type="text" 
                className="py-1 px-2 bg-slate-700 rounded border-2 border-slate-600 focus:outline-none focus:border-slate-400"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            )}
            
            <div>
              {valid && (
                <span className="inline-block border-2 border-green-700 bg-green-400 text-black px-2 py-1 rounded">
                  Validado
                </span>
              )}

              {!valid && (
                <span className="inline-block border-2 border-red-700 bg-red-400 text-black px-2 py-1 rounded">
                  {!jwt ? 'Token não encontrado' : 'Não Validado'}
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
