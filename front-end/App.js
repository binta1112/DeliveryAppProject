
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppRootComponent from './RootComponent';

export default function App() {
  return (
    <Provider store={store}>
      <AppRootComponent />
    </Provider>
  );
}