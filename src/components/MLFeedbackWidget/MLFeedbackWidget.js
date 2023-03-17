import React, { useState } from 'react';
import { CheckCircle, ThumbsDown, ThumbsUp } from 'react-feather';

import axios from 'axios';

import './MLFeedbackWidget.css';
import TextareaAutosize from 'react-textarea-autosize';

function MLFeedbackWidget( { widgetDescriptionText, postSubmissionText, placeholderText, feedbackEndpointUrl }) {
    const [feedback, setFeedback] = useState('');
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);
    const [hasBeenLiked, setHasBeenLiked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const fill_dislike = (hasBeenLiked && !isLiked) ? '#f44336' : 'none';
    const fill_like = (hasBeenLiked && isLiked) ? '#4CAF50' : 'none';

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    }

    const sendFeedback = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        const data = {
            isLiked: isLiked,
            feedback: feedback,
        }
        axios.post(feedbackEndpointUrl, data, config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // TODO: maybe add logic to handle double clicking
    const like = () => {
        setHasBeenLiked(true);
        setIsLiked(true);
    }

    // TODO: maybe add logic to handle double clicking
    const dislike = () => {
        setHasBeenLiked(true);
        setIsLiked(false);
    }

    const handleFeedbackSubmission = (event) => {
        event.preventDefault();
        sendFeedback();
        setHasBeenLiked(false);
        setIsFeedbackSent(true);
    }

    return (
        <div>
            <div class="ml-widget-container">
                {isFeedbackSent ?
                    <div class="ml-widget-post-submission">
                        <CheckCircle color={'green'} size={18} />
                        <p class="ml-widget-post-submission-text">{postSubmissionText}</p>
                    </div>
                    :
                    <div>
                        <p class="ml-widget-description-text">{widgetDescriptionText}</p>
                        <div class="ml-widget-buttons">
                            <button class="ml-widget-like-button" onClick={like}>
                                <ThumbsUp fill={fill_like} size={18}/>
                            </button>
                            <button class="ml-widget-dislike-button" onClick={dislike}>
                                <ThumbsDown fill={fill_dislike} size={18}/>
                            </button>
                        </div>
                        {hasBeenLiked && 
                            <form class="ml-widget-feedback-form" onSubmit={handleFeedbackSubmission}>
                                <TextareaAutosize class="ml-widget-text-box" placeholder={placeholderText} value={feedback} onChange={handleFeedbackChange} />
                                <input type="submit" class="ml-widget-submit-button" value="Submit" />
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
    postSubmissionText: 'Thanks for the feedback!',
    placeholderText: 'Your feedback (optional)'
}