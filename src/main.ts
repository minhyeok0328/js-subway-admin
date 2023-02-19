import { createRoot } from './core/Render';
import App from './App';
import './router';

const $container = document.querySelector('#app');
createRoot($container).render(App);
