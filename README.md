# ml-feedback-widget

## Overview

The ML Feedback Widget is a simple, easy-to-use React component that you can add to your ML products/projects to get feedback from customers on the results of your production models.

We built this because production ML evaluation tends to be based on how the model affects product metrics and KPIs rather than model metrics. 

We are building a hosted version with integrations and custom styling so you can easily parse this feedback, connect it with your models, pipe it to your favorite data warehouse/lake/store/BI tool, and use it to improve your models in the future. If this interests you, please [email us](founders@tryinterlock.com).

## Demo

Here's a [live demo](https://ml-feedback-demo.vercel.app/) of the widget in a potential environment. Here's the [code](https://github.com/interlocklabs/ml_feedback_demo) for the demo.

![ML Widget screenshot](https://i.imgur.com/zmHZJP8.png)

## Installation

With npm:  `npm install ml-feedback-widget --save`

## Usage

### Front-end 

```javascript
import MLFeedbackWidget from 'ml-feedback-widget';

function App() {
	return (
		<div className="App">
			<MLFeedbackWidget feedbackEndpointUrl={'https://yourdomain.com/endpoint}/>
		</div>
	);
}
```

### Back-end

To use this widget, you will need to write a `POST` API endpoint with the following params in `application/json` format: 
- `isLiked`, boolean
- `feedback`, string

Here is an example one such endpoint written in Python 3.10 using the Flask framework:
```python
feedback = [{'uid': 0, 'is_liked': False, 'feedback_text': 'None of these are relevant...'}]

@app.route('/webhook', methods=['POST'])
@cross_origin()
def webhook():
	new_feedback_entry = {
		'uid': len(feedback),
		'is_liked': request.json['isLiked'],
		'feedback_text': request.json['feedback']
	}
	feedback.append(new_feedback_entry)
	return jsonify({'feedback': list(feedback)})
```

The code for the above endpoint can be found [here](https://github.com/interlocklabs/ml_feedback_demo/blob/main/webhook/app.py).

### Props

The component has three props:
 - `feedbackEndpointUrl`: This is the endpoint (which you will need to write) where the widget will send the feedback. Change this to pipe this data to your database/warehouse/lake/BI tools. If you want these connectors out of the box, please post an issue or [email us](mailto:founders@tryinterlock.com).
 - `widgetDescriptionText`: This is a string which is initially displayed which asks the user to leave their feedback.
 - `postSubmissionText`: the string which is displayed after the user submits their feedback.
 - `placeholderText`: the placeholder text displayed in the text area where users optionally input additional feedback on the results they see.
