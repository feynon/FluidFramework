## API Report File for "@fluid-experimental/tinylicious-client"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { ContainerSchema } from '@fluid-experimental/fluid-framework';
import { FluidContainer } from '@fluid-experimental/fluid-framework';
import { IClient } from '@fluidframework/protocol-definitions';
import { IDocumentServiceFactory } from '@fluidframework/driver-definitions';
import { IMember } from '@fluid-experimental/fluid-framework';
import { IServiceAudience } from '@fluid-experimental/fluid-framework';
import { ITelemetryBaseLogger } from '@fluidframework/common-definitions';
import { IUrlResolver } from '@fluidframework/driver-definitions';
import { ServiceAudience } from '@fluid-experimental/fluid-framework';

// @public (undocumented)
export type ITinyliciousAudience = IServiceAudience<TinyliciousMember>;

// @public (undocumented)
export class TinyliciousAudience extends ServiceAudience<TinyliciousMember> implements ITinyliciousAudience {
    // (undocumented)
    protected createServiceMember(audienceMember: IClient): TinyliciousMember;
}

// @public
class TinyliciousClient {
    constructor(serviceConnectionConfig?: TinyliciousConnectionConfig);
    // (undocumented)
    createContainer(serviceContainerConfig: TinyliciousContainerConfig, containerSchema: ContainerSchema): Promise<TinyliciousResources>;
    // (undocumented)
    readonly documentServiceFactory: IDocumentServiceFactory;
    // (undocumented)
    getContainer(serviceContainerConfig: TinyliciousContainerConfig, containerSchema: ContainerSchema): Promise<TinyliciousResources>;
    // (undocumented)
    readonly urlResolver: IUrlResolver;
}

export { TinyliciousClient }

export default TinyliciousClient;

// @public (undocumented)
export interface TinyliciousConnectionConfig {
    // (undocumented)
    domain?: string;
    // (undocumented)
    port?: number;
}

// @public (undocumented)
export interface TinyliciousContainerConfig {
    // (undocumented)
    id: string;
    // (undocumented)
    logger?: ITelemetryBaseLogger;
}

// @public
export interface TinyliciousContainerServices {
    audience: ITinyliciousAudience;
}

// @public
export interface TinyliciousMember extends IMember {
    // (undocumented)
    userName: string;
}

// @public (undocumented)
export interface TinyliciousResources {
    // (undocumented)
    containerServices: TinyliciousContainerServices;
    // (undocumented)
    fluidContainer: FluidContainer;
}


// (No @packageDocumentation comment for this package)

```