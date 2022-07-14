// import {Cookies} from 'react-cookie'

import { getCookie, getCookies, removeCookies, setCookies } from "cookies-next";

export const getServerSideProps = ({ req, res }) => {
    setCookies('test', 'value', { req, res});
    getCookie('test', { req, res});
    getCookies({ req, res});
    removeCookies('test', { req, res});
return { props: {}};
}
