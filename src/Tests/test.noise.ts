import { proto } from "../../WAProto";
import { NOISE_WA_HEADER } from "../Defaults";
import { Curve, makeNoiseHandler } from "../Utils";
import logger from "../Utils/logger";

describe("playground", () => {
  it("should noise", () => {
    const ephemeralKeyPair = Curve.generateKeyPair();

    /** WA noise protocol wrapper */
    const noise = makeNoiseHandler({
      keyPair: ephemeralKeyPair,
      NOISE_HEADER: NOISE_WA_HEADER,
      logger,
      routingInfo: undefined,
    });
    
    let helloMsg: proto.IHandshakeMessage = {
      clientHello: { ephemeral: ephemeralKeyPair.public },
    };
    
    helloMsg = proto.HandshakeMessage.fromObject(helloMsg);
    
    const init = proto.HandshakeMessage.encode(helloMsg).finish();
    
    console.log(ephemeralKeyPair.private);
    console.log(ephemeralKeyPair.public);

    console.log(init);
    console.log(noise.encodeFrame(init)); 
  })
})