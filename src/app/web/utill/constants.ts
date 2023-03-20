export const PATH = {
    LOGIN: 'login-tts',
    LOGIN_SAML: 'login',
    LOGIN_PROFILE: 'bypass-login',
}


export const SESSION ={
    SESSION_ID : 'sessionid',
    PASSWORD : 'password',
    SESSION_USER : 'sessionuser',
    SESSION_IDSSAML_REQ : 'sessionidssaml',
    SESSION_IDSSAML_USER_INFO : 'sessionidssamluserinfo',
    SESSION_SYSTEM : 'sessionsystem'
}

const blockSpecial: RegExp = /^[^<>*#!]+$/;
const blockSpace: RegExp = /[^\s]/;
const ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
const englishAndNumber : RegExp = /[a-zA-Z0-9-]+$/;
const englishOrgName : RegExp = /^[a-zA-Z0-9-_]+$/;


export const KEYFILLTER = {
    blockSpecial : blockSpecial,
    blockSpace: blockSpace,
    ccRegex : ccRegex,
    englishAndNumber : englishAndNumber,
    englishOrgName : englishOrgName
}

