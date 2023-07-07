import KakaoLogin from "react-kakao-login";
import icon from '../src/kakao_login_medium_narrow.png';
import { Navigate, useNavigate } from "react-router-dom";

const SocialKakao =()=>{
    const navigate = useNavigate();
    
    const kakaoClientId = process.env.REACT_APP_KAKAO;
    const kakaoOnSuccess = async (data)=>{
      	console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
        alert(idToken);
        navigate('/home')
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    return(
        <>
          <KakaoLogin 
              token={kakaoClientId}
              onSuccess={kakaoOnSuccess}
              onFail={kakaoOnFailure}
              render={({ onClick }) => {
                      return (
                        <img
                          style={{cursor:'pointer',float:'left',marginRight:'10px', height:'40px'}}
                          onClick={(e) => {
                            e.preventDefault();
                            onClick();
                          }}
                          src={icon}
                        />
                        
                      );
                   }}
          />
          
        </>
    )
}

export default SocialKakao