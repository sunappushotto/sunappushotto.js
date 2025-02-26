import {
  JsonRpcBatchProvider,
  StaticJsonRpcProvider
} from '@ethersproject/providers';
import networks from '../networks.json';

const providers = {};

const timeout = 25000;

export default function getProvider(network: string) {
  const url: any = networks[network].rpc[0];
  const connectionInfo = typeof url === 'object' ? {
    ...url,
    timeout,
  } : {
    url,
    timeout,
  };
  if (!providers[network]) providers[network] = new StaticJsonRpcProvider(connectionInfo);
  return providers[network];
}

export function getBatchedProvider(network: string) {
  const url: string = networks[network].rpc[0];
  if (!providers[network]) providers[network] = new JsonRpcBatchProvider({
    url,
  });
  return providers[network];
}
