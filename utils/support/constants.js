import { constants } from "fs";
import { arch as osArch, platform as osPlatform, type as osType } from "os";


export const OS_ARCH = osArch();
export const OS_PLATFORM = osPlatform();
export const OS_TYPE = osType();

export const FS_R = constants.F_OK | constants.R_OK;
export const FS_RW = FS_R | constants.W_OK;

export const RAW_DIR = "./raw";
export const RAW_DATA_DIR = `${RAW_DIR}/data`;
export const RAW_CODE_DIR = `${RAW_DIR}/code`;

export const RES_DIR = "./res";

export const BOT_DIR = "./bot";
export const BOT_DATA_DIR = `${BOT_DIR}/data`;
export const BOT_CODE_DIR = `${BOT_DIR}/code`;
export const BOT_RES_DIR = `${BOT_DIR}/resources`;
export const BOT_ACTIONS_DIR = `${BOT_DIR}/actions`;
export const BOT_EVENTS_DIR = `${BOT_DIR}/events`;
export const BOT_EXTENSIONS_DIR = `${BOT_DIR}/extensions`;

export const STEAM_REG_KEY_32 = "HKLM\\SOFTWARE\\Valve\\Steam";
export const STEAM_REG_KEY_64 = "HKLM\\SOFTWARE\\Wow6432Node\\Valve\\Steam";
export const STEAM_REG_VAL_PATH = "InstallPath";
export const STEAM_LIB_CONFIGS = [ "config/libraryfolders.vdf", "steamapps/libraryfolders.vdf" ];

export const DBM_ID = "682130";
export const DBM_FOLDER = "steamapps/common/Discord Bot Maker";
export const DBM_TEMPLATE_FOLDER = "resources/app/bot";
export const DBM_ACTIONS_FOLDER = "actions";
export const DBM_EVENTS_FOLDER = "events";
export const DBM_EXTENSIONS_FOLDER = "extensions";

/**
 * File encoding
 * @type {BufferEncoding}
 */
export const ENCODING = "utf8";

/**
 * Raw data types (like "commands", "events", etc.)
 */
export const RAW_DATA_TYPES = [ "commands", "events" ];