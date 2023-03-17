import React, { useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'react-feather';

import axios from 'axios';

import './index.css';
import TextareaAutosize from 'react-textarea-autosize';

function MLFeedbackWidget( { widgetDescriptionText, postSubmissionText, url }) {
    const [feedback, setFeedback] = useState('');
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);
    const [hasBeenLiked, setHasBeenLiked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    }

    const sendFeedback = async () => {
        if (url){
            const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            const data = {
                isLiked: isLiked,
                feedback: feedback,
            }
            axios.post(url, data, config)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    // TODO: maybe add logic to handle double clicking
    const like = () => {
        setHasBeenLiked(true);
        setIsLiked(true);
        sendFeedback();
    }

    // TODO: maybe add logic to handle double clicking
    const dislike = () => {
        setHasBeenLiked(true);
        setIsLiked(false);
        sendFeedback();
    }

    const handleFeedbackSubmission = (event) => {
        event.preventDefault();
        setHasBeenLiked(false);
        setIsFeedbackSent(true);
        sendFeedback();
    }

    const fill_dislike = (hasBeenLiked && !isLiked) ? '#f44336' : 'none';
    const fill_like = (hasBeenLiked && isLiked) ? '#4CAF50' : 'none';


    return (
        <div>
            <div class="container">
                {isFeedbackSent ?
                    <div>
                        <p class="post-submission-text">{postSubmissionText}</p>
                    </div>
                    :
                    <div>
                        <p class="widget-description-text">{widgetDescriptionText}</p>
                        <div class="buttons">
                            <button class="like-button" onClick={like}>
                                <ThumbsUp fill={fill_like} />
                            </button>
                            <button class="dislike-button" onClick={dislike}>
                                <ThumbsDown fill={fill_dislike} />
                            </button>
                        </div>
                        {hasBeenLiked && 
                            <form class="feedback-form" onSubmit={handleFeedbackSubmission}>
                                <TextareaAutosize class="text-box" placeholder="Please provide additional feedback" value={feedback} onChange={handleFeedbackChange} />
                                <input type="submit" class="submit-button" value="Submit" />
                            </form>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default MLFeedbackWidget;

MLFeedbackWidget.defaultProps = {
    widgetDescriptionText: 'Are these results relevant?',
    postSubmissionText: 'Thank you for your feedback!'
}