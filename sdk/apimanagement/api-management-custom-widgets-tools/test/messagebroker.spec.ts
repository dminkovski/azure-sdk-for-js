// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import { MessageBroker } from "../src/messagebroker";

describe("MessageBroker", () => {
  let messageBroker: MessageBroker;

  (global.window as any) = {
    location: {
      pathname: "test",
    },
  };

  beforeEach(() => {
    messageBroker = new MessageBroker();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("subscribe", () => {
    it("should add a new subscription for a topic", () => {
      const callback = () => {};
      messageBroker.subscribe("topicA", callback);

      const subscriptions = (messageBroker as any).subscriptions;
      expect(subscriptions.size).to.equal(1);
      expect(subscriptions.get("topicA")).to.be.an.instanceOf(Set);
      expect(subscriptions.get("topicA")).to.include(callback);
    });

    it("should not add duplicate subscriptions for a topic", () => {
      const callback = () => {};
      messageBroker.subscribe("topicA", callback);
      messageBroker.subscribe("topicA", callback);

      const subscriptions = (messageBroker as any).subscriptions;
      expect(subscriptions.size).to.equal(1);
      expect(subscriptions.get("topicA")).to.be.an.instanceOf(Set);
      expect(subscriptions.get("topicA")).to.have.lengthOf(1);
    });

    it("should set up event listener for the subscribed topic", () => {
      const callback = () => {};

      const subscribeStub: SinonStub = sinon.stub(messageBroker, "subscribe");
      subscribeStub.callsFake(function (
        this: MessageBroker,
        topic: string,
        cb: (message: any) => void
      ) {
        const result = subscribeStub.wrappedMethod!.call(this, topic, cb);

        expect(result).to.be.true;

        subscribeStub.restore();

        return result;
      });

      messageBroker.subscribe("topicA", callback);

      expect(subscribeStub.calledOnce).to.be.true;
      expect(subscribeStub.firstCall.args[0]).to.equal("topicA");
      expect(subscribeStub.firstCall.args[1]).to.equal(callback);
    });
  });
});
