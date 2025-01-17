## API Report File for "@fluidframework/synthesize"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { IFluidObject } from '@fluidframework/core-interfaces';

// @public
export type AsyncFluidObjectProvider<O extends keyof IFluidObject, R extends keyof IFluidObject> = AsyncOptionalFluidObjectProvider<O> & AsyncRequiredFluidObjectProvider<R>;

// @public
export type AsyncOptionalFluidObjectProvider<T extends keyof IFluidObject> = {
    [P in T]: Promise<IFluidObject[P] | undefined>;
};

// @public
export type AsyncRequiredFluidObjectProvider<T extends keyof IFluidObject> = {
    [P in T]: Promise<NonNullable<IFluidObject[P]>>;
};

// @public
export class DependencyContainer implements IFluidDependencySynthesizer {
    constructor(parent?: IFluidDependencySynthesizer | undefined);
    getProvider<T extends keyof IFluidObject>(type: T): FluidObjectProvider<T> | undefined;
    has(...types: (keyof IFluidObject)[]): boolean;
    // (undocumented)
    get IFluidDependencySynthesizer(): this;
    // (undocumented)
    parent: IFluidDependencySynthesizer | undefined;
    register<T extends keyof IFluidObject>(type: T, provider: FluidObjectProvider<T>): void;
    get registeredTypes(): Iterable<(keyof IFluidObject)>;
    synthesize<O extends IFluidObject, R extends IFluidObject = {}>(optionalTypes: FluidObjectSymbolProvider<O>, requiredTypes: FluidObjectSymbolProvider<R>): AsyncFluidObjectProvider<FluidObjectKey<O>, FluidObjectKey<R>>;
    unregister<T extends keyof IFluidObject>(type: T): void;
}

// @public
export type DependencyContainerRegistry = Iterable<ProviderEntry<any>>;

// @public (undocumented)
export type FluidObjectKey<T extends IFluidObject> = keyof T & keyof IFluidObject;

// @public
export type FluidObjectProvider<T extends keyof IFluidObject> = NonNullableFluidObject<T> | Promise<NonNullableFluidObject<T>> | ((dependencyContainer: DependencyContainer) => NonNullableFluidObject<T>) | ((dependencyContainer: DependencyContainer) => Promise<NonNullableFluidObject<T>>);

// @public
export type FluidObjectSymbolProvider<T extends IFluidObject> = {
    [P in FluidObjectKey<T>]: FluidObjectKey<T> & P;
};

// @public (undocumented)
export const IFluidDependencySynthesizer: keyof IProvideFluidDependencySynthesizer;

// @public
export interface IFluidDependencySynthesizer extends IProvideFluidDependencySynthesizer {
    getProvider<T extends keyof IFluidObject>(type: T): FluidObjectProvider<T> | undefined;
    has(...types: (keyof IFluidObject)[]): boolean;
    register<T extends keyof IFluidObject>(type: T, provider: FluidObjectProvider<T>): void;
    readonly registeredTypes: Iterable<(keyof IFluidObject)>;
    synthesize<O extends IFluidObject, R extends IFluidObject>(optionalTypes: FluidObjectSymbolProvider<O>, requiredTypes: FluidObjectSymbolProvider<R>): AsyncFluidObjectProvider<FluidObjectKey<O>, FluidObjectKey<R>>;
    unregister<T extends keyof IFluidObject>(type: T): void;
}

// @public (undocumented)
export interface IProvideFluidDependencySynthesizer {
    // (undocumented)
    IFluidDependencySynthesizer: IFluidDependencySynthesizer;
}

// @public
export type NonNullableFluidObject<T extends keyof IFluidObject> = NonNullable<IFluidObject[T]>;

// @public
export interface ProviderEntry<T extends keyof IFluidObject> {
    // (undocumented)
    provider: FluidObjectProvider<T>;
    // (undocumented)
    type: T;
}


// (No @packageDocumentation comment for this package)

```
