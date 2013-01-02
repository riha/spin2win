module Models {
    export class Player {
        constructor (public id: string,
            public name: string,
            public numberOfSlots: number,
            public pictureUrl: string,
            public included: bool) { }

        public static defaultObject() {
            return new Player(null, null, 1, null, true);
        }
    }
}