export class User {
    constructor(
        public id: string,
        public roleId: number,
        public email: string,
        private _tokken: string,
        public expireIn?: number) {}

    get token() {
        return this._tokken;
    }
}
