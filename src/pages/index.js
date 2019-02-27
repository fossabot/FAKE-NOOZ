import Loadable from 'react-loadable';
import loading from '../components/Loading';

export const Home = Loadable({
    loader: () => import('./Home'),
    loading
});

export { default as About } from './About';

export const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading
});
