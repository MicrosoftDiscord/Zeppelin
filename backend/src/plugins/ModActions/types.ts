import * as t from "io-ts";
import { tNullable, UserNotificationMethod, UserNotificationResult } from "../../utils";
import { BasePluginType, command } from "knub";
import { GuildMutes } from "../../data/GuildMutes";
import { GuildCases } from "../../data/GuildCases";
import { GuildLogs } from "../../data/GuildLogs";
import { Case } from "../../data/entities/Case";
import { CaseArgs } from "../Cases/types";
import { TextChannel } from "eris";

export const ConfigSchema = t.type({
  dm_on_warn: t.boolean,
  dm_on_kick: t.boolean,
  dm_on_ban: t.boolean,
  message_on_warn: t.boolean,
  message_on_kick: t.boolean,
  message_on_ban: t.boolean,
  message_channel: tNullable(t.string),
  warn_message: tNullable(t.string),
  kick_message: tNullable(t.string),
  ban_message: tNullable(t.string),
  alert_on_rejoin: t.boolean,
  alert_channel: tNullable(t.string),
  warn_notify_enabled: t.boolean,
  warn_notify_threshold: t.number,
  warn_notify_message: t.string,
  ban_delete_message_days: t.number,
  can_note: t.boolean,
  can_warn: t.boolean,
  can_mute: t.boolean,
  can_kick: t.boolean,
  can_ban: t.boolean,
  can_view: t.boolean,
  can_addcase: t.boolean,
  can_massban: t.boolean,
  can_hidecase: t.boolean,
  can_act_as_other: t.boolean,
});
export type TConfigSchema = t.TypeOf<typeof ConfigSchema>;

export interface ModActionsPluginType extends BasePluginType {
  config: TConfigSchema;
  state: {
    mutes: GuildMutes;
    cases: GuildCases;
    serverLogs: GuildLogs;

    ignoredEvents: IIgnoredEvent[];
  };
}

export enum IgnoredEventType {
  Ban = 1,
  Unban,
  Kick,
}

export interface IIgnoredEvent {
  type: IgnoredEventType;
  userId: string;
}

export type WarnResult =
  | {
      status: "failed";
      error: string;
    }
  | {
      status: "success";
      case: Case;
      notifyResult: UserNotificationResult;
    };

export type KickResult =
  | {
      status: "failed";
      error: string;
    }
  | {
      status: "success";
      case: Case;
      notifyResult: UserNotificationResult;
    };

export type BanResult =
  | {
      status: "failed";
      error: string;
    }
  | {
      status: "success";
      case: Case;
      notifyResult: UserNotificationResult;
    };

export type WarnMemberNotifyRetryCallback = () => boolean | Promise<boolean>;

export interface WarnOptions {
  caseArgs?: Partial<CaseArgs>;
  contactMethods?: UserNotificationMethod[];
  retryPromptChannel?: TextChannel;
}

export interface KickOptions {
  caseArgs?: Partial<CaseArgs>;
  contactMethods?: UserNotificationMethod[];
}

export interface BanOptions {
  caseArgs?: Partial<CaseArgs>;
  contactMethods?: UserNotificationMethod[];
  deleteMessageDays?: number;
}

export const modActionsCommand = command<ModActionsPluginType>();