const LogoutAction = (props) => {
    props.setIsSigningOut(true);
    sessionStorage.removeItem("authtoken")
    window.location.href = "/"; //to reload the browser
    return null;
}

export default LogoutAction;