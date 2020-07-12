import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl'
import axios from 'axios';
import { Router } from "next/router";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }){
    // Has to be executed at the top of getInitialprops
    // destructure token from cookies.token
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
    }

    if(!token){
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create'
      
      if(isProtectedRoute){
        redirectUser(ctx, '/login')
      }
    } else {
      try {
        // sending payload with a get req
        const payload = { headers: { Authorization: token} }
        const url = `${baseUrl}/api/account`
        const response = await axios.get(url, payload)
        const user = response.data
        // A comparison of role & string root
        const isRoot = user.role === 'root'
        const isAdmin = user.role === 'admin'
        // redirect from '/create' if role is not 'admin' or 'root'
        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create'
        if(isNotPermitted){
          redirectUser(ctx, '/')
        }


        pageProps.user = user;

      } catch(error) {
        console.error("Error getting current user",error);
        // 1) Throw out invalid token
        destroyCookie(ctx, "token")
        // 2) Redirect to login
        redirectUser(ctx, "/login") 
      }
    }
    return { pageProps }
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout)
  }
  syncLogout = event => {
    if(event.key === 'logout'){
      //console.log('logged out from storage')
      Router.push('/login')
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}  

export default MyApp;
