export class SocialRequestDto {
    constructor(
        public token: string,
        public firstName: string,
        public lastName: string
    ) { }
}