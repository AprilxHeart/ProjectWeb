export interface UserInfoResponse {
    status: string
    idssaml: Idssaml
    system: System
    userinfo: Userinfo
    message: string
    systemuser: string
  }
  
  export interface Idssaml {
    access_token: string
    scope: string
    id_token: string
    token_type: string
    expires_in: number
  }
  
  export interface System {
    status: string
    resultData: ResultData
    resultMessage: any
    statusCode: string
  }
  
  export interface ResultData {
    token: string
  }
  
  export interface Userinfo {
    sub: string
    pincode: string
    firstname: string
    mobile: string
    groups: string
    bu_code: string
    title: string
    lastname: string
    name: string
    phone_number: string
    department: string
    email: string
    username: string
  }