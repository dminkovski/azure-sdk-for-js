// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BroadcastChannel } from "broadcast-channel";

/**
 * The event in which widgets communicate with each other
 */
export interface ChannelEvent {
  topic: string;
  sender: string;
  message: string;
}

/**
 * A class wrapping broadcasting communication between widgets.
 */
export class MessageBroker {
  private channel: BroadcastChannel;
  private subscriptions: Map<string, Set<(message: any) => void>>;
  private storedMessages: Map<string, ChannelEvent[]>;

  constructor(channelName?: string) {
    const name = channelName || "widget-message-channel";
    this.channel = new BroadcastChannel(name);
    this.subscriptions = new Map<string, Set<(message: any) => void>>();
    this.storedMessages = new Map<string, ChannelEvent[]>();

    this.channel.addEventListener("message", (event: ChannelEvent) => {
      this.handleIncomingMessage(event);
    });
  }

  private handleIncomingMessage(event: ChannelEvent) {
    if (!this.subscriptions.has(event.topic)) {
      // Discard message if no subscribers
      return;
    }

    const topicSubscriptions = this.subscriptions.get(event.topic)!;
    const subscribers = Array.from(topicSubscriptions);

    if (!this.storedMessages.has(event.topic)) {
      // Store message if no stored messages for the topic
      this.storedMessages.set(event.topic, [event]);
    } else {
      // Add message to the stored messages for the topic
      const storedMessages = this.storedMessages.get(event.topic)!;
      storedMessages.push(event);
    }

    // Forward message to subscribers
    subscribers.forEach((callback) => {
      if (event.sender !== this.getChannelName(callback)) {
        callback(event);
      }
    });
  }

  private getChannelName(callback?: Function): string {
    const widgetName = callback?.name || "default";
    return `${widgetName}-${window.location.pathname}`;
  }

  public subscribe(topic: string, callback: (message: any) => void): boolean {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set<(message: any) => void>());
    }
    const topicSubscriptions = this.subscriptions.get(topic)!;

    if (!topicSubscriptions.has(callback)) {
      topicSubscriptions.add(callback);

      if (this.storedMessages.has(topic)) {
        const storedMessages = this.storedMessages.get(topic)!;
        storedMessages.forEach((message) => {
          if (message.sender !== this.getChannelName(callback)) {
            callback(message);
          }
        });
      }

      return true;
    }
    return false;
  }

  public publish(topic: string, message: string, senderOverride?: string): void {
    this.channel.postMessage({ topic, message, sender: senderOverride || this.getChannelName() });
  }
}
