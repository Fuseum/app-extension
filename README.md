# Fuseum - Empowering E-commerce with Cryptocurrency Integration

## Overview

Welcome to Fuseum, an ambitious open-source browser extension meticulously crafted by Esol Labs. Fuseum, powered by SUI (Sui Network), stands as a groundbreaking initiative poised to revolutionize the realms of e-commerce and cryptocurrency. This extension is designed with a singular purpose: to seamlessly integrate cryptocurrencies, breathing life into their real-world utility by extending Amazon's payment capabilities.

## Tech Stack

Fuseum is a React project bundled with Vite and ICRXJS (Inter-chain React Extension Library), combining cutting-edge technologies to ensure a robust and efficient user experience.

## Project Objectives

1. **Automated Crypto to Voucher Conversion:** Fuseum excels at automating the conversion of deposited cryptocurrencies into practical vouchers, thereby facilitating seamless transactions on Amazon and other major e-commerce platforms.

2. **Real-world Usage for Cryptocurrencies:** Beyond the technical prowess, Fuseum aspires to serve as a bridge between crypto assets and everyday e-commerce transactions, bringing tangible, practical usage to the realm of cryptocurrencies.

## Scripts

Reserve localhost port 3000 when running this source. In the project directory, leverage the following scripts:

### `yarn dev`

This script builds the app in development mode, creating a `dist` folder, an unpacked version of the extension. To load Fuseum into Chrome, zip the `dist` folder after the build process. Navigate to Chrome's extension management page, activate developer mode, click "Load unpacked," and upload your zip file to install it.

The extension pages dynamically reload with changes. To view the console log of its service worker, click the "Inspect views" link. For popup pages' consoles, inspect them as you would other browser tabs when opened.

### `yarn build`

Building the app in production mode, this script creates a minified `dist` folder, ensuring efficient and secure transactions.

## Usage Permissions

Fuseum is an open-source project, extending an invitation to all parties to view, use, and customize it. However, kindly note that this project is not intended for commercial use.

## Feedback

We value your feedback! Whether you have comments, suggestions, or questions, feel free to reach out to us at hello@esollabs.com. Together, let's shape the future of e-commerce and cryptocurrency integration.
