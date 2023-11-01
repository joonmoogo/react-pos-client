import React, { useEffect, useState } from "react";
import { Comment, Header, Rating } from "semantic-ui-react";
import { getReviews } from '../../controllers/ReviewController.ts';
import { getUserById } from "../../controllers/UserController.ts";

export default function ReviewComment() {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        getReviews().then((response) => {
            const reviewData = response.data;
            const promises = reviewData.map(async (review) => {
                const account = await getUserById(review.accountId);
                return {
                    name: account.nickname,
                    mainText: extractTextInAngleBrackets(review.detail),
                    detail: removeTextInAngleBrackets(review.detail),
                    rating: review.rating,
                    writingTime: review.writingTime,
                    photo: account.profilePhoto
                };
            });
    
            Promise.all(promises).then((results) => {
                setReviews(results);
    
                const totalRating = reviewData.reduce((sum, review) => sum + review.rating, 0);
                const avgRating = reviewData.length > 0 ? totalRating / reviewData.length : 0;
                setAverageRating(avgRating);
            });
        }, []);
    }, []);
    

    function extractTextInAngleBrackets(text) {
        const matches = text.match(/<([^>]+)>/g);

        if (matches) {
            return matches.map((match) => match.slice(1, -1)); // <와 >를 제외한 문자열을 추출
        } else {
            return [];
        }
    }

    function removeTextInAngleBrackets(text) {
        return text.replace(/<[^>]+>/g, '');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환

        if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            // 같은 날짜인 경우 "Today at"으로 표시
            return `Today at ${formattedHours}:${minutes.toString().padStart(2, '0')}${period}`;
        } else {
            // 다른 날짜인 경우 "월-일 시:분AM/PM"으로 표시
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${month}-${day} at ${formattedHours}:${minutes.toString().padStart(2, '0')}${period}`;
        }
    }

    return (
        <div style={{ height: '440px', overflow: 'scroll' }} className="no-scroll">
            <Comment.Group threaded className="slide-from-right">
                <Header as='h3' dividing>
                    Comments
                </Header>
                <Header as='h4'>Average Rating: {averageRating} <Rating icon='heart' defaultRating={averageRating} maxRating={5} /></Header>
                {reviews.map((review, index) => (
                    <Comment key={index} style={{ borderRadius: '50px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Comment.Avatar style={{ width: '50px', height: '50px', marginRight: '20px' }} as='a' src={`/serverImage/${review.photo}`} />
                            <Comment.Content>
                                <Comment.Author as='a'>{review.name}</Comment.Author>
                                <Comment.Metadata>
                                    <span>{formatDate(review.writingTime)}</span>
                                </Comment.Metadata>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {review.mainText.map((detail, i) => (
                                        <Comment.Text key={i} style={{ 
                                            backgroundColor: '#f8f9fa',
                                            fontSize: '10px',
                                            fontWeight: 'bold',
                                            margin: '5px',
                                            whiteSpace: 'nowrap',
                                            border: '1px solid black',
                                            borderRadius: '50px',
                                            padding: '5px', // 간격을 조정할 수 있는 padding 속성 추가
                                        }}>
                                            {detail}
                                        </Comment.Text>
                                    ))}
                                    <Comment.Text style={{fontWeight:'bold', }}>{`[${review.detail}]`}</Comment.Text>

                                </div>
                                <Rating readOnly icon='star' defaultRating={review.rating} maxRating={5} />
                                <Comment.Actions>
                                    <a>menu</a>
                                </Comment.Actions>
                            </Comment.Content>
                        </div>
                    </Comment>
                ))}
            </Comment.Group>
        </div>
    )
}
