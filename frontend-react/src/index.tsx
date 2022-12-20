import ReactDOM from 'react-dom/client';
import {App} from './routes/App';

/**
 * This is the entry point of the app
 * - the root element is defined in the public/index.html file with the id root
 * 
 * In our index.html file, we define a single "root" object that acts as a container for our React app.
 * In principle, this could be any element of HTML page, but in practice this is almost always a single
 * div in the body of the HTML page. This is because typically, the React app is the entire website/page,
 * and not just a small component of it.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <App />
);
