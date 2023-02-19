import './assets/css/index.css';
import { Header } from './components';

export default function App() {
  return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        ${Header()}
        <main id="content" class="mt-10 d-flex justify-center"></main>
      </div>
    </div>
  `;
}
