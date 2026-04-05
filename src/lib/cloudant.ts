import { CloudantV1 } from '@ibm-cloud/cloudant';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';

if (!process.env.CLOUDANT_APIKEY || !process.env.CLOUDANT_URL) {
  throw new Error("Missing IBM Cloudant credentials in environment variables.");
}

// Initialize the Cloudant service using IAM authentication
const authenticator = new IamAuthenticator({
  apikey: process.env.CLOUDANT_APIKEY,
});

const cloudant = CloudantV1.newInstance({
  authenticator: authenticator,
});

cloudant.setServiceUrl(process.env.CLOUDANT_URL);

export default cloudant;
