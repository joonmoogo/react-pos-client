type time = string|undefined;
type eng = string[]|undefined;
type han = string|undefined;
export default class TimeUtil  {
    
    static getMonth() : time {
        return Format.engToHan(new Date().toDateString().split(' ')[1]);
    }
    static getDate() : time{
        return `${new Date().toDateString().split(' ')[2]}`;
    }
    static getYear(): time{
        return `${new Date().toDateString().split(' ')[3]}`;
    }
    static getDayOfTheWeek(): time{
        return Format.engToHan(new Date().toDateString().split(' ')[0]);
    }
    static getTime(): time{
        const time =  new Date().toTimeString().split(' ');
        const splitedTime = time[0].split(':')
        return Format.toAmPm(splitedTime);
    }

}

class Format {
    static engToHan(string : string) : string|undefined{
        switch (string) {
            case 'Mon':
              return '월요일';
            case 'Tue':
              return '화요일';
            case 'Wed':
              return '수요일';
            case 'Thu':
              return '목요일';
            case 'Fri':
              return '금요일';
            case 'Sat':
              return '토요일';
            case 'Sun':
              return '일요일';
            case 'Jan':
              return '1';
            case 'Feb':
              return '2';
            case 'Mar':
              return '3';
            case 'Apr':
              return '4';
            case 'May':
              return '5';
            case 'Jun':
              return '6';
            case 'Jul':
              return '7';
            case 'Aug':
              return '8';
            case 'Sep':
              return '9';
            case 'Oct':
              return '10';
            case 'Nov':
              return '11';
            case 'Dec':
              return '12';
          }
        }

    static toAmPm(array : eng) : han{
        if(array===undefined) return undefined;
        let number = parseInt(array[0]);
        let result : string = '';
        if(number<=12){
            result =  `${number}:${array[1]} AM`;
        }
        else if(number>12){
            const updated = number % 12;
            result =  `${updated}:${array[1]} PM`;
        }
        return result;
    }
}
// console.log(TimeUtil.getDate());
// console.log(TimeUtil.getDayOfTheWeek());
// console.log(TimeUtil.getMonth());
// console.log(TimeUtil.getTime());
// console.log(TimeUtil.getYear());