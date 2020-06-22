export interface User {
    id?: number;
    name?: string;
    lastname: any;
    email: string;
    password: string;
    role: string;
    email_verified_at?: any;
    city:string;
    neighborhood_id:number;
    address: any;
    discount?: any;
    company?: any;
    rut?: any;
    ci?: any;
    phone?: any;
    created_at: string;
    updated_at: string;
    state: any;
    id_cliente_cobrosya?:any;

}
export interface CurrentUser {
    token: string;
    token_type: string;
    user: User
}
export declare class SocialUser {
    provider: string;
    id: string;
    email: string;
    name: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    authToken: string;
    idToken?: string;
    authorizationCode: string;
    /**
     * Contains the entire object returned from the Facebook API based on the fields you requested.
     * Only available for the Facebook provider.
     * Refer to the Graph API for details: https://developers.facebook.com/docs/graph-api
     */
    facebook?: any;
    /**
     * Contains the entire object returned from the Linked In API based on the fields you requested.
     * Only available for the Linked In provider.
     * Refer to the Linked In docs: https://developer.linkedin.com/docs/fields
     */
    linkedIn?: any;
}