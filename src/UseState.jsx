import { useEffect, useState } from 'react';

const SECURITY_CODE = 'milton';

const UseState = ({ name }) => {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({ 
      ...state, 
      loading: false, 
      confirmed: true,
    })
  };

  const onError = () => {
    setState({ 
      ...state, 
      error: true, 
      loading: false,
    })
  };

  const onWrite = (event) => {
    setState({ 
      ...state, 
      value: event.target.value,
    })
  };

  const onCheck = () => {
    setState({ 
      ...state, 
      loading: true, 
      error: false,
    })
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    })
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    })
  };


  useEffect(() => {
    console.log('empezanzo el efecto')

    if(!!state.loading){
      setTimeout(() => {
        console.log('haciendo la validacion')
  
        if(state.value === SECURITY_CODE){
          onConfirm();
        }else{
          onError();
        }

        console.log('terminando la validacion')
      }, 3000)
    };

    console.log('terminando el efecto')
  }, [state.loading]);



  if (!state.deleted, !state.confirmed) {
    return (
      <div className='useStateContainer'>
      <h2>Eliminar {name}</h2>

      <p>Por favor, escribe el codigo de seguridad.</p>

      {state.error && <p>Error: el codigo es incorrecto.</p>}

      {state.loading && <p>cargando...</p>}

      <input 
        placeholder='codigo de seguridad'
        value={state.value}
        onChange={(event) => {
          onWrite(event);
        }}
      />
      <button
        onClick={() => {
          onCheck();
        }}
      >Comprobar</button> 
    </div>
    )
  }else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>¿seguro que quieres eliminar useState?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          si, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
        no
        </button>
      </>
    )
  }else{
    return (
      <>
        <p>Eliminado con exito.</p>

        <button
          onClick={() => {
            onReset();
          }}
        >
        Resetear, volver atras.
        </button>
      </>
    )
  }
};

export { UseState };