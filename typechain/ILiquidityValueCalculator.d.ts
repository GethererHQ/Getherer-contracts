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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ILiquidityValueCalculatorInterface extends ethers.utils.Interface {
  functions: {
    "computeLiquidityShareValue(uint256,address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "computeLiquidityShareValue",
    values: [BigNumberish, string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "computeLiquidityShareValue",
    data: BytesLike
  ): Result;

  events: {};
}

export class ILiquidityValueCalculator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ILiquidityValueCalculatorInterface;

  functions: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  computeLiquidityShareValue(
    liquidity: BigNumberish,
    tokenA: string,
    tokenB: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "computeLiquidityShareValue(uint256,address,address)"(
    liquidity: BigNumberish,
    tokenA: string,
    tokenB: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<{
      tokenAAmount: BigNumber;
      tokenBAmount: BigNumber;
      0: BigNumber;
      1: BigNumber;
    }>;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<{
      tokenAAmount: BigNumber;
      tokenBAmount: BigNumber;
      0: BigNumber;
      1: BigNumber;
    }>;
  };

  filters: {};

  estimateGas: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
