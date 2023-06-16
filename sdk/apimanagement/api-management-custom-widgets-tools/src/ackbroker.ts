// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChannelEvent, MessageBroker } from "./messagebroker";

export interface AckEvent extends ChannelEvent {
  id: string;
  needsAck: boolean;
}

/**
 * A class wrapping broadcasting communication between widgets using Ack Protocol
 */
export class AckBroker {
  private broker: MessageBroker;
  private messages: Map<string, boolean>;
  private RETRY_ATTEMPTS: number;
  private RETRY_INTERVALMS: number;

  constructor(channelName?: string) {
    this.RETRY_ATTEMPTS = 3;
    this.RETRY_INTERVALMS = 1500;
    this.broker = new MessageBroker(channelName);
    this.messages = new Map<string, boolean>();
  }
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(7);
  }

  public received(event: AckEvent) {
    if (event.id && event.needsAck) {
      this.broker.publish(event);
    }
  }
  /**
   * Send Message with Acknowledgment
   * @param event
   */
  public send(event: ChannelEvent, callback: (event: AckEvent | Error) => void) {
    const uniqueId = this.generateUniqueId();
    const ackEvent = {
      ...event,
      sender: event.sender || this.broker.getChannelName(),
      id: uniqueId,
      needsAck: true,
    };
    this.messages.set(uniqueId, false);

    this.broker.publish(ackEvent);

    let retryCount = 0;
    const retryInterval = setInterval(() => {
      const isAcknowledged = this.messages.get(uniqueId);
      if (!isAcknowledged && retryCount < this.RETRY_ATTEMPTS) {
        retryCount++;
        this.broker.publish(ackEvent);
      } else {
        clearInterval(retryInterval);
        if (!isAcknowledged) {
          callback(new Error(`Failed to receive acknowledgement for message: ${uniqueId}`));
          console.error("Failed to receive acknowledgement for message:", uniqueId);
        }
      }
    }, this.RETRY_INTERVALMS);

    this.broker.subscribe(event.topic, (event: AckEvent) => {
      if (event.id == uniqueId && event.needsAck) {
        this.messages.set(uniqueId, true);
        callback({ ...ackEvent, needsAck: false });
      }
    });
  }
}
