export class User {
    constructor(
        public id: string,
        public email: string,
        private _tokken: string) {}

    get token() {        
        return this._tokken;
    }
}