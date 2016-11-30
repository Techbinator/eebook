import InfiniteCalendar from 'react-infinite-calendar-with-range'
import 'react-infinite-calendar-with-range/styles.css'
import React, {Component} from 'react'

export default class EEReactInfiniteCalendar extends InfiniteCalendar {
  constructor(props) {
    super(props);

    var selectedDate = props.selectedDate;
    var rangeSelectionEndDate = props.rangeSelectionEndDate;
    const direction = props.direction;

    if(rangeSelectionEndDate===false) {
      rangeSelectionEndDate = selectedDate;
    } else if(selectedDate===false) {
      rangeSelectionEndDate = false;
    } else if(selectedDate>rangeSelectionEndDate) {
      var tmp = selectedDate;
      selectedDate = rangeSelectionEndDate;
      rangeSelectionEndDate = tmp;
    }

    //in case we have a default date add dragging selection
    let dragging = 0;

    if( props.rangeSelection){
      if((direction == 1 && rangeSelectionEndDate) || (direction == -1 && selectedDate)){
        dragging = direction;
      }
    }
    this.state = {
      selectedDate: this.parseSelectedDate(selectedDate),
      selectedHovering: null,
      rangeSelectionEndDate: this.parseSelectedDate(rangeSelectionEndDate),
      dragging: dragging, //direction -1 reverse 0 nodrag 1 forwards
      touchBehavior: false,
      display: props.display,
      shouldHeaderAnimate: props.shouldHeaderAnimate
    };

  }
  onDaySelect = (clickedDate, e) => {
		let {afterSelect, beforeSelect, onSelect, rangeSelection, shouldHeaderAnimate, rangeSelectionBehavior} = this.props;

		var selectedDate = this.state.selectedDate;
		var rangeSelectionEndDate = this.state.rangeSelectionEndDate;

		var dragging = 0;

		if(rangeSelection && (this.state.touchBehavior || rangeSelectionBehavior=="hover")) {
			if(this.state.dragging==0) {
				selectedDate = clickedDate;
				// rangeSelectionEndDate = clickedDate;
				//EE add this line so that it wont return the date when just one is selected but not dragged
				rangeSelectionEndDate = false;
				dragging = 1;
			} else {
				if(clickedDate>selectedDate) {
					rangeSelectionEndDate = clickedDate;
				} else {
					selectedDate = clickedDate;
				}
			}
		} else {
			selectedDate = clickedDate;
			rangeSelectionEndDate = clickedDate;
			if(this.state.selectedDate == selectedDate) return;
		}

		if (!beforeSelect || typeof beforeSelect == 'function' && beforeSelect(selectedDate,rangeSelectionEndDate)) {
			if (typeof onSelect == 'function') {
				onSelect(selectedDate,rangeSelectionEndDate, e);
			}

			this.setState({
				selectedDate,
				rangeSelectionEndDate,
				dragging,
				highlightedDate: selectedDate.clone()
			}, () => {
				this.clearHighlight();
				if (typeof afterSelect == 'function') {
					afterSelect(selectedDate,rangeSelectionEndDate);
				}
			});
		}
	};

}
