import React, { useState } from 'react';
import './MLFeedbackWidget.css';
import TextareaAutosize from 'react-textarea-autosize';

function MLFeedbackWidget( { widgetDescriptionText, postSubmissionText }) {
    const [isTextboxVisible, setIsTextboxVisble] = useState(false);
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);

    const like = () => {

        setIsTextboxVisble(true);
    }

    const dislike = () => {

        setIsTextboxVisble(true);
    }

    // make async when we have a server to send the feedback to
    const handleFeedbackSubmission = (event) => {
        event.preventDefault();
        // something to send the feedback to the server
        setIsTextboxVisble(false);
        setIsFeedbackSent(true);
    }

    return (
        <div>
            <div class="container">
                {isFeedbackSent ?
                    <div>
                        <p>{postSubmissionText}</p>
                        <div>Checkmark icon</div>
                    </div>
                    :
                    <div>
                        <p>{widgetDescriptionText}</p>
                        <div class="buttons">
                            <button class="like-button" onClick={like}>Like</button>
                            <button class="dislike-button" onClick={dislike}>Dislike</button>
                        </div>
                        {isTextboxVisible && 
                            <form class="feedback-form" onSubmit={handleFeedbackSubmission}>
                                <TextareaAutosize class="text-box" placeholder="Please provide additional feedback" />
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