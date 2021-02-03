/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface GethererInterface extends ethers.utils.Interface {
  functions: {
    "debugETH()": FunctionFragment;
    "debugToken(address)": FunctionFragment;
    "getEstimatedTokenForETH(uint256,address[])": FunctionFragment;
    "multiswap(address,address[],uint256[])": FunctionFragment;
    "multiswapETH(address)": FunctionFragment;
    "poolswapETH(address,uint256)": FunctionFragment;
    "swap(address,address,uint256)": FunctionFragment;
    "swaporder(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "debugETH", values?: undefined): string;
  encodeFunctionData(functionFragment: "debugToken", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getEstimatedTokenForETH",
    values: [BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multiswap",
    values: [string, string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multiswapETH",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "poolswapETH",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swaporder",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "debugETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "debugToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEstimatedTokenForETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "multiswap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "multiswapETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "poolswapETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swaporder", data: BytesLike): Result;

  events: {};
}

export class Getherer extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: GethererInterface;

  functions: {
    debugETH(
      overrides?: CallOverrides
    ): Promise<{
      ethAmount: BigNumber;
      0: BigNumber;
    }>;

    "debugETH()"(
      overrides?: CallOverrides
    ): Promise<{
      ethAmount: BigNumber;
      0: BigNumber;
    }>;

    debugToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<{
      tokenAmount: BigNumber;
      0: BigNumber;
    }>;

    "debugToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<{
      tokenAmount: BigNumber;
      0: BigNumber;
    }>;

    getEstimatedTokenForETH(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    "getEstimatedTokenForETH(uint256,address[])"(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    multiswap(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "multiswap(address,address[],uint256[])"(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    multiswapETH(
      _token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "multiswapETH(address)"(
      _token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    poolswapETH(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "poolswapETH(address,uint256)"(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    swap(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "swap(address,address,uint256)"(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    swaporder(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      token: string;
      user: string;
      amountOut: BigNumber;
      amounts: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
      3: BigNumber;
    }>;

    "swaporder(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      token: string;
      user: string;
      amountOut: BigNumber;
      amounts: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
      3: BigNumber;
    }>;
  };

  debugETH(overrides?: CallOverrides): Promise<BigNumber>;

  "debugETH()"(overrides?: CallOverrides): Promise<BigNumber>;

  debugToken(_token: string, overrides?: CallOverrides): Promise<BigNumber>;

  "debugToken(address)"(
    _token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getEstimatedTokenForETH(
    amountIn: BigNumberish,
    path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "getEstimatedTokenForETH(uint256,address[])"(
    amountIn: BigNumberish,
    path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  multiswap(
    token: string,
    users: string[],
    amountsIn: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "multiswap(address,address[],uint256[])"(
    token: string,
    users: string[],
    amountsIn: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  multiswapETH(
    _token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "multiswapETH(address)"(
    _token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  poolswapETH(
    _token: string,
    _amountOut: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "poolswapETH(address,uint256)"(
    _token: string,
    _amountOut: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  swap(
    token: string,
    user: string,
    amountIn: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "swap(address,address,uint256)"(
    token: string,
    user: string,
    amountIn: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  swaporder(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    token: string;
    user: string;
    amountOut: BigNumber;
    amounts: BigNumber;
    0: string;
    1: string;
    2: BigNumber;
    3: BigNumber;
  }>;

  "swaporder(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    token: string;
    user: string;
    amountOut: BigNumber;
    amounts: BigNumber;
    0: string;
    1: string;
    2: BigNumber;
    3: BigNumber;
  }>;

  callStatic: {
    debugETH(overrides?: CallOverrides): Promise<BigNumber>;

    "debugETH()"(overrides?: CallOverrides): Promise<BigNumber>;

    debugToken(_token: string, overrides?: CallOverrides): Promise<BigNumber>;

    "debugToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEstimatedTokenForETH(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "getEstimatedTokenForETH(uint256,address[])"(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    multiswap(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "multiswap(address,address[],uint256[])"(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    multiswapETH(_token: string, overrides?: CallOverrides): Promise<void>;

    "multiswapETH(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    poolswapETH(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "poolswapETH(address,uint256)"(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    swap(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "swap(address,address,uint256)"(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    swaporder(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      token: string;
      user: string;
      amountOut: BigNumber;
      amounts: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
      3: BigNumber;
    }>;

    "swaporder(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      token: string;
      user: string;
      amountOut: BigNumber;
      amounts: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
      3: BigNumber;
    }>;
  };

  filters: {};

  estimateGas: {
    debugETH(overrides?: CallOverrides): Promise<BigNumber>;

    "debugETH()"(overrides?: CallOverrides): Promise<BigNumber>;

    debugToken(_token: string, overrides?: CallOverrides): Promise<BigNumber>;

    "debugToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEstimatedTokenForETH(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getEstimatedTokenForETH(uint256,address[])"(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    multiswap(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "multiswap(address,address[],uint256[])"(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    multiswapETH(_token: string, overrides?: Overrides): Promise<BigNumber>;

    "multiswapETH(address)"(
      _token: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    poolswapETH(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "poolswapETH(address,uint256)"(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    swap(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "swap(address,address,uint256)"(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    swaporder(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "swaporder(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    debugETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "debugETH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debugToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "debugToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEstimatedTokenForETH(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getEstimatedTokenForETH(uint256,address[])"(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    multiswap(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "multiswap(address,address[],uint256[])"(
      token: string,
      users: string[],
      amountsIn: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    multiswapETH(
      _token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "multiswapETH(address)"(
      _token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    poolswapETH(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "poolswapETH(address,uint256)"(
      _token: string,
      _amountOut: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    swap(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "swap(address,address,uint256)"(
      token: string,
      user: string,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    swaporder(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "swaporder(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
