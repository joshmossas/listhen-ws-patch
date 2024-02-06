import type { Server as HttpServer,IncomingMessage } from "node:http";
import type { Server as HttpsServer } from "node:https";
import type { Http2Server, Http2SecureServer } from "node:http2";
import type { AddressInfo, Server as RawTcpIpcServer } from "node:net";
import type { GetPortInput } from "get-port-please";
import type { WebSocketHooks } from "crossws";

export type Server =
  | HttpServer
  | HttpsServer
  | Http2Server
  | Http2SecureServer
  | RawTcpIpcServer;

export interface Certificate {
  key: string;
  cert: string;
  passphrase?: string;
}

export interface HTTPSOptions {
  cert?: string;
  key?: string;
  pfx?: string;
  passphrase?: string;
  validityDays?: number;
  domains?: string[];
}

export interface ListenOptions {
  name: string;
  port: GetPortInput;
  hostname: string;
  showURL: boolean;
  baseURL: string;
  open: boolean;
  https: boolean | HTTPSOptions;
  http2: boolean;
  clipboard: boolean;
  isTest: boolean;
  isProd: boolean;
  autoClose: boolean;
  _entry?: string;
  /**
   * Used as main public url to display
   * @default The first public IPV4 address listening to
   */
  publicURL?: string;
  /**
   * Print QR Code for public IPv4 address
   *
   * @default true
   */
  qr?: boolean;
  /**
   * When enabled, listhen tries to listen to all network interfaces
   *
   * @default `false` for development and `true` for production
   */
  public: boolean;
  /**
   * Open a tunnel using https://github.com/unjs/untun
   */
  tunnel?: boolean;
  /**
   * WebSocket Upgrade Handler
   *
   * Input can be an upgrade handler or CrossWS options
   *
   * @experimental CrossWS usage is subject to change
   * @see https://github.com/unjs/crossws
   */
  ws?:
    | boolean
    | Partial<WebSocketHooks>
    | ((req: IncomingMessage, head: Buffer) => void);
}

export type GetURLOptions = Pick<
  Partial<ListenOptions>,
  "baseURL" | "publicURL"
>;

export type ShowURLOptions = Pick<
  Partial<ListenOptions>,
  "baseURL" | "name" | "publicURL" | "qr"
>;

export interface ListenURL {
  url: string;
  type: "local" | "network" | "tunnel";
}

export interface Listener {
  url: string;
  address: AddressInfo;
  server: Server;
  https: false | Certificate;
  close: () => Promise<void>;
  open: () => Promise<void>;
  showURL: (options?: ShowURLOptions) => Promise<void>;
  getURLs: (options?: GetURLOptions) => Promise<ListenURL[]>;
}
