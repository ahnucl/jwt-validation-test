import * as jose from 'jose'

const payload = {
  name: 'Leonardo',
  status: 'ok'
}

const secretString = String(Math.trunc(Math.random() * 100)).padStart(2, '0')

const secret = new TextEncoder().encode(secretString)

const jwt = await new jose.SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  // .setIssuer('teste:example:issuer')
  // .setAudience('teste:example:audience')
  .setExpirationTime('1d')
  .sign(secret)


function App() {
  return (
    <div className='bg-slate-950 h-screen text-slate-300 flex items-center justify-center'>
      <div className="flex flex-col justify-between px-6 py-3 bg-slate-800 w-96 h-80 border-slate-600 border-solid border-2 rounded-lg shadow-lg shadow-slate-800">
        <div>
          <h2 className='text-xl font-semibold underline mb-4'>Steps:</h2>
          <div className='flex gap-2'>
            <input type="checkbox" checked readOnly />
            <p>Configurar JWT</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" checked readOnly />
            <p>Subir outra aplicação em outra porta</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" checked readOnly />
            <p>Criar link na primeira para a segunda</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" checked readOnly />
            <p>Verificar token na segunda</p>
          </div>
        </div>
        
        <div className="border-t-2 border-slate-600 pt-2">
          <p>Criptografei o token com um segredo de dois dígitos</p>
          <p>Formato - "XX", de 0 a 9</p>
          <p>Tenta descobrir o segredo na&nbsp;
            <a 
              className='font-semibold text-sky-500 hover:underline'
              href={`http://localhost:5174?token=${jwt}`}
              target='_blank'
            >
            outra janela
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
