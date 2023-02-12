export interface RegisterInput {
    form: {
        firstName?: string,
        lastName?: string,
        email: string,
        plainPassword: string,
    },
    extra?: {
        isThirdPartyUser: boolean | false,
        thirdPartyProvider: null,
    }
}
