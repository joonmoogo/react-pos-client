var redir = encodeURI("http://localhost:3000/home")
var naver_id_login = new window.naver_id_login(process.env.REACT_APP_NAVER, redir);
var state = naver_id_login.getUniqState();
naver_id_login.setButton("green", 3,37);
naver_id_login.setDomain("http://localhost:3000/");
naver_id_login.setState(state);

export default naver_id_login;