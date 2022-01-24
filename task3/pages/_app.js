import '../styles/global.css'
import MAXFRAI2 from './MAXFRAI2';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css' //app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <div>


            <MAXFRAI2 />
        </div>
    )
}


//<Component {...pageProps} />