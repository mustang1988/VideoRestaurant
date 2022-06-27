import { Waiter } from "./waiter/Waiter";

/**
 * Waiter service endpoint script
 *  starup Waiter service, provide a GRPC service
 */
const waiter = new Waiter();
waiter.start()