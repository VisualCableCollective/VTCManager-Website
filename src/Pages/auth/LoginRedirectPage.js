import React, { useEffect } from 'react';
import HTTPRequestUtils from "../../Utils/HTTPRequestUtils";

const LoginPage = (props) => {
    useEffect(() => {
        props.setIsRedirecting(true);
        window.location.href = HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.AuthRedirect);
    }, [props]);

    return (
      <div className="h-screen w-100 flex items-center justify-center">
          <div>
              <h1 className="text-3xl">Redirecting to the VCC Cloud</h1>
              <p className="text-white text-opacity-75 pt-1 text-center">Please wait...</p>
          </div>
      </div>
    );
}

export default LoginPage;