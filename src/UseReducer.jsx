import { useEffect, useReducer} from 'react';

const SECURITY_CODE = 'milton';

const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducerSwitch, initialState);
  
  //actionCreators-------------------------------------------------
  const onConfirm = () => dispatch({ type: actionTypes.confirm });   
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });     
  const onDelete = () => dispatch({ type: actionTypes.deleted });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onWrite = (event) => {
    dispatch({ 
      type: actionTypes.write, 
      payload: event.target.value, 
    });
  };
  //actionCreators--------------------------------------------------

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
        onChange={onWrite}
      />
      <button
        onClick={onCheck}
      >Comprobar</button> 
    </div>
    )
  }else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>¿seguro que quieres eliminar useReducer?</p>
        <button
          onClick={onDelete}
        >
          si, eliminar
        </button>
        <button
          onClick={onReset}
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
          onClick={onReset}
        >
        Resetear, volver atras.
        </button>
      </>
    )
  }
};

export { UseReducer };


const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

//actionTypes-------------------------------------------------------
const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  check: 'CHECK',
  write: 'WRITE',
  deleted: 'DELETED',
  reset: 'RESET',
}
//actionTypes-------------------------------------------------------

const reducerSwitch = (state, action) => {
  switch (action.type){
    case actionTypes.confirm:
      return { 
        ...state, 
        loading: false, 
        confirmed: true,
      }
    case actionTypes.error:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.check:
      return { 
        ...state, 
        loading: true, 
        error: false,
      };
    case actionTypes.write:
      return { 
        ...state, 
        value: action.payload,
      }
    case actionTypes.deleted:
      return {
        ...state,
        deleted: true,
       };
    case actionTypes.reset:
      return {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
      }
    default:
      return initialState;
    };
};
     

// const reducerIf = (state, action) => {
//   if (action.type === 'ERROR'){
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     }
//     }else if(action.type === 'CHECK') {
//       return {
//         ...state,
//         loading: true,
//       }
//     }else{
//       return {
//             ...initialState,  
//       }
//     };
//  };



// const reducerObject = (state, action) => ({
//   'ERROR': {
//     ...state,
//     error: true,
//     loading: false,
//   },
//   'CHECK': {
//     ...state,
//     loading: true,
//   },
// });

// const reducer = (state, action) => {
//   if (reducerObject(state)[action.type]){
//     return reducerObject(state)[action.type];
//   }else {
//     return state;
//   }
// }