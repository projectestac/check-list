import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

/**
 * Login page
 */
class Login extends React.Component {

  state = {
    centre: '',
    centre_err: false,
    pwd: '',
    pwd_err: false,
  };

  handleChange = name => ev => {
    // Filter non-numeric keystrokes
    if (name === 'centre' && (ev.target.value.split('').find(ch => '0123456789'.indexOf(ch) < 0) || ev.target.value.length > 8)) {
      ev.preventDefault();
      return;
    }
    this.setState({
      [name]: ev.target.value,
      centre_err: false,
      pwd_err: false,
    });
  };

  handleBtnClick = ev => {
    ev.preventDefault();

    // Check that the schhol code has 8 characters
    if (this.state.centre.length !== 8) 
      return this.setState({ centre_err: true });

    // Check empty password
    if (!this.state.pwd)
      return this.setState({ pwd_err: true });

    // Notify that the login form is ready to fetch
    this.props.onLogin(this.state.centre, this.state.pwd);
  }

  render() {
    return (
      <div className='main-box'>
        <h1>
          Assistent per a la comprovació d'equipaments TIC
        </h1>
        <form>
          <Paper className='login-box'>
            <TextField
              id='centre'
              className='login-field'
              label='Codi del centre'
              value={this.state.centre}
              onChange={this.handleChange('centre')}
              margin='normal'
              error={this.state.centre_err}
            />
            <TextField
              id='pwd'
              type='password'
              className='login-field'
              label='Contrassenya'
              value={this.state.pwd}
              onChange={this.handleChange('pwd')}
              margin='normal'
              error={this.state.pwd_err}
            />
            <Button
              className='action-btn'
              onClick={this.handleBtnClick}
              variant='contained'
              color='primary'
              type='submit'
            >Entra</Button>
          </Paper>
        </form>
        <div className='login-disclaimer'>
          <p>
            L'objectiu d'aquesta aplicació és ajudar els responsables dels centres educatius
            a verificar el lliurament i correcta instal·lació dels equipaments associats a
            la <strong>transformació TIC en l'àmbit educatiu</strong> dels centres dependents
            del Departament d'Educació.
          </p><p>
            <strong>AVÍS IMPORTANT:</strong><br />
            Aquest assistent està en fase de proves i no té cap connexió directa amb els proveïdors de serveis.
            Tingueu en compte que l'aplicació no es troba encara integrada en el conjunt d'aplicacions
            oficials del Departament d'Educació i no entra en els canals de suport del SAU. Per a qualsevol dubte o
            incidència relacionada amb aquesta aplicació podeu escriure a: <a href="mailto:areatac.educacio@gencat.cat">areatac.educacio@gencat.cat</a>.
          </p><p>
            La introducció de dades a l'assistent no substitueix la necessària signatura dels albarans de lliurament
            i prestació de serveis de les empreses subminstradores.
          </p><p>
            L'anotació de problemes en aquesta aplicació no substutueix l'obertura d'incidències al SAU, que s'han de fer
            pels canals habituals. En tot cas, s'aconsella adjuntar a les incidències el fitxer CSV que genera l'aplicació.
          </p><p>
            <strong>Mode de demostració:</strong><br />
            Per provar l'aplicació en mode de demostració podeu fer servir el centre <strong>12345678</strong> amb contrasenya <strong>demo</strong>.
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
