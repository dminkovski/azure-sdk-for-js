/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  CallConnectionGetCallOptionalParams,
  CallConnectionGetCallResponse,
  CallConnectionHangupCallOptionalParams,
  CallConnectionTerminateCallOptionalParams,
  TransferToParticipantRequest,
  CallConnectionTransferToParticipantOptionalParams,
  CallConnectionTransferToParticipantResponse,
  CallConnectionGetParticipantsOptionalParams,
  CallConnectionGetParticipantsResponse,
  AddParticipantRequest,
  CallConnectionAddParticipantOptionalParams,
  CallConnectionAddParticipantResponse,
  RemoveParticipantRequest,
  CallConnectionRemoveParticipantOptionalParams,
  CallConnectionRemoveParticipantResponse,
  MuteParticipantsRequest,
  CallConnectionMuteOptionalParams,
  CallConnectionMuteResponse,
  UnmuteParticipantsRequest,
  CallConnectionUnmuteOptionalParams,
  CallConnectionUnmuteResponse,
  CallConnectionGetParticipantOptionalParams,
  CallConnectionGetParticipantResponse
} from "../models";

/** Interface representing a CallConnection. */
export interface CallConnection {
  /**
   * Get call connection.
   * @param callConnectionId The call connection id.
   * @param options The options parameters.
   */
  getCall(
    callConnectionId: string,
    options?: CallConnectionGetCallOptionalParams
  ): Promise<CallConnectionGetCallResponse>;
  /**
   * Hangup the call.
   * @param callConnectionId The call connection id.
   * @param options The options parameters.
   */
  hangupCall(
    callConnectionId: string,
    options?: CallConnectionHangupCallOptionalParams
  ): Promise<void>;
  /**
   * Terminate a call using CallConnectionId.
   * @param callConnectionId The terminate call request.
   * @param options The options parameters.
   */
  terminateCall(
    callConnectionId: string,
    options?: CallConnectionTerminateCallOptionalParams
  ): Promise<void>;
  /**
   * Transfer the call to a participant.
   * @param callConnectionId The call connection id.
   * @param transferToParticipantRequest The transfer to participant request.
   * @param options The options parameters.
   */
  transferToParticipant(
    callConnectionId: string,
    transferToParticipantRequest: TransferToParticipantRequest,
    options?: CallConnectionTransferToParticipantOptionalParams
  ): Promise<CallConnectionTransferToParticipantResponse>;
  /**
   * Get participants from a call.
   * @param callConnectionId The call connection Id
   * @param options The options parameters.
   */
  getParticipants(
    callConnectionId: string,
    options?: CallConnectionGetParticipantsOptionalParams
  ): Promise<CallConnectionGetParticipantsResponse>;
  /**
   * Add participants to the call.
   * @param callConnectionId The call connection Id
   * @param addParticipantRequest The request payload for adding participant to the call.
   * @param options The options parameters.
   */
  addParticipant(
    callConnectionId: string,
    addParticipantRequest: AddParticipantRequest,
    options?: CallConnectionAddParticipantOptionalParams
  ): Promise<CallConnectionAddParticipantResponse>;
  /**
   * Remove participant from the call using identifier.
   * @param callConnectionId The call connection id.
   * @param removeParticipantRequest The participant to be removed from the call.
   * @param options The options parameters.
   */
  removeParticipant(
    callConnectionId: string,
    removeParticipantRequest: RemoveParticipantRequest,
    options?: CallConnectionRemoveParticipantOptionalParams
  ): Promise<CallConnectionRemoveParticipantResponse>;
  /**
   * Mute participants from the call using identifier.
   * @param callConnectionId The call connection id.
   * @param muteParticipantsRequest The participants to be muted from the call.
   * @param options The options parameters.
   */
  mute(
    callConnectionId: string,
    muteParticipantsRequest: MuteParticipantsRequest,
    options?: CallConnectionMuteOptionalParams
  ): Promise<CallConnectionMuteResponse>;
  /**
   * Unmute participants from the call using identifier.
   * @param callConnectionId The call connection id.
   * @param unmuteParticipantsRequest The participants to be unmuted from the call.
   * @param options The options parameters.
   */
  unmute(
    callConnectionId: string,
    unmuteParticipantsRequest: UnmuteParticipantsRequest,
    options?: CallConnectionUnmuteOptionalParams
  ): Promise<CallConnectionUnmuteResponse>;
  /**
   * Get participant from a call.
   * @param callConnectionId The call connection Id
   * @param participantRawId Raw id of the participant to retrieve.
   * @param options The options parameters.
   */
  getParticipant(
    callConnectionId: string,
    participantRawId: string,
    options?: CallConnectionGetParticipantOptionalParams
  ): Promise<CallConnectionGetParticipantResponse>;
}
