import { login } from './utils';
import './index.css';
import React from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// !!! Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// !!! O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// !!! Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// !!! Desabilite o botão de Login equanto você está executando o login.
// !!! Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [showButton, setShowButton] = React.useState(false);

  const handleEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = () => {
    setError(null); // Sempre que sair do catch o erro irá voltar a ser nulo, que fará ele sumir da tela. Se a nova tentativa de login falhar, o erro irá sair e voltar rapidamente.
    setShowButton(true);

    let values = { email: email, password: password };
    login(values)
      .then(() => {
        alert('Login successful!');
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        // irá executar não importa o resultado da promisse
        setShowButton(false);
      });
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && <div className="errorMessage"> {error.message} </div>}
        <div className="row">
          <label htmlFor={'email'}>Email</label>
          <input
            value={email}
            onChange={handleEmail}
            id={'email'}
            type={'email'}
            autoComplete="off"
          />
        </div>
        <div className="row">
          <label htmlFor={'password'}>Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id={'password'}
            type={'password'}
          />
        </div>

        <div className="button">
          <button
            disabled={email === '' || password.length < 6 || showButton}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
