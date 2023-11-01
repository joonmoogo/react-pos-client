import React from "react";

function Loading(props) { // 로딩중에 대기 UI를 나타내는 컴포넌트
    let num = localStorage.getItem(`secretNumber1`);
    window.location.href = `/home/order/${num}`
    return (
        <div></div>
    )
}

export default Loading