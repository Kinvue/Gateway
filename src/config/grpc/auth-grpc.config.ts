import {AUTH_V1_PACKAGE_NAME } from "@kinvue/contracts/dist/gen/auth";
import { ConfigService } from "@nestjs/config";
import { GrpcOptions, Transport } from "@nestjs/microservices";

import {AUTH_PROTO_PATH} from "@kinvue/contracts/dist/gen/constants"

export const authGrpcConfig = (
    config : ConfigService
) : GrpcOptions  => ({
    transport: Transport.GRPC,
    options: {
        package: AUTH_V1_PACKAGE_NAME,
        protoPath : AUTH_PROTO_PATH,
        url: `${config.getOrThrow('AUTH_GRPC_HOST')}:${config.getOrThrow('AUTH_GRPC_PORT')}`,
    },
});