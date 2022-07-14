"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
function walletConnect(options) {
    var _this = this;
    var _a = options || {}, _b = _a.bridge, bridge = _b === void 0 ? 'https://bridge.walletconnect.org' : _b, qrcodeModalOptions = _a.qrcodeModalOptions, connectFirstChainId = _a.connectFirstChainId;
    return function () {
        return {
            label: 'WalletConnect',
            getIcon: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./icon.js'); })];
                    case 1: return [2 /*return*/, (_a.sent())["default"]];
                }
            }); }); },
            getInterface: function (_a) {
                var chains = _a.chains, EventEmitter = _a.EventEmitter;
                return __awaiter(_this, void 0, void 0, function () {
                    var StaticJsonRpcProvider, _b, ProviderRpcError, ProviderRpcErrorCode, WalletConnect, QRCodeModal, _c, Subject, fromEvent, _d, takeUntil, take, connector, emitter, EthProvider;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('@ethersproject/providers'); })];
                            case 1:
                                StaticJsonRpcProvider = (_e.sent()).StaticJsonRpcProvider;
                                return [4 /*yield*/, Promise.resolve().then(function () { return require('@web3-onboard/common'); })];
                            case 2:
                                _b = _e.sent(), ProviderRpcError = _b.ProviderRpcError, ProviderRpcErrorCode = _b.ProviderRpcErrorCode;
                                return [4 /*yield*/, Promise.resolve().then(function () { return require('@walletconnect/client'); })];
                            case 3:
                                WalletConnect = (_e.sent())["default"];
                                return [4 /*yield*/, Promise.resolve().then(function () { return require('@walletconnect/qrcode-modal'); })];
                            case 4:
                                QRCodeModal = _e.sent();
                                // @ts-ignore - TS thinks that there is no default property on the `QRCodeModal` but sometimes there is
                                QRCodeModal = QRCodeModal["default"] || QRCodeModal;
                                return [4 /*yield*/, Promise.resolve().then(function () { return require('rxjs'); })];
                            case 5:
                                _c = _e.sent(), Subject = _c.Subject, fromEvent = _c.fromEvent;
                                return [4 /*yield*/, Promise.resolve().then(function () { return require('rxjs/operators'); })];
                            case 6:
                                _d = _e.sent(), takeUntil = _d.takeUntil, take = _d.take;
                                connector = new WalletConnect({
                                    bridge: bridge
                                });
                                emitter = new EventEmitter();
                                EthProvider = /** @class */ (function () {
                                    function EthProvider(_a) {
                                        var connector = _a.connector, chains = _a.chains;
                                        var _this = this;
                                        this.emit = emitter.emit.bind(emitter);
                                        this.on = emitter.on.bind(emitter);
                                        this.removeListener = emitter.removeListener.bind(emitter);
                                        this.connector = connector;
                                        this.chains = chains;
                                        this.disconnected$ = new Subject();
                                        this.providers = {};
                                        // listen for session updates
                                        fromEvent(this.connector, 'session_update', function (error, payload) {
                                            if (error) {
                                                throw error;
                                            }
                                            return payload;
                                        })
                                            .pipe(takeUntil(this.disconnected$))
                                            .subscribe({
                                            next: function (_a) {
                                                var params = _a.params;
                                                var _b = params[0], accounts = _b.accounts, chainId = _b.chainId;
                                                _this.emit('accountsChanged', accounts);
                                                _this.emit('chainChanged', "0x".concat(chainId.toString(16)));
                                            },
                                            error: console.warn
                                        });
                                        // listen for disconnect event
                                        fromEvent(this.connector, 'disconnect', function (error, payload) {
                                            if (error) {
                                                throw error;
                                            }
                                            return payload;
                                        })
                                            .pipe(takeUntil(this.disconnected$))
                                            .subscribe({
                                            next: function () {
                                                _this.emit('accountsChanged', []);
                                                _this.disconnected$.next(true);
                                                typeof localStorage !== 'undefined' &&
                                                    localStorage.removeItem('walletconnect');
                                            },
                                            error: console.warn
                                        });
                                        this.disconnect = function () { return _this.connector.killSession(); };
                                        this.request = function (_a) {
                                            var method = _a.method, params = _a.params;
                                            return __awaiter(_this, void 0, void 0, function () {
                                                var chainId, currentChain;
                                                var _this = this;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            if (method === 'eth_chainId') {
                                                                return [2 /*return*/, "0x".concat(this.connector.chainId.toString(16))];
                                                            }
                                                            if (method === 'eth_requestAccounts') {
                                                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                                                        // Check if connection is already established
                                                                        if (!_this.connector.connected) {
                                                                            // create new session
                                                                            _this.connector.createSession(connectFirstChainId ? { chainId: parseInt(chains[0].id, 16) } : undefined).then(function () {
                                                                                QRCodeModal.open(_this.connector.uri, function () {
                                                                                    return reject(new ProviderRpcError({
                                                                                        code: 4001,
                                                                                        message: 'User rejected the request.'
                                                                                    }));
                                                                                }, qrcodeModalOptions);
                                                                            });
                                                                        }
                                                                        else {
                                                                            var _a = _this.connector.session, accounts = _a.accounts, chainId_1 = _a.chainId;
                                                                            _this.emit('chainChanged', "0x".concat(chainId_1.toString(16)));
                                                                            return resolve(accounts);
                                                                        }
                                                                        // Subscribe to connection events
                                                                        fromEvent(_this.connector, 'connect', function (error, payload) {
                                                                            if (error) {
                                                                                throw error;
                                                                            }
                                                                            return payload;
                                                                        })
                                                                            .pipe(take(1))
                                                                            .subscribe({
                                                                            next: function (_a) {
                                                                                var params = _a.params;
                                                                                var _b = params[0], accounts = _b.accounts, chainId = _b.chainId;
                                                                                _this.emit('accountsChanged', accounts);
                                                                                _this.emit('chainChanged', "0x".concat(chainId.toString(16)));
                                                                                QRCodeModal.close();
                                                                                resolve(accounts);
                                                                            },
                                                                            error: reject
                                                                        });
                                                                    })];
                                                            }
                                                            if (method === 'wallet_switchEthereumChain' ||
                                                                method === 'eth_selectAccounts') {
                                                                throw new ProviderRpcError({
                                                                    code: ProviderRpcErrorCode.UNSUPPORTED_METHOD,
                                                                    message: "The Provider does not support the requested method: ".concat(method)
                                                                });
                                                            }
                                                            // @ts-ignore
                                                            if (method === 'eth_sendTransaction') {
                                                                // @ts-ignore
                                                                return [2 /*return*/, this.connector.sendTransaction(params[0])];
                                                            }
                                                            // @ts-ignore
                                                            if (method === 'eth_signTransaction') {
                                                                // @ts-ignore
                                                                return [2 /*return*/, this.connector.signTransaction(params[0])];
                                                            }
                                                            // @ts-ignore
                                                            if (method === 'personal_sign') {
                                                                // @ts-ignore
                                                                return [2 /*return*/, this.connector.signPersonalMessage(params)];
                                                            }
                                                            // @ts-ignore
                                                            if (method === 'eth_sign') {
                                                                // @ts-ignore
                                                                return [2 /*return*/, this.connector.signMessage(params)];
                                                            }
                                                            // @ts-ignore
                                                            if (method === 'eth_signTypedData') {
                                                                // @ts-ignore
                                                                return [2 /*return*/, this.connector.signTypedData(params)];
                                                            }
                                                            if (method === 'eth_accounts') {
                                                                return [2 /*return*/, this.connector.sendCustomRequest({
                                                                        id: 1337,
                                                                        jsonrpc: '2.0',
                                                                        method: method,
                                                                        params: params
                                                                    })];
                                                            }
                                                            return [4 /*yield*/, this.request({ method: 'eth_chainId' })];
                                                        case 1:
                                                            chainId = _b.sent();
                                                            if (!this.providers[chainId]) {
                                                                currentChain = chains.find(function (_a) {
                                                                    var id = _a.id;
                                                                    return id === chainId;
                                                                });
                                                                if (!currentChain) {
                                                                    throw new ProviderRpcError({
                                                                        code: ProviderRpcErrorCode.CHAIN_NOT_ADDED,
                                                                        message: "The Provider does not have a rpcUrl to make a request for the requested method: ".concat(method)
                                                                    });
                                                                }
                                                                this.providers[chainId] = new StaticJsonRpcProvider(currentChain.rpcUrl);
                                                            }
                                                            return [2 /*return*/, this.providers[chainId].send(method, 
                                                                // @ts-ignore
                                                                params)];
                                                    }
                                                });
                                            });
                                        };
                                    }
                                    return EthProvider;
                                }());
                                return [2 /*return*/, {
                                        provider: new EthProvider({ chains: chains, connector: connector })
                                    }];
                        }
                    });
                });
            }
        };
    };
}
exports["default"] = walletConnect;
