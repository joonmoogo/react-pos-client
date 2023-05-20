import React from "react";

function Loading(props){
    let num = localStorage.getItem(`secretNumber1`);
    window.location.href=`/home/order/${num}`
    return(
        <div></div>
    )
}

export default Loading