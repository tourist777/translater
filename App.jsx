import logo from './logo.svg';
import './App.css';

//import AntExample from './AntExample/AntExample';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

export function useKeyPress(target) {
  const [isPressed, setPressed] = useState(false)

  useEffect(() => {
    const handleDown = ({ key }) => {
      if (key === target) {
        setPressed(true)
      }
    }

    const handleUp = ({ key }) => {
      if (key === target) {
        setPressed(false)
      }
    }

    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)

    return () => {
      window.removeEventListener('keydown', handleDown)
      window.removeEventListener('keyup', handleUp)
    }
  }, [target])

  return isPressed
}

function App() {

  const [tran, setTran] = useState('');
  const [value, setValue] = useState('Перевести');

  const happy = useKeyPress('h')
  const sad = useKeyPress('s')

  useEffect( () => {

  const url = 'https://text-translator2.p.rapidapi.com/translate';
  const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '5c72893a04msh274588e0e290298p197072jsn3d38ba051b88',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: new URLSearchParams({
		source_language: 'ru',
		target_language: 'en',
		text: value
	})
};

	fetch(url, options)
  .then(response => response.json() )	
  .then( body => setTran(body.data.translatedText) )

  }, [value])

  return (
    <>    
       <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Адрес электронной почты</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Мы никогда никому не передадим вашу электронную почту.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Пароль</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Проверить меня</label>
  </div>
  <button type="submit" className="btn btn-primary">Отправить</button>
</form>  

    <div>
      <h1>{tran}</h1>      
      <input type="text" onChange={(e)=>{
        if(e.target.value != '')
        setValue(e.target.value)
      }}/>      
    </div>

    <div>h, s</div>
      <div>
        {happy && '😊'}
        {sad && '😢'}
      </div>

    </>   
  );
}

export default App;
