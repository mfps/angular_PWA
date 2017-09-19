class Tastes {

    type: string;
    rating: number;
    notes: string;
    tastingRating: TestingRating;

    constructor(public name: string, public place: string, public location: PlaceLocation) { }
}