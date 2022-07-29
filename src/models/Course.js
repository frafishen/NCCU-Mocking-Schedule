export class Course {
    constructor(order, number, name, teacher, credit, place) {
        this.order = order;
        this.number = number;
        this.name = name;
        this.teacher = teacher;
        this.credit = credit;
        this.place = place;
    }

    time = new Map([

        ['A', 1],
        ['B', 2],
        ['1', 3],
        ['2', 4],
        ['3', 5],
        ['4', 6],
        ['C', 7],
        ['D', 8],
        ['5', 9],
        ['6', 10],
        ['7', 11],
        ['8', 12],
        ['E', 13],
        ['F', 14],
        ['G', 15],
        ['H', 16]
    ]);
    
    day = new Map([
    
        ['一', 1],
        ['二', 2],
        ['三', 3],
        ['四', 4],
        ['五', 5]
    ]);

    test(){
        return "hello";
    }

    getDay(){
        return this.day.get(this.place.substring(0,1));
    }

    getCredit(){
        return Math.floor(this.credit);
    }

    getTime(){
        return this.time.get(this.place.substring(1,2));
    }

    getPlace(){
        pos = 0;
        for (i = 0; i < this.place.length(); i++){
            if (this.place.substring(i,i+1) == '/'){
                pos = i;
                break;
            }
        }
        s = this.place.substring(0,pos+1);
        return s;
    }

    getInfo(){

        return this.number + " " + this.name + " " + this.teacher + " " + this.credit + " " + this.place;
    }
}
