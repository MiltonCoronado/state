import { UseState } from './UseState.jsx';
import { ClassState } from './ClassState.jsx';
import { UseReducer } from './UseReducer.jsx';
import './App.css';

function App() {
  return (
    <div className='App'>
      <UseState
        name='UseState'
      />
      <ClassState
        name='ClassState'
      />
      <UseReducer
        name='UseReducer'
      />
    </div>
  )
}

export { App };
