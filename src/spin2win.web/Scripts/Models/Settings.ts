module Models {
    export class Settings {

        constructor (public id, public numberOfRounds: number) { }

        public static defaultObject() { 
            return new Settings(null, 3);
        }
    }
}