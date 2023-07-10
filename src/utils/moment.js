const timeUtil = {
    
    getMonth : ()=>{
        return format.engToHan(new Date().toDateString().split(' ')[1]);
    },
    getDate : ()=>{
        return `${new Date().toDateString().split(' ')[2]}`;
    },
    getYear : ()=>{
        return `${new Date().toDateString().split(' ')[3]}`;
    },
    getDayOfTheWeek : ()=>{
        return format.engToHan(new Date().toDateString().split(' ')[0]);
    },
    getTime: () => {
        const time =  new Date().toTimeString().split(' ');
        const splitedTime = time[0].split(':')
        return format.toAmPm(splitedTime);
    },

}

const format = {
    engToHan: (string) => {
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
        },
    toAmPm : (array)=>{
        let number = array[0];
        if(number<=12){
            number =  `${number}:${array[1]} AM`;
        }
        else if(number>12){
            const updated = number % 12;
            number =  `${updated}:${array[1]} PM`;
        }
        return number;
    }
    

}

console.log(timeUtil.getDate());
console.log(timeUtil.getDayOfTheWeek());
console.log(timeUtil.getMonth());
console.log(timeUtil.getTime());
console.log(timeUtil.getYear());