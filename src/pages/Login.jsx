import LoginBox from '../components/LoginBox'
import { Helmet } from 'react-helmet-async';

function Login() {
    return (
        <>
            {/* SEO serve a migliorare il posizionamento nei motori di ricerca */}
            <Helmet>
                <title>Login | Nateo Travel</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {/* Pagina di login */}
            <div className="h-full flex items-center justify-center">
                <LoginBox />
            </div>
        </>
    )
}

export default Login