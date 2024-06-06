import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'milton';

class ClassState extends React.Component {
  constructor(props){//Para crear un estado se llama al constructor de la clase.
    super(props);//Si modificamos this en una clase llamamos al contructor(), pero queremos que lo que haya hecho la clase de la que estamos extendiendo siga funcionando, tenemos que llamar desde el contructor a super() y las props que reciba el contructor tambien se le deben enviar a seper().

    this.state = {
      value: '',
      error: false,
      loading: false,
    };
  }

  UNSAFE_componentWillMount() {
    console.log('componentWillMount')
  };

  componentDidMount() {
    console.log('componentDidMount')
  };

  componentDidUpdate() {
    console.log('componentDidUpdate')

    if(!!this.state.loading){
      setTimeout(() => {
        console.log('haciendo la validacion')
  
        if(this.state.value === SECURITY_CODE){
          this.setState({ loading: false })
        }else{
          this.setState({ error: true, loading: false})
        }

        console.log('terminando la validacion')
      }, 3000)
    }
  };

  render () {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor, escribe el codigo de seguridad.</p>

        {this.state.error && (<p>Error: el codigo es incorrecto.</p>)}

        {this.state.loading && <Loading/>}

        <input 
          placeholder='codigo de seguridad'
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value })
          }}
        />
        <button
          onClick={() => this.setState({ loading: true, error: false })}
        >Comprobar</button>
      </div>
    )
  }
};

export { ClassState };