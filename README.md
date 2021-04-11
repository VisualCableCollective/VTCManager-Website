# VTCManager-Website
This repository contains the source code for the [VTCManager website](https://vtcmanager.eu/). The website is based on the [React Javascript library](https://reactjs.org/) and interacts with the [VTCManager API](https://github.com/VisualCableCollective/VTCManager-API).

## About the VTCManager project
VTCManager is a powerful job logger for the [Euro Truck Simulator 2 (ETS2)](https://eurotrucksimulator2.de/) and [American Truck Simulator (ATS)](https://americantrucksimulator.com/) by [SCS Software](https://scssoft.com/). It extends the gaming experience of ETS2 and ATS. In addition to the normal logging of orders for Virtual Trucking Companies (VTC), the software adds many other functions such as a convoy assistant, support for external electronic components (displays, microcomputers such as Raspberry Pi or Arduino for external speedometers, dashboards, and buttons) and much more.

### VTCManager Project Status
The latest version of the VTCManager is currently in public beta. The basic functions are functional, but may still contain errors.

## Additional packages used in this project
- [Tailwind CSS](https://tailwindcss.com/): CSS Framework
- [@craco/craco](https://www.npmjs.com/package/@craco/craco): Required by TailwindCSS
- [react-router-dom](https://reactrouter.com/web/): Routing
- [victory](https://formidable.com/open-source/victory/): Charting and data visualization
- [react-number-format](https://www.npmjs.com/package/react-number-format): Easy number formating (for more human-readable numbers)
- [react-paginate](https://www.npmjs.com/package/react-paginate): Pagination

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
